# Especificação — Parede Sólida (IfcWall::SOLIDWALL)

**Classe abstrata:** [element-type-spec.md](element-type-spec.md)
**Sprint:** [sprint.md](../../../../../01_STRATEGY_&_OUTCOMES/01.4_Sprint_Execution/2026-03-canteiro-detalhes-registro/sprint.md)
**Maturidade alvo:** **3. Funcional**

---

## 1. Identificação

| Campo | Valor |
|-------|-------|
| **id** | `SOLID_WALL` |
| **ifcEntity** | `IfcWall` (subtype de `IfcBuiltElement`) |
| **ifcPredefinedType** | `SOLIDWALL` |
| **bsDD** | IFC 4.3 — IfcWallTypeEnum.SOLIDWALL |
| **adapterComponentId** | `three-solid-wall-adapter` |

---

## 2. Nome e descrição (bsDD EN / PT)

| Idioma | Nome | Descrição |
|--------|------|-----------|
| **EN** | Solid Wall | A masonry or concrete wall construction for the wall core being the single layer or having multiple layers attached. Such walls are often load bearing and fire rated. |
| **PT** | Parede Sólida | Uma construção de parede maciça para o núcleo da parede sendo a camada única ou tendo múltiplas camadas anexadas. Tais paredes são frequentemente de alvenaria ou concreto (moldadas in-situ ou pré-moldadas) que suportam carga e protegem contra incêndio. |

---

## 3. Interpretação interna Syncker

A parede sólida é o tipo de parede mais comum em canteiros de obras brasileiros (alvenaria estrutural ou de vedação, concreto moldado in-loco). No contexto da Syncker:

- **Caso de uso primário:** é o elemento cuja execução (alvenaria, fiada por fiada) é mais visualmente rastreável pelo agente visuoespacial. O progresso de construção pode ser inferido pela altura relativa das fiadas visíveis.
- **Aberturas:** portas e janelas geram regiões de não-colisão para o agente; são críticas para detecção de pose e inferência de trajeto.
- **Dependências:** parede depende do piso/laje abaixo e é dependência de vigas e lajes acima. Paredes adjacentes formam relações BESIDE.
- **Distinção de PLUMBINGWALL:** a parede sólida se estende tipicamente do piso ao teto (ou à viga); a hidráulica pode ser mais curta.

---

## 4. Parâmetros de entrada (IFC → ElementParams)

| Propriedade IFC | Campo em ElementParams | Tipo | Obrigatório |
|-----------------|------------------------|------|-------------|
| Pset_WallCommon.Width ou geometria | `thickness` | `number` (metros) | Sim |
| Geometria / representação | `length` | `number` (metros) | Sim |
| Geometria / representação | `height` | `number` (metros) | Sim |
| IfcOpeningElement (relacionados) | `openings[]` | `OpeningParams[]` | Não |
| ObjectPlacement | `position` | `Vector3` | Sim |
| ObjectPlacement | `rotation` | `Quaternion` | Sim |

### Observações

- Se `thickness` não estiver em Pset_WallCommon, derivar da geometria de representação (largura perpendicular ao eixo da parede).
- Paredes curvas (`IfcWall` com eixo curvo) estão **fora do escopo** desta sprint; tratar como paredes retas com aproximação poligonal.

---

## 5. Factory — createInstance

```typescript
class SolidWallType extends ElementType {
  createInstance(ifcElement: IFCProjectElement, params?: Partial<ElementParams>): SolidWallElement {
    // 1. Validar ifcType === 'IfcWall' && predefinedType === 'SOLIDWALL'
    // 2. Extrair length, height, thickness de ifcElement.properties ou geometria
    // 3. Extrair openings de ifcElement.openings (se houver)
    // 4. Criar SolidWallElement com:
    //    - id: gerado (UUID ou hash do globalId)
    //    - typeId: 'SOLID_WALL'
    //    - ifcGlobalId: ifcElement.globalId
    //    - position, rotation: de ifcElement
    //    - params: { length, height, thickness, openings }
    //    - constructionState: PROJECTED
    //    - completionPercentage: 0
    //    - taskIds: [] (vinculados na preparação)
    // 5. Retornar instância
  }
}
```

---

## 6. Bounding boxes

### 6.1 Elemento concluído (getCompletedBoundingBox)

AABB que envolve toda a geometria da parede, incluindo espessura, comprimento e altura completos. Aberturas não reduzem o BB do corpo; são tratadas separadamente.

```
min: (position.x, position.y, position.z)
max: (position.x + length, position.y + height, position.z + thickness)
```

*(Rotação aplicada ao AABB; o resultado é o AABB axis-aligned que envolve a parede rotacionada.)*

### 6.2 Estado de execução (getExecutionStateBoundingBox)

A parede de alvenaria cresce **de baixo para cima** (fiada por fiada). O BB de execução é:

```
height_exec = height × progress  // progress: 0.0 a 1.0
min: (position.x, position.y, position.z)
max: (position.x + length, position.y + height_exec, position.z + thickness)
```

Para concreto moldado in-loco: a fôrma cobre a altura total desde o início; o BB é igual ao concluído a partir do momento em que a fôrma é montada. Diferenciar por subtipo de material, se necessário.

### 6.3 Aberturas (getOpeningBoundingBoxes / getExpandedOpeningBoundingBoxes)

Cada abertura (porta, janela) gera um AABB:

```
opening_bb: {
  min: (opening.position.x, opening.position.y, position.z - margin),
  max: (opening.position.x + opening.width, opening.position.y + opening.height, position.z + thickness + margin)
}
```

Abertura expandida (para teste de colisão do agente): aplica `expansionFactor` (por eixo) ao AABB da abertura. Expansão típica: `{ x: 0.1, y: 0.05, z: 0.3 }` (30 cm na profundidade para passagem).

**Regra de colisão (patente):** se o centroide do agente está dentro de alguma `expandedOpeningBB`, desconsidera a colisão com o corpo da parede.

---

## 7. Centroide e key points

### Centroide

Centro geométrico do corpo da parede (excluindo aberturas):

```
centroid: {
  x: position.x + length / 2,
  y: position.y + height / 2,
  z: position.z + thickness / 2
}
```

### Key points

Posições em **espaço local com origem no centroide da parede** (centro em `(0, 0, 0)`; mesma convenção da geometria e do placement). Cantos em `±(length/2, height/2, 0)`; espessura em `z ∈ [-thickness/2, thickness/2]`.

| ID | Semantic | Posição relativa (origem = centroide) |
|----|----------|--------------------------------------|
| `CORNER_BOTTOM_LEFT` | Canto inferior esquerdo | `(-length/2, -height/2, 0)` |
| `CORNER_BOTTOM_RIGHT` | Canto inferior direito | `(length/2, -height/2, 0)` |
| `CORNER_TOP_LEFT` | Canto superior esquerdo | `(-length/2, height/2, 0)` |
| `CORNER_TOP_RIGHT` | Canto superior direito | `(length/2, height/2, 0)` |
| `CENTER_FACE_FRONT` | Centro da face frontal | `(0, 0, -thickness/2)` |
| `CENTER_FACE_BACK` | Centro da face traseira | `(0, 0, thickness/2)` |
| `MID_BASE` | Ponto médio da base | `(0, -height/2, thickness/2)` |
| `MID_TOP` | Ponto médio do topo | `(0, height/2, thickness/2)` |
| `OPENING_CENTER_n` | Centro da abertura n | `(opening_n.position.x, opening_n.position.y, thickness/2)` — `position` já relativo ao centro |

---

## 8. Dependências físicas (PhysicalDependencyRule[])

| Estratégia | Tipos-alvo | Expansão BB | Descrição |
|------------|-----------|-------------|-----------|
| `BELOW` | `SLAB`, `FOUNDATION` | `{ x: 0, y: -0.05, z: 0 }` | Piso ou fundação que sustenta a parede. |
| `ABOVE` | `BEAM`, `SLAB` | `{ x: 0, y: 0.05, z: 0 }` | Viga ou laje que se apoia sobre a parede. |
| `BESIDE` | `SOLID_WALL`, `PLUMBING_WALL`, `COLUMN` | `{ x: 0.05, y: 0, z: 0.05 }` | Parede ou coluna adjacente (encontro em L, T ou +). |
| `ADJACENT` | `SOLID_WALL` | `{ x: 0.02, y: 0, z: 0.02 }` | Parede alinhada/contígua (mesma linha). |

---

## 9. Família de materiais

### MaterialFamily: `masonry-wall-materials`

| ID | Nome (EN/PT) | Propriedades |
|----|-------------|-------------|
| `brick-ceramic` | Ceramic Brick / Tijolo Cerâmico | `{ type: 'brick', density: 1800, fireRating: 'REI120' }` |
| `brick-concrete` | Concrete Block / Bloco de Concreto | `{ type: 'block', density: 2100, fireRating: 'REI120' }` |
| `concrete-cast` | Cast-in-place Concrete / Concreto Moldado In-Loco | `{ type: 'concrete', density: 2400, fireRating: 'REI180' }` |
| `concrete-precast` | Precast Concrete / Concreto Pré-Moldado | `{ type: 'precast', density: 2400, fireRating: 'REI120' }` |
| `mortar-finish` | Mortar Finish / Argamassa de Revestimento | `{ type: 'finish', thickness: 0.02 }` |
| `plaster-finish` | Plaster / Reboco | `{ type: 'finish', thickness: 0.015 }` |

Seleção por seed: `hash(element.id + projectSeed) % options.length` para material principal; finish separado.

---

## 10. Configuração de simulação

```typescript
getSimulationConfig(): SimulationConfig {
  return {
    roles: [SimulationRole.COLLIDABLE, SimulationRole.REFERENCE],
    isWalkable: false,
    isCollidable: true,
  };
}
```

**Nota:** a parede é colidível por padrão. Nas regiões de aberturas expandidas, o agente visuoespacial desconsidera a colisão (lógica no agente, não no tipo). O tipo fornece as AABBs das aberturas expandidas para essa decisão. Classificar como `REFERENCE` — paredes são bons elementos de referência para enquadramento do agente.

---

## 11. Parâmetros estocásticos

| Nome | Média | Desvio padrão | Unidade | Distribuição | Observação |
|------|-------|---------------|---------|--------------|------------|
| `thickness_tolerance` | 0 | 0.005 | m | normal | Tolerância dimensional (NBR 15270 / NBR 6136). A calibrar com dados reais. |
| `height_tolerance` | 0 | 0.003 | m | normal | Variação por fiada acumulada. A calibrar. |
| `alignment_deviation` | 0 | 0.004 | m | normal | Desvio de prumo. A calibrar. |
| `mortar_joint_thickness` | 0.01 | 0.002 | m | normal | Espessura da junta de argamassa. |
| `surface_roughness` | 0.5 | 0.15 | — | uniform | Fator de rugosidade para texturização (0–1). |

---

## 12. Manipulação de estado de tarefa (handleTaskStateChange)

```typescript
handleTaskStateChange(instance: SolidWallElement, taskState: TaskState): ElementStyleUpdate {
  const completionPercentage = taskState.completionPercentage;

  let constructionState: ConstructionState;
  if (completionPercentage === 0) constructionState = ConstructionState.PROJECTED;
  else if (completionPercentage < 100) constructionState = ConstructionState.REAL;
  else constructionState = ConstructionState.KNOWN;

  const styleValues: StyleValue[] = [];

  // Opacidade: projetado = semitransparente; real = sólido; conhecido = sólido
  styleValues.push({
    property: 'opacity',
    value: constructionState === ConstructionState.PROJECTED ? 0.3 : 1.0,
  });

  // Cor de destaque por status de prazo
  if (taskState.scheduleStatus === 'DELAYED') {
    styleValues.push({ property: 'highlightColor', value: '#E53E3E' }); // vermelho
  } else if (taskState.scheduleStatus === 'AHEAD') {
    styleValues.push({ property: 'highlightColor', value: '#38A169' }); // verde
  }

  // Qualidade
  if (taskState.qualityStatus === 'REJECTED') {
    styleValues.push({ property: 'outlineColor', value: '#E53E3E' });
    styleValues.push({ property: 'outlineWidth', value: 3 });
  }

  // Altura visível (para execução parcial)
  styleValues.push({ property: 'visibleHeight', value: instance.params.height * completionPercentage / 100 });

  return { constructionState, completionPercentage, styleValues };
}
```

---

## 13. Adaptador Three.js — requisitos

O adaptador `three-solid-wall-adapter` deve:

1. **Construir geometria** da parede a partir de `params` (length, height, thickness), com recortes para aberturas.
2. **Aplicar material** selecionado via `selectMaterials(seed)` — PBR (metalness, roughness, normalMap para tijolos/blocos).
3. **Controlar visibilidade parcial:** usar `clipPlane` horizontal em `visibleHeight` para simular execução parcial (fiadas).
4. **Aplicar destaques:** `highlightColor` via emissive ou postprocessing outline; `outlineColor`/`outlineWidth` via outline pass.
5. **Receber atualizações:** `updateInstance()` ajusta clipPlane, material, outline quando `taskState` muda.
6. **Dispose:** liberar geometry, material, textures.

---

## 14. Estados de construção e estilização

| Estado | Progresso | Representação visual |
|--------|-----------|---------------------|
| `PROJECTED` | 0% | Parede completa, semitransparente (wireframe ou ghost), cor neutra. |
| `REAL` (em execução) | 1–99% | Parede parcial (fiadas até `visibleHeight`), sólida, material real. Destaque por prazo. |
| `KNOWN` (concluído) | 100% | Parede completa, sólida, material real. Indicação de qualidade (outline se rejeitada). |

---

## 15. Referências

- [element-type-spec.md](element-type-spec.md) — classe abstrata e interfaces.
- [ifc-elements.md](../Mapping/ifc-elements.md) — mapeamento IFC ↔ Syncker.
- [tasks-resources.md](../Mapping/tasks-resources.md) — tarefas por tipo de elemento.
- [physical-dependencies.md](../Mapping/physical-dependencies.md) — dependências entre tipos.
- IFC 4.3 — IfcWall, IfcWallTypeEnum.SOLIDWALL.
- NBR 15270 (blocos cerâmicos), NBR 6136 (blocos de concreto) — tolerâncias dimensionais.
