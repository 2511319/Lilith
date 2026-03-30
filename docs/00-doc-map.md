# 00. Docs Map and Status Matrix

## Статус

Рабочий реестр документации репозитория.

Нужен, чтобы:

- удерживать один актуальный слой документации;
- отделять действующий канон от governance, operational и legacy слоёв;
- не плодить параллельные “почти главные” документы;
- явно держать неактуальный материал в отдельном legacy quarantine.

## Правило слоёв

- `canonical`: действующий источник истины.
- `canonical-supporting-doc`: обязательный supporting-doc к канону.
- `governance`: правила принятия архитектурных и implementation решений.
- `operational`: рабочие планы, runbooks, migration и handoff-артефакты.
- `reference`: живой справочный слой, который всё ещё нужен действующему канону.
- `legacy-quarantine`: неактуальный слой, сохранённый только для исторической справки.

## Жёсткие правила

1. Каноническим источником истины является [master-spec.md](F:\project\Lilith\master-spec.md).
2. Любой неактуальный документ должен уходить в `docs/legacy-quarantine/`, а не оставаться вперемешку с действующим слоем.
3. Новый документ нельзя добавлять в `docs/`, если его роль не укладывается в эту карту.
4. Нельзя держать параллельный второй канон под видом “драфта”, если решение уже принято.

## Status Matrix

| Документ | Роль сейчас | Статус | Целевой статус | Действие |
|---|---|---|---|---|
| [master-spec.md](F:\project\Lilith\master-spec.md) | Канон v2 | `canonical` | `canonical` | Поддерживать как единственный источник истины |
| [02-architecture.md](F:\project\Lilith\docs\02-architecture.md) | Архитектура v2 | `canonical-supporting-doc` | `canonical-supporting-doc` | Поддерживать синхронно с `master-spec.md` |
| [03-workflow-phases.md](F:\project\Lilith\docs\03-workflow-phases.md) | Phase map v2 | `canonical-supporting-doc` | `canonical-supporting-doc` | Поддерживать синхронно с `master-spec.md` |
| [04-sales-policy.md](F:\project\Lilith\docs\04-sales-policy.md) | Sales governance v2 | `canonical-supporting-doc` | `canonical-supporting-doc` | Поддерживать как policy-слой v2 |
| [05-handoff-policy.md](F:\project\Lilith\docs\05-handoff-policy.md) | Handoff policy v2 | `canonical-supporting-doc` | `canonical-supporting-doc` | Поддерживать как explicit handoff policy |
| [06-rag-policy.md](F:\project\Lilith\docs\06-rag-policy.md) | Retrieval policy v2 | `canonical-supporting-doc` | `canonical-supporting-doc` | Поддерживать как retrieval/grounding policy |
| [07-lead-policy.md](F:\project\Lilith\docs\07-lead-policy.md) | Lead gateway policy v2 | `canonical-supporting-doc` | `canonical-supporting-doc` | Поддерживать как policy lead-flow v2 |
| [08-observability.md](F:\project\Lilith\docs\08-observability.md) | Observability v2 | `canonical-supporting-doc` | `canonical-supporting-doc` | Поддерживать как agent/tool/memory observability policy |
| [09-acceptance-criteria.md](F:\project\Lilith\docs\09-acceptance-criteria.md) | Acceptance layer v2 | `canonical-supporting-doc` | `canonical-supporting-doc` | Поддерживать как acceptance basis |
| [11-contracts-overview.md](F:\project\Lilith\docs\11-contracts-overview.md) | Contract layer v2 | `canonical-supporting-doc` | `canonical-supporting-doc` | Поддерживать как contract basis |
| [15-chatwoot-real-contract.md](F:\project\Lilith\docs\15-chatwoot-real-contract.md) | Real upstream contract | `reference` | `keep` | Сохранить как живой источник истины по Chatwoot |
| [17-architecture-direction-adr.md](F:\project\Lilith\docs\17-architecture-direction-adr.md) | ADR по направлению | `governance` | `keep-reference` | Сохранить как decision basis |
| [18-agent-first-revision-plan.md](F:\project\Lilith\docs\18-agent-first-revision-plan.md) | План controlled rewrite | `operational` | `keep-until-migration` | Держать до завершения runtime migration |
| [19-node-selection-principle.md](F:\project\Lilith\docs\19-node-selection-principle.md) | Принцип выбора сущностей | `governance` | `keep` | Постоянный governance-doc |
| [20-node-decision-card-template.md](F:\project\Lilith\docs\20-node-decision-card-template.md) | Шаблон decision card | `governance` | `keep` | Постоянный reusable template |
| [21-decision-card-ai-root-node.md](F:\project\Lilith\docs\21-decision-card-ai-root-node.md) | Первая реальная decision card | `governance` | `keep-reference` | Сохранить как basis для v2 |
| [24-spec-delta-v1-v2.md](F:\project\Lilith\docs\24-spec-delta-v1-v2.md) | Spec delta v1 -> v2 | `operational` | `keep-until-migration` | Держать как migration basis |
| [25-v2-runtime-migration-plan.md](F:\project\Lilith\docs\25-v2-runtime-migration-plan.md) | Runtime migration plan v2 | `operational` | `keep-until-migration` | Держать как rollout/rollback basis |
| [26-development-spec-v2.md](F:\project\Lilith\docs\26-development-spec-v2.md) | Подробная спецификация разработки v2 | `canonical-supporting-doc` | `canonical-supporting-doc` | Использовать как implementation-doc перед сборкой WF-* |
| [27-strategic-development-spec.md](F:\project\Lilith\docs\27-strategic-development-spec.md) | Стратегическая спецификация разработки | `canonical-supporting-doc` | `canonical-supporting-doc` | Использовать как независимый management-doc |
| [28-handoff-current-state.md](F:\project\Lilith\docs\28-handoff-current-state.md) | Текущий handoff документ | `operational` | `keep-until-next-handoff` | Использовать как быстрый state-transfer между итерациями |

## Legacy Quarantine

Следующие документы больше не считаются актуальным слоем и сохранены только как историческая справка:

- [master-spec-v1.1.0-archive.md](F:\project\Lilith\docs\legacy-quarantine\master-spec-v1.1.0-archive.md)
- [01-product-scope.md](F:\project\Lilith\docs\legacy-quarantine\01-product-scope.md)
- [10-repo-skeleton.md](F:\project\Lilith\docs\legacy-quarantine\10-repo-skeleton.md)
- [12-implementation-plan.md](F:\project\Lilith\docs\legacy-quarantine\12-implementation-plan.md)
- [13-bootstrap-acceptance-matrix.md](F:\project\Lilith\docs\legacy-quarantine\13-bootstrap-acceptance-matrix.md)
- [14-delivery-plan.md](F:\project\Lilith\docs\legacy-quarantine\14-delivery-plan.md)
- [16-phase-1-retrospective-hardening.md](F:\project\Lilith\docs\legacy-quarantine\16-phase-1-retrospective-hardening.md)
- [spec-pack-manifest.json](F:\project\Lilith\docs\legacy-quarantine\spec-pack-manifest.json)

## Рабочий вывод

### Актуальный канонический слой

- [master-spec.md](F:\project\Lilith\master-spec.md)
- [02-architecture.md](F:\project\Lilith\docs\02-architecture.md)
- [03-workflow-phases.md](F:\project\Lilith\docs\03-workflow-phases.md)
- [04-sales-policy.md](F:\project\Lilith\docs\04-sales-policy.md)
- [05-handoff-policy.md](F:\project\Lilith\docs\05-handoff-policy.md)
- [06-rag-policy.md](F:\project\Lilith\docs\06-rag-policy.md)
- [07-lead-policy.md](F:\project\Lilith\docs\07-lead-policy.md)
- [08-observability.md](F:\project\Lilith\docs\08-observability.md)
- [09-acceptance-criteria.md](F:\project\Lilith\docs\09-acceptance-criteria.md)
- [11-contracts-overview.md](F:\project\Lilith\docs\11-contracts-overview.md)
- [27-strategic-development-spec.md](F:\project\Lilith\docs\27-strategic-development-spec.md)
- [26-development-spec-v2.md](F:\project\Lilith\docs\26-development-spec-v2.md)

### Governance слой

- [17-architecture-direction-adr.md](F:\project\Lilith\docs\17-architecture-direction-adr.md)
- [19-node-selection-principle.md](F:\project\Lilith\docs\19-node-selection-principle.md)
- [20-node-decision-card-template.md](F:\project\Lilith\docs\20-node-decision-card-template.md)
- [21-decision-card-ai-root-node.md](F:\project\Lilith\docs\21-decision-card-ai-root-node.md)

### Operational слой

- [18-agent-first-revision-plan.md](F:\project\Lilith\docs\18-agent-first-revision-plan.md)
- [24-spec-delta-v1-v2.md](F:\project\Lilith\docs\24-spec-delta-v1-v2.md)
- [25-v2-runtime-migration-plan.md](F:\project\Lilith\docs\25-v2-runtime-migration-plan.md)
- [28-handoff-current-state.md](F:\project\Lilith\docs\28-handoff-current-state.md)

## Ближайшие обязательные шаги

1. Поддерживать `master-spec.md` и supporting-docs синхронно.
2. Не возвращать legacy-файлы в актуальный слой без отдельного решения.
3. Использовать [25-v2-runtime-migration-plan.md](F:\project\Lilith\docs\25-v2-runtime-migration-plan.md) и [26-development-spec-v2.md](F:\project\Lilith\docs\26-development-spec-v2.md) как рабочую пару перед активной пересборкой runtime.
