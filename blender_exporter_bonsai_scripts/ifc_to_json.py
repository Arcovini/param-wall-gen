"""
IFC Wall & Opening Position/Size Reference Extractor for Blender (BlenderBIM/IfcBonsai)

This script extracts wall and opening (doors/windows) geometry data from the currently
open IFC file and outputs a JSON file with positional and size references.

Usage: Run this script in Blender's Python console with an IFC file open via BlenderBIM.
"""

import bpy
import json
import math
import os

import ifcopenshell
import ifcopenshell.util.unit
import ifcopenshell.util.element
import ifcopenshell.util.placement

# Try importing from Bonsai (new name) or BlenderBIM (old name)
IfcStore = None
try:
    from bonsai.bim.ifc import IfcStore
except ImportError:
    try:
        from blenderbim.bim.ifc import IfcStore
    except ImportError:
        print("ERROR: Bonsai/BlenderBIM addon not found. Please install it first.")
        print("Download from: https://bonsaibim.org/ or https://blenderbim.org/")
        raise


def is_null_or_empty(value):
    """Check if a value is null, undefined, or IFC $ (empty)."""
    if value is None:
        return True
    if isinstance(value, str) and value in ('$', '', 'NOTDEFINED'):
        return True
    return False


def is_zero_position(pos):
    """Check if position is effectively (0, 0, 0)."""
    if pos is None:
        return True
    threshold = 1e-6
    return (abs(pos.get('x', 0)) < threshold and
            abs(pos.get('y', 0)) < threshold and
            abs(pos.get('z', 0)) < threshold)


def get_unit_scale(ifc_file):
    """Get the scale factor to convert IFC units to meters."""
    try:
        return ifcopenshell.util.unit.calculate_unit_scale(ifc_file)
    except:
        return 1.0  # Default to 1 if units can't be determined


def extract_position(location, scale=1.0):
    """Extract position dict from IfcCartesianPoint."""
    if is_null_or_empty(location):
        return None

    coords = location.Coordinates if hasattr(location, 'Coordinates') else None
    if not coords:
        return None

    x = coords[0] * scale if len(coords) > 0 else 0.0
    y = coords[1] * scale if len(coords) > 1 else 0.0
    z = coords[2] * scale if len(coords) > 2 else 0.0

    return {'x': round(x, 6), 'y': round(y, 6), 'z': round(z, 6)}


def extract_yaw_from_direction(ref_direction):
    """Extract yaw angle in degrees from IfcDirection."""
    if is_null_or_empty(ref_direction):
        return 0.0

    ratios = ref_direction.DirectionRatios if hasattr(ref_direction, 'DirectionRatios') else None
    if not ratios or len(ratios) < 2:
        return 0.0

    dx, dy = ratios[0], ratios[1]
    yaw = math.degrees(math.atan2(dy, dx))
    return round(yaw, 4)


def get_placement_data(ifc_placement, scale=1.0):
    """Extract position and direction from IfcLocalPlacement."""
    if is_null_or_empty(ifc_placement):
        return None

    relative_placement = ifc_placement.RelativePlacement if hasattr(ifc_placement, 'RelativePlacement') else None
    if is_null_or_empty(relative_placement):
        return None

    position = None
    direction = {'yaw': 0.0}

    # Extract location
    if hasattr(relative_placement, 'Location') and not is_null_or_empty(relative_placement.Location):
        position = extract_position(relative_placement.Location, scale)

    # Extract direction (RefDirection for X-axis orientation)
    if hasattr(relative_placement, 'RefDirection') and not is_null_or_empty(relative_placement.RefDirection):
        yaw = extract_yaw_from_direction(relative_placement.RefDirection)
        direction = {'yaw': yaw}

    return {
        'position': position,
        'direction': direction
    }


def get_opening_position_relative_to_wall(opening_element, wall, scale=1.0):
    """
    Calculate opening position relative to wall's local coordinate system.
    Uses full transformation matrices to compute accurate relative position.
    """
    try:
        # Get full transformation matrices
        opening_matrix = ifcopenshell.util.placement.get_local_placement(opening_element.ObjectPlacement)
        wall_matrix = ifcopenshell.util.placement.get_local_placement(wall.ObjectPlacement)

        # Opening global position (from matrix column 3)
        opening_pos = opening_matrix[:3, 3]

        # Wall global position and orientation
        wall_pos = wall_matrix[:3, 3]
        wall_x_axis = wall_matrix[:3, 0]  # Wall's local X direction
        wall_y_axis = wall_matrix[:3, 1]  # Wall's local Y direction
        wall_z_axis = wall_matrix[:3, 2]  # Wall's local Z direction

        # Vector from wall origin to opening origin
        delta = opening_pos - wall_pos

        # Project onto wall's local axes to get relative position
        local_x = float(delta.dot(wall_x_axis)) * scale
        local_y = float(delta.dot(wall_y_axis)) * scale
        local_z = float(delta.dot(wall_z_axis)) * scale

        return {
            'x': round(local_x, 6),
            'y': round(local_y, 6),
            'z': round(local_z, 6)
        }
    except Exception as e:
        print(f"Warning: Could not compute relative position: {e}")
        return None


def get_wall_dimensions(wall, ifc_file, scale=1.0):
    """
    Extract wall dimensions (length, width, height) from wall geometry.
    Uses the wall's representation or property sets.
    """
    l, w, h = 0.0, 0.0, 0.0

    # Try to get dimensions from IfcMaterialLayerSetUsage or properties
    try:
        # Try getting from Qto_WallBaseQuantities
        for rel in ifc_file.by_type('IfcRelDefinesByProperties'):
            if wall in rel.RelatedObjects:
                prop_def = rel.RelatingPropertyDefinition
                if hasattr(prop_def, 'Name') and 'Qto_WallBaseQuantities' in str(prop_def.Name):
                    if hasattr(prop_def, 'Quantities'):
                        for qty in prop_def.Quantities:
                            name = qty.Name if hasattr(qty, 'Name') else ''
                            if name == 'Length' and hasattr(qty, 'LengthValue'):
                                l = qty.LengthValue * scale
                            elif name == 'Width' and hasattr(qty, 'LengthValue'):
                                w = qty.LengthValue * scale
                            elif name == 'Height' and hasattr(qty, 'LengthValue'):
                                h = qty.LengthValue * scale
    except:
        pass

    # Try to extract from geometry representation
    if l == 0 or w == 0 or h == 0:
        try:
            representation = wall.Representation
            if representation and hasattr(representation, 'Representations'):
                for rep in representation.Representations:
                    if rep.RepresentationType in ('SweptSolid', 'Clipping'):
                        for item in rep.Items:
                            if item.is_a('IfcExtrudedAreaSolid'):
                                # Height from extrusion depth
                                if h == 0 and hasattr(item, 'Depth'):
                                    h = item.Depth * scale

                                # Length and width from profile
                                profile = item.SweptArea if hasattr(item, 'SweptArea') else None
                                if profile:
                                    if profile.is_a('IfcRectangleProfileDef'):
                                        if l == 0 and hasattr(profile, 'XDim'):
                                            l = profile.XDim * scale
                                        if w == 0 and hasattr(profile, 'YDim'):
                                            w = profile.YDim * scale
                                    elif profile.is_a('IfcArbitraryClosedProfileDef'):
                                        # Try to get bounding box from curve
                                        pass
        except:
            pass

    # Use ifcopenshell.util.placement to get matrix and compute bounding box as fallback
    if l == 0 or w == 0 or h == 0:
        try:
            # Get all vertices from geometry and compute bounding box
            settings = ifcopenshell.geom.settings()
            shape = ifcopenshell.geom.create_shape(settings, wall)
            verts = shape.geometry.verts

            if verts:
                xs = verts[0::3]
                ys = verts[1::3]
                zs = verts[2::3]

                if l == 0:
                    l = (max(xs) - min(xs)) * scale
                if w == 0:
                    w = (max(ys) - min(ys)) * scale
                if h == 0:
                    h = (max(zs) - min(zs)) * scale
        except:
            pass

    return {
        'l': round(l, 6),
        'w': round(w, 6),
        'h': round(h, 6)
    }


def get_element_name(element):
    """Get the name of an IFC element, handling null values."""
    if is_null_or_empty(element):
        return None
    name = element.Name if hasattr(element, 'Name') else None
    return name if not is_null_or_empty(name) else None


def get_element_guid(element):
    """Get the GlobalId of an IFC element."""
    if is_null_or_empty(element):
        return None
    guid = element.GlobalId if hasattr(element, 'GlobalId') else None
    return guid if not is_null_or_empty(guid) else None


def get_storey_height(storey, ifc_file, scale=1.0):
    """Get the height of a building storey."""
    try:
        # Try from Qto_BuildingStoreyBaseQuantities
        for rel in ifc_file.by_type('IfcRelDefinesByProperties'):
            if storey in rel.RelatedObjects:
                prop_def = rel.RelatingPropertyDefinition
                if hasattr(prop_def, 'Name') and 'Qto_BuildingStoreyBaseQuantities' in str(prop_def.Name):
                    if hasattr(prop_def, 'Quantities'):
                        for qty in prop_def.Quantities:
                            if hasattr(qty, 'Name') and qty.Name == 'Height':
                                if hasattr(qty, 'LengthValue'):
                                    return round(qty.LengthValue * scale, 6)

        # Try from Elevation property
        if hasattr(storey, 'Elevation') and not is_null_or_empty(storey.Elevation):
            return round(storey.Elevation * scale, 6)
    except:
        pass
    return None


def get_walls_in_container(container, ifc_file):
    """Get all walls directly contained in a spatial element."""
    walls = []

    try:
        # Using IfcRelContainedInSpatialStructure
        for rel in ifc_file.by_type('IfcRelContainedInSpatialStructure'):
            if rel.RelatingStructure == container:
                for element in rel.RelatedElements:
                    if element.is_a('IfcWall') or element.is_a('IfcWallStandardCase'):
                        walls.append(element)
    except:
        pass

    return walls


def get_openings_in_container(container, ifc_file):
    """Get all doors and windows directly contained in a spatial element."""
    openings = []

    try:
        for rel in ifc_file.by_type('IfcRelContainedInSpatialStructure'):
            if rel.RelatingStructure == container:
                for element in rel.RelatedElements:
                    if element.is_a('IfcDoor') or element.is_a('IfcWindow'):
                        openings.append(element)
    except:
        pass

    return openings


def get_openings_for_wall(wall, ifc_file):
    """Get all openings (doors/windows) that fill voids in a wall.
    Returns list of tuples: (filling_element, opening_element)
    """
    openings = []

    try:
        # Find openings via IfcRelVoidsElement -> IfcOpeningElement -> IfcRelFillsElement
        for rel in ifc_file.by_type('IfcRelVoidsElement'):
            if rel.RelatingBuildingElement == wall:
                opening_element = rel.RelatedOpeningElement
                if opening_element:
                    # Find the filling element (door/window)
                    for fill_rel in ifc_file.by_type('IfcRelFillsElement'):
                        if fill_rel.RelatingOpeningElement == opening_element:
                            filling = fill_rel.RelatedBuildingElement
                            if filling and (filling.is_a('IfcDoor') or filling.is_a('IfcWindow')):
                                # Return both the filling element and the opening element
                                openings.append((filling, opening_element))
    except:
        pass

    return openings


def get_opening_dimensions(opening, ifc_file, scale=1.0):
    """Extract opening dimensions (width, height, depth)."""
    w, h, d = 0.0, 0.0, 0.0

    # Try from OverallWidth/OverallHeight attributes first (common for doors/windows)
    try:
        if hasattr(opening, 'OverallWidth') and not is_null_or_empty(opening.OverallWidth):
            w = opening.OverallWidth * scale
        if hasattr(opening, 'OverallHeight') and not is_null_or_empty(opening.OverallHeight):
            h = opening.OverallHeight * scale
    except:
        pass

    # Try from Qto properties
    try:
        qto_name = 'Qto_DoorBaseQuantities' if opening.is_a('IfcDoor') else 'Qto_WindowBaseQuantities'
        for rel in ifc_file.by_type('IfcRelDefinesByProperties'):
            if opening in rel.RelatedObjects:
                prop_def = rel.RelatingPropertyDefinition
                if hasattr(prop_def, 'Name') and qto_name in str(prop_def.Name):
                    if hasattr(prop_def, 'Quantities'):
                        for qty in prop_def.Quantities:
                            name = qty.Name if hasattr(qty, 'Name') else ''
                            if name == 'Width' and hasattr(qty, 'LengthValue') and w == 0:
                                w = qty.LengthValue * scale
                            elif name == 'Height' and hasattr(qty, 'LengthValue') and h == 0:
                                h = qty.LengthValue * scale
                            elif name == 'Depth' and hasattr(qty, 'LengthValue') and d == 0:
                                d = qty.LengthValue * scale
    except:
        pass

    # Try from geometry as fallback
    if w == 0 or h == 0:
        try:
            settings = ifcopenshell.geom.settings()
            shape = ifcopenshell.geom.create_shape(settings, opening)
            verts = shape.geometry.verts

            if verts:
                xs = verts[0::3]
                ys = verts[1::3]
                zs = verts[2::3]

                if w == 0:
                    w = (max(xs) - min(xs)) * scale
                if d == 0:
                    d = (max(ys) - min(ys)) * scale
                if h == 0:
                    h = (max(zs) - min(zs)) * scale
        except:
            pass

    return {
        'w': round(w, 6),
        'h': round(h, 6),
        'd': round(d, 6)
    }


def process_opening(opening, opening_element, wall, ifc_file, scale):
    """Process a single opening (door/window) and extract its data.

    Args:
        opening: The IfcDoor or IfcWindow element
        opening_element: The IfcOpeningElement (void in wall) - contains position relative to wall
        wall: The parent IfcWall element (for computing relative position)
        ifc_file: The IFC file
        scale: Unit scale factor
    """
    opening_data = {}

    # Type
    if opening.is_a('IfcDoor'):
        opening_data['type'] = 'door'
    elif opening.is_a('IfcWindow'):
        opening_data['type'] = 'window'

    # ID (GlobalId)
    guid = get_element_guid(opening)
    if guid:
        opening_data['id'] = guid

    # Name
    name = get_element_name(opening)
    if name:
        opening_data['name'] = name

    # Size
    size = get_opening_dimensions(opening, ifc_file, scale)
    if size and (size['w'] > 0 or size['h'] > 0 or size['d'] > 0):
        opening_data['size'] = size

    # Position: compute opening position relative to wall using full transformation matrices
    if opening_element and wall:
        position = get_opening_position_relative_to_wall(opening_element, wall, scale)
        if position:
            opening_data['position'] = position

    return opening_data if opening_data else None


def get_spaces_in_storey(storey, ifc_file):
    """Get all spaces in a building storey."""
    spaces = []

    try:
        # Try IfcRelAggregates first
        for rel in ifc_file.by_type('IfcRelAggregates'):
            if rel.RelatingObject == storey:
                for obj in rel.RelatedObjects:
                    if obj.is_a('IfcSpace'):
                        spaces.append(obj)
    except:
        pass

    try:
        # Also try IfcRelContainedInSpatialStructure
        for rel in ifc_file.by_type('IfcRelContainedInSpatialStructure'):
            if rel.RelatingStructure == storey:
                for element in rel.RelatedElements:
                    if element.is_a('IfcSpace') and element not in spaces:
                        spaces.append(element)
    except:
        pass

    return spaces


def process_wall(wall, ifc_file, scale):
    """Process a single wall and extract its data."""
    wall_data = {}

    # ID (GlobalId)
    guid = get_element_guid(wall)
    if guid:
        wall_data['id'] = guid

    # Name
    name = get_element_name(wall)
    if name:
        wall_data['name'] = name

    # Size
    size = get_wall_dimensions(wall, ifc_file, scale)
    if size and (size['l'] > 0 or size['w'] > 0 or size['h'] > 0):
        wall_data['size'] = size

    # Position and Direction from placement
    placement = wall.ObjectPlacement if hasattr(wall, 'ObjectPlacement') else None
    if not is_null_or_empty(placement):
        placement_data = get_placement_data(placement, scale)

        if placement_data:
            # Position (relative to parent/storey)
            if placement_data.get('position') and not is_zero_position(placement_data['position']):
                wall_data['position'] = placement_data['position']

            # Direction (yaw)
            if placement_data.get('direction') and abs(placement_data['direction'].get('yaw', 0)) > 0.0001:
                wall_data['direction'] = placement_data['direction']

    # Openings (doors/windows) in this wall
    openings = get_openings_for_wall(wall, ifc_file)
    if openings:
        openings_data = []
        for filling, opening_element in openings:
            opening_data = process_opening(filling, opening_element, wall, ifc_file, scale)
            if opening_data:
                openings_data.append(opening_data)
        if openings_data:
            wall_data['openings'] = openings_data

    return wall_data if wall_data else None


def process_space(space, ifc_file, scale):
    """Process a space and its contained walls."""
    space_data = {}

    # ID (GlobalId)
    guid = get_element_guid(space)
    if guid:
        space_data['id'] = guid

    name = get_element_name(space)
    if name:
        space_data['name'] = name

    # Position
    placement = space.ObjectPlacement if hasattr(space, 'ObjectPlacement') else None
    if not is_null_or_empty(placement):
        placement_data = get_placement_data(placement, scale)
        if placement_data and placement_data.get('position') and not is_zero_position(placement_data['position']):
            space_data['position'] = placement_data['position']

    # Walls in this space
    walls = get_walls_in_container(space, ifc_file)
    if walls:
        walls_data = []
        for wall in walls:
            wall_data = process_wall(wall, ifc_file, scale)
            if wall_data:
                walls_data.append(wall_data)
        if walls_data:
            space_data['walls'] = walls_data

    return space_data if space_data else None


def process_storey(storey, ifc_file, scale):
    """Process a building storey and its contents."""
    storey_data = {}

    # ID (GlobalId)
    guid = get_element_guid(storey)
    if guid:
        storey_data['id'] = guid

    name = get_element_name(storey)
    if name:
        storey_data['name'] = name

    # Position
    placement = storey.ObjectPlacement if hasattr(storey, 'ObjectPlacement') else None
    if not is_null_or_empty(placement):
        placement_data = get_placement_data(placement, scale)
        if placement_data and placement_data.get('position') and not is_zero_position(placement_data['position']):
            storey_data['position'] = placement_data['position']

    # Height
    height = get_storey_height(storey, ifc_file, scale)
    if height and height > 0:
        storey_data['height'] = height

    # Spaces
    spaces = get_spaces_in_storey(storey, ifc_file)
    if spaces:
        spaces_data = []
        for space in spaces:
            space_data = process_space(space, ifc_file, scale)
            if space_data:
                spaces_data.append(space_data)
        if spaces_data:
            storey_data['spaces'] = spaces_data

    # Walls directly in storey (not in a space)
    walls = get_walls_in_container(storey, ifc_file)
    if walls:
        walls_data = []
        for wall in walls:
            wall_data = process_wall(wall, ifc_file, scale)
            if wall_data:
                walls_data.append(wall_data)
        if walls_data:
            storey_data['walls'] = walls_data

    # Openings directly in storey (not associated with walls)
    # Collect openings already processed via walls to avoid duplicates
    processed_opening_ids = set()
    if walls:
        for wall in walls:
            wall_openings = get_openings_for_wall(wall, ifc_file)
            for filling, opening_element in wall_openings:
                op_id = get_element_guid(filling)
                if op_id:
                    processed_opening_ids.add(op_id)

    storey_openings = get_openings_in_container(storey, ifc_file)
    if storey_openings:
        openings_data = []
        for opening in storey_openings:
            op_id = get_element_guid(opening)
            # Skip if already processed as part of a wall
            if op_id and op_id in processed_opening_ids:
                continue
            # Standalone openings don't have an IfcOpeningElement or wall
            opening_data = process_opening(opening, None, None, ifc_file, scale)
            if opening_data:
                openings_data.append(opening_data)
        if openings_data:
            storey_data['openings'] = openings_data

    return storey_data if storey_data else None


def process_building(building, ifc_file, scale):
    """Process a building and its storeys."""
    building_data = {}

    # ID (GlobalId)
    guid = get_element_guid(building)
    if guid:
        building_data['id'] = guid

    name = get_element_name(building)
    if name:
        building_data['name'] = name

    # Position
    placement = building.ObjectPlacement if hasattr(building, 'ObjectPlacement') else None
    if not is_null_or_empty(placement):
        placement_data = get_placement_data(placement, scale)
        if placement_data and placement_data.get('position') and not is_zero_position(placement_data['position']):
            building_data['position'] = placement_data['position']

    # Storeys
    storeys = []
    try:
        for rel in ifc_file.by_type('IfcRelAggregates'):
            if rel.RelatingObject == building:
                for obj in rel.RelatedObjects:
                    if obj.is_a('IfcBuildingStorey'):
                        storeys.append(obj)
    except:
        pass

    if storeys:
        storeys_data = []
        for storey in storeys:
            storey_data = process_storey(storey, ifc_file, scale)
            if storey_data:
                storeys_data.append(storey_data)
        if storeys_data:
            building_data['storeys'] = storeys_data

    return building_data if building_data else None


def process_site(site, ifc_file, scale):
    """Process a site and its buildings."""
    site_data = {}

    # ID (GlobalId)
    guid = get_element_guid(site)
    if guid:
        site_data['id'] = guid

    name = get_element_name(site)
    if name:
        site_data['name'] = name

    # Position
    placement = site.ObjectPlacement if hasattr(site, 'ObjectPlacement') else None
    if not is_null_or_empty(placement):
        placement_data = get_placement_data(placement, scale)
        if placement_data and placement_data.get('position') and not is_zero_position(placement_data['position']):
            site_data['position'] = placement_data['position']

    # Buildings
    buildings = []
    try:
        for rel in ifc_file.by_type('IfcRelAggregates'):
            if rel.RelatingObject == site:
                for obj in rel.RelatedObjects:
                    if obj.is_a('IfcBuilding'):
                        buildings.append(obj)
    except:
        pass

    if buildings:
        buildings_data = []
        for building in buildings:
            building_data = process_building(building, ifc_file, scale)
            if building_data:
                buildings_data.append(building_data)
        if buildings_data:
            site_data['buildings'] = buildings_data

    return site_data if site_data else None


def process_hierarchy(ifc_file):
    """Process the entire IFC hierarchy and build the JSON structure."""
    scale = get_unit_scale(ifc_file)

    # Get project
    projects = ifc_file.by_type('IfcProject')
    if not projects:
        print("ERROR: No IfcProject found in the file.")
        return None

    project = projects[0]
    project_data = {}

    # ID (GlobalId)
    guid = get_element_guid(project)
    if guid:
        project_data['id'] = guid

    name = get_element_name(project)
    if name:
        project_data['name'] = name

    # Get sites
    sites = []
    try:
        for rel in ifc_file.by_type('IfcRelAggregates'):
            if rel.RelatingObject == project:
                for obj in rel.RelatedObjects:
                    if obj.is_a('IfcSite'):
                        sites.append(obj)
    except:
        pass

    if sites:
        sites_data = []
        for site in sites:
            site_data = process_site(site, ifc_file, scale)
            if site_data:
                sites_data.append(site_data)
        if sites_data:
            project_data['sites'] = sites_data

    return {'project': project_data}


def main():
    """Main function to run the extraction."""
    # Check if Blender file is saved
    if not bpy.data.filepath:
        print("ERROR: Please save the Blender file first before running this script.")
        return

    # Get the IFC file from BlenderBIM
    try:
        ifc_file = IfcStore.get_file()
    except:
        ifc_file = None

    if ifc_file is None:
        print("ERROR: No IFC file is currently open in BlenderBIM/IfcBonsai.")
        print("Please open an IFC file using File > Open IFC or the BlenderBIM panel.")
        return

    print("Processing IFC file...")

    # Process the hierarchy
    result = process_hierarchy(ifc_file)

    if result is None:
        print("ERROR: Failed to process the IFC file.")
        return

    # Count walls and openings
    wall_count = 0
    opening_count = 0
    door_count = 0
    window_count = 0

    def count_elements(obj):
        nonlocal wall_count, opening_count, door_count, window_count
        if isinstance(obj, dict):
            if 'walls' in obj:
                wall_count += len(obj['walls'])
                # Count openings within walls
                for wall in obj['walls']:
                    if 'openings' in wall:
                        for op in wall['openings']:
                            opening_count += 1
                            if op.get('type') == 'door':
                                door_count += 1
                            elif op.get('type') == 'window':
                                window_count += 1
            # Count standalone openings (not in walls)
            if 'openings' in obj and not isinstance(obj.get('walls'), list):
                for op in obj['openings']:
                    opening_count += 1
                    if op.get('type') == 'door':
                        door_count += 1
                    elif op.get('type') == 'window':
                        window_count += 1
            elif 'openings' in obj:
                # Openings at storey level (not in walls)
                for op in obj['openings']:
                    opening_count += 1
                    if op.get('type') == 'door':
                        door_count += 1
                    elif op.get('type') == 'window':
                        window_count += 1
            for v in obj.values():
                count_elements(v)
        elif isinstance(obj, list):
            for item in obj:
                count_elements(item)

    count_elements(result)

    # Output path - use Blender filename
    blend_dir = os.path.dirname(bpy.data.filepath)
    blend_filename = os.path.basename(bpy.data.filepath)
    blend_name = os.path.splitext(blend_filename)[0]
    # Clean filename
    safe_name = "".join(c for c in blend_name if c.isalnum() or c in (' ', '-', '_')).strip()
    safe_name = safe_name or 'ifc_reference'
    output_filename = f"{safe_name}_reference.json"
    output_path = os.path.join(blend_dir, output_filename)

    # Write JSON
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"\nExtraction complete!")
    print(f"  Walls found: {wall_count}")
    print(f"  Openings found: {opening_count} (Doors: {door_count}, Windows: {window_count})")
    print(f"  Output file: {output_path}")


# Run the script
if __name__ == "__main__":
    main()
else:
    # When run from Blender's text editor, also execute
    main()
