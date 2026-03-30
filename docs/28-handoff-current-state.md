# 28. Handoff: Current State and Next Action

## Статус

Текущий handoff-документ для передачи состояния проекта между итерациями работы.

Назначение:

- быстро показать, что сейчас является каноном;
- зафиксировать, что уже сделано;
- развести актуальный и legacy слои;
- указать следующий рабочий шаг без необходимости перечитывать весь репозиторий.

## 1. Актуальный канон

Основной канон:

- [master-spec.md](F:\project\Lilith\master-spec.md)

Ключевые supporting-docs:

- [27-strategic-development-spec.md](F:\project\Lilith\docs\27-strategic-development-spec.md)
- [26-development-spec-v2.md](F:\project\Lilith\docs\26-development-spec-v2.md)
- [02-architecture.md](F:\project\Lilith\docs\02-architecture.md)
- [03-workflow-phases.md](F:\project\Lilith\docs\03-workflow-phases.md)
- [09-acceptance-criteria.md](F:\project\Lilith\docs\09-acceptance-criteria.md)
- [11-contracts-overview.md](F:\project\Lilith\docs\11-contracts-overview.md)

Governance basis:

- [19-node-selection-principle.md](F:\project\Lilith\docs\19-node-selection-principle.md)
- [20-node-decision-card-template.md](F:\project\Lilith\docs\20-node-decision-card-template.md)
- [21-decision-card-ai-root-node.md](F:\project\Lilith\docs\21-decision-card-ai-root-node.md)

Migration basis:

- [24-spec-delta-v1-v2.md](F:\project\Lilith\docs\24-spec-delta-v1-v2.md)
- [25-v2-runtime-migration-plan.md](F:\project\Lilith\docs\25-v2-runtime-migration-plan.md)

## 2. Что уже сделано

1. `v2` принят как текущий канон.
2. Под него переписаны architecture, phases, acceptance, contracts и policy-слой.
3. Создан отдельный стратегический spec для management-уровня.
4. Создан отдельный implementation-spec для команды разработки.
5. Неактуальный документальный слой вынесен в `legacy quarantine`.

## 3. Legacy Quarantine

Все неактуальные документы перемещены в:

- [legacy-quarantine](F:\project\Lilith\docs\legacy-quarantine)

Там находятся:

- `master-spec-v1.1.0-archive.md`
- `01-product-scope.md`
- `10-repo-skeleton.md`
- `12-implementation-plan.md`
- `13-bootstrap-acceptance-matrix.md`
- `14-delivery-plan.md`
- `16-phase-1-retrospective-hardening.md`
- `spec-pack-manifest.json` в `docs/legacy-quarantine/`

Эти файлы больше не считаются частью актуального рабочего слоя.

## 4. Текущее состояние runtime

### Что есть

- существует рабочий `v1 baseline`;
- текущие `v1` workflow и удалённый инстанс ещё не пересобирались под `v2`;
- `v2` канон и planning-layer уже готовы к началу controlled runtime migration.

### Чего ещё нет

- не выполнен `WF-00 Baseline Freeze` как отдельный `v2` артефакт;
- не собран `v2` runtime inventory;
- не созданы первые `v2` workflow-файлы;
- не создан отдельный `v2` remote workflow set на инстансе.

## 5. Следующий обязательный шаг

Следующий рабочий шаг:

### `WF-00 Baseline Freeze`

Нужно сделать:

1. зафиксировать inventory текущего `v1` baseline;
2. отдельно описать локальные `v1` workflow и их роль;
3. отдельно зафиксировать удалённые `v1` workflow, ids, names, paths и bindings;
4. создать первый `v2` checklist для `WF-00`;
5. подготовить основу для additive запуска `v2`, не трогая текущий `v1`.

## 6. Что нельзя делать на следующем шаге

- нельзя обновлять существующие `v1` workflow “на месте”;
- нельзя переиспользовать старые webhook paths под `v2`;
- нельзя смешивать `v1 evidence` и `v2 evidence`;
- нельзя перескакивать сразу к `WF-02 Agent Core`, не зафиксировав `WF-00` и `WF-01`.

## 7. Рабочая логика ближайших фаз

1. `WF-00 Baseline Freeze`
2. `WF-01 Ingress Safety Shell`
3. `WF-02 Agent Core Baseline`

Только после этого разумно идти в memory/retrieval/handoff/lead runtime.

## 8. Основные риски

### Risk 1 — смешение v1 и v2

Если `v2` начнёт строиться поверх существующего `v1`, evidence и runtime boundaries станут неинтерпретируемыми.

### Risk 2 — agent захватит внешние side effects

Если не удержать workflow-owned границы, система потеряет прозрачность и управляемость.

### Risk 3 — прыжок через foundation

Если начать с memory/retrieval/handoff до Ingress Safety Shell и Agent Core Baseline, архитектура снова станет неустойчивой.

## 9. Что читать следующему исполнителю в первую очередь

1. [master-spec.md](F:\project\Lilith\master-spec.md)
2. [27-strategic-development-spec.md](F:\project\Lilith\docs\27-strategic-development-spec.md)
3. [26-development-spec-v2.md](F:\project\Lilith\docs\26-development-spec-v2.md)
4. [25-v2-runtime-migration-plan.md](F:\project\Lilith\docs\25-v2-runtime-migration-plan.md)
5. [03-workflow-phases.md](F:\project\Lilith\docs\03-workflow-phases.md)

## 10. Критерий завершения текущего handoff-state

Текущий handoff-state считается исчерпанным, когда:

- выполнен `WF-00`;
- собран `v1 inventory`;
- создан первый `v2` runtime artifact pack;
- можно предметно переходить к `WF-01`.
