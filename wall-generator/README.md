# wall-generator

Módulo TypeScript autônomo para gerar paredes 3D de alvenaria paramétrica com Three.js.
Implementa o tipo de elemento **SOLID_WALL** (`IfcWall::SOLIDWALL`) conforme a especificação `wall-solid.md`.

## Funcionalidades

- Paredes de alvenaria com blocos cerâmicos e juntas de argamassa
- Aberturas (portas e janelas) com snap automático aos limites de fiada
- Vergas acima das aberturas (quando aplicável)
- Encunhamento (infill) no topo da parede
- Simulação de progresso de construção (0–100%)
- Materiais PBR com texturas
- Bounding boxes (completa, execução, aberturas, aberturas expandidas)
- Key points semânticos e centroide (local e mundo)
- Parâmetros estocásticos para variação dimensional
- Seleção de família de materiais por seed
- Manipulação de estado de tarefa (projetado → em execução → concluído)

## Instalação

1. Copie a pasta `wall-generator/` para o seu projeto.
2. Instale as dependências peer:

```bash
npm install three three-bvh-csg
```

## Uso rápido

```typescript
import { createInstance } from './wall-generator';
import type { BuildMasonryWallParams } from './wall-generator';

const buildParams: BuildMasonryWallParams = {
  wall: {
    placement: {
      parent: null,
      position: { x: 0, y: 0, z: 0 },
      direction: { yaw: 0 }
    },
    size: { l: 0.14, w: 3.0, h: 2.8 },   // profundidade, largura, altura (metros)
    blockSize: { l: 0.39, w: 0, h: 0.19 }, // largura do bloco, não usado, altura
    cementThickness: 0.01
  },
  openings: [
    {
      placement: {
        parent: null,
        position: { x: 0, y: 0, z: 0 }, // relativo ao centro da parede
        direction: { yaw: 0 }
      },
      size: { l: 0.8, w: 0.14, h: 2.1 } // largura, profundidade, altura
    }
  ],
  task: { completion: 1.0 } // 0.0 a 1.0
};

const wallGroup = createInstance(undefined, { buildParams });
scene.add(wallGroup);
```

### Criando a partir de IFC

```typescript
import { createInstance } from './wall-generator';
import type { IFCProjectElement } from './wall-generator';

const ifcElement: IFCProjectElement = {
  globalId: '2O2Fr$t4X7Zf8NOew3FLOH',
  ifcType: 'IfcWall',
  predefinedType: 'SOLIDWALL',
  length: 3.0,
  height: 2.8,
  thickness: 0.14,
  position: { x: 5, y: 0, z: 2 },
  rotation: { x: 0, y: 0, z: 0, w: 1 }
};

const wallGroup = createInstance(ifcElement);
```

## API pública

### Factory

| Função | Descrição |
|--------|-----------|
| `createInstance(ifcElement?, params?)` | Cria instância da parede. Com IFC: valida `IfcWall/SOLIDWALL`, extrai params. Sem IFC: usa `params.buildParams`. Retorna `THREE.Group` com `userData` completo. |

**`CreateInstanceParams`** (segundo argumento):

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `buildParams` | `BuildMasonryWallParams` | Parâmetros de geometria (obrigatório sem IFC) |
| `id` | `string?` | ID da instância (auto-gerado se omitido); usado para derivar material quando não há `mainMaterialId` nem `materialSeed` |
| `typeId` | `string?` | Tipo do elemento (default: `'SOLID_WALL'`) |
| `ifcGlobalId` | `string?` | GlobalId IFC (preenchido automaticamente se via IFC) |
| `taskIds` | `string[]?` | IDs de tarefas vinculadas |
| `mainMaterialId` | `MaterialId?` | Preset de material principal (brick-ceramic, brick-concrete, etc.). Precedência: mainMaterialId > materialSeed > id. |
| `finishMaterialId` | `MaterialId?` | Preset de acabamento (mortar-finish, plaster-finish) |
| `materialSeed` | `number?` | Seed para seleção de material (usado quando `mainMaterialId` não está definido) |
| `applyStochastic` | `boolean?` | Aplicar variação estocástica às dimensões |
| `completion` | `number?` | Override do progresso (0–1) |

### Getters de instância

Todas aceitam `SolidWallInstance` (qualquer objeto com `userData: SolidWallUserData`).

| Função | Retorno | Descrição |
|--------|---------|-----------|
| `getCompletedBoundingBox(instance)` | `Bounds3D` | AABB da parede completa (mundo) |
| `getExecutionStateBoundingBox(instance)` | `Bounds3D` | AABB do estado de execução (mundo) |
| `getOpeningBoundingBoxes(instance)` | `Bounds3D[]` | AABBs das aberturas (mundo) |
| `getExpandedOpeningBoundingBoxes(instance)` | `Bounds3D[]` | AABBs expandidas para teste de colisão |
| `getCentroid(instance)` | `Position` | Centroide local |
| `getCentroidWorld(instance)` | `Position` | Centroide em coordenadas de mundo |
| `getKeyPoints(instance)` | `KeyPointsMap` | Key points semânticos (local) |
| `getKeyPointsWorld(instance)` | `KeyPointsMap` | Key points em coordenadas de mundo |

### Funções type-level (sem instância)

| Função | Retorno | Descrição |
|--------|---------|-----------|
| `getPhysicalDependencyRules()` | `PhysicalDependencyRule[]` | Regras de dependência (BELOW, ABOVE, BESIDE, ADJACENT) |
| `getSimulationConfig()` | `SimulationConfig` | Configuração de simulação (roles, walkable, collidable) |
| `getStochasticParams()` | `StochasticParamDef[]` | Parâmetros estocásticos (tolerâncias, rugosidade) |
| `selectMaterials(seed, elementId?)` | `SelectedMaterials` | Seleção determinística de material por seed |
| `getMaterialPresetColors(main)` | `MaterialPresetColors` | Cores do preset em #RRGGBB (brick, darkBrick, cement, lintel, infill) para UI |

### Estado de tarefa

| Função | Retorno | Descrição |
|--------|---------|-----------|
| `handleTaskStateChange(instance, taskState)` | `ElementStyleUpdate` | Calcula estilo visual a partir do estado de tarefa |

**`TaskState`:**

```typescript
{
  completionPercentage: number;         // 0–100
  scheduleStatus?: 'ON_TIME' | 'DELAYED' | 'AHEAD';
  qualityStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
}
```

**`ElementStyleUpdate`** retornado:

```typescript
{
  constructionState: 'PROJECTED' | 'REAL' | 'KNOWN';
  completionPercentage: number;
  styleValues: StyleValue[];  // opacity, visibleHeight, highlightColor, outlineColor, outlineWidth
}
```

### Adapter Three.js

| Função | Descrição |
|--------|-----------|
| `updateInstance(group, styleUpdate)` | Aplica `ElementStyleUpdate` ao grupo (opacity, clipPlane, emissive, outline) |
| `dispose(instance)` | Libera geometry, materials e textures do grupo |

### Constantes

| Constante | Valor | Descrição |
|-----------|-------|-----------|
| `TYPE_ID` | `'SOLID_WALL'` | Identificador do tipo de elemento |
| `EXPANSION_FACTOR` | `{ x: 0.1, y: 0.05, z: 0.3 }` | Fator de expansão para AABBs de abertura |

## Origem local (pivot)

O `THREE.Group` da parede tem **origem no centroide** (centro da parede). Todas as coordenadas em `keypoints`, `keypointsFull`, `centroid` e os AABBs em espaço local são relativas a esse centro. Ex.: cantos em `±(largura/2, altura/2, 0)`.

## Estrutura do `userData`

O `THREE.Group` retornado por `createInstance` contém em `userData`:

```typescript
{
  objectType: 'SolidWall';
  id: string;
  typeId: string;                     // 'SOLID_WALL'
  ifcGlobalId?: string; 
  position: Position;
  rotation: { x, y, z, w };          // Quaternion
  wall: WallParams;
  openings: OpeningParams[];
  task: { completion: number };       // 0–1
  modelParams: {
    isWalkable: boolean;
    isCollidable: boolean;
    roles: ['COLLIDABLE', 'REFERENCE'];
    keypoints: Keypoints;             // 4 cantos no plano z=0 (espaço centro)
    keypointsFull: KeyPointsMap;      // 9 pontos fixos + OPENING_CENTER_n
    centroid: Position;
  };
  bounds: {
    completed: Bounds3D;              // AABB parede completa (mundo)
    execution: Bounds3D;              // AABB estado de execução (mundo)
    openings: Bounds3D[];             // AABBs aberturas (mundo)
    openingsExpanded: Bounds3D[];     // AABBs expandidas (mundo)
  };
  constructionState: 'PROJECTED' | 'REAL' | 'KNOWN';
  completionPercentage: number;       // 0–100
  taskIds: string[];
}
```

## Unidades

Todas as medidas são em **SI (metros)**. Ângulos em **radianos**.

## Dependências

| Pacote | Tipo | Uso |
|--------|------|-----|
| `three` | peer | Geometria, materiais, cena 3D |
| `three-bvh-csg` | peer | Operações booleanas CSG para recortes de aberturas |

## Licença

MIT
