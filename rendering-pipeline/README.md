# Rendering pipeline

Pipeline de geometria paramétrica: construtores → descriptor → adaptador de engine (DEC-A3).

## Estrutura (alvo)

```
rendering-pipeline/
  rendering-descriptors/
  basic-generator/
  column-generator/
  wall-generator/
  engine-adapter/
    three-js-adapter/
```

## Camadas

| Camada | Pasta | Responsabilidade |
|--------|--------|------------------|
| **Construtores** | Uma pasta por gerador: `basic-generator/`, `column-generator/`, `wall-generator/`, etc. | Lógica de domínio paramétrico: recebem parâmetros (e tarefas) e produzem `GeometryDescriptor`. Não conhecem engine. |
| **Descrição genérica** | `rendering-descriptors/` | Contrato compartilhado: tipos de geometria e material (posições, índices, UVs, cor, opacidade). Neutro (sem Three.js, Unity, etc.). |
| **Adaptadores** | `engine-adapter/` com um adaptador por engine (`three-js-adapter/`, futuramente `unity-adapter/`, etc.) | Consomem `GeometryDescriptor` + pose e produzem objetos da engine (ex.: `THREE.Group`). Conhecem só a engine e o contrato. |

Fluxo: **construtor → GeometryDescriptor → adaptador**.

## Coluna (DEC-A3)

Coluna migrada para o pipeline único:

- **Column** — `buildColumn()` chama `ColumnGeometryBuilder` → `GeometryDescriptor` → `engine-adapter/three-js-adapter` (`create`). Estilo e dispose via `updateInstance` e `dispose` do mesmo adaptador. Sem dependência de `THREE.BoxGeometry` ou adapter específico de coluna.
