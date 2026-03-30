# Master Specification v2.0 — Agent-First Lilith

## Статус

Canonical Source of Truth.
Этот документ является действующим каноническим `master-spec.md` для проекта Lilith.
Предыдущая версия канона сохранена в legacy quarantine: [master-spec-v1.1.0-archive.md](F:\project\Lilith\docs\legacy-quarantine\master-spec-v1.1.0-archive.md).

Этот master-spec должен читаться синхронно с supporting-docs:

- [02-architecture.md](F:\project\Lilith\docs\02-architecture.md)
- [03-workflow-phases.md](F:\project\Lilith\docs\03-workflow-phases.md)
- [09-acceptance-criteria.md](F:\project\Lilith\docs\09-acceptance-criteria.md)
- [11-contracts-overview.md](F:\project\Lilith\docs\11-contracts-overview.md)
- [24-spec-delta-v1-v2.md](F:\project\Lilith\docs\24-spec-delta-v1-v2.md)
- [27-strategic-development-spec.md](F:\project\Lilith\docs\27-strategic-development-spec.md)
- [26-development-spec-v2.md](F:\project\Lilith\docs\26-development-spec-v2.md)

## 1. Назначение

Этот master-spec определяет Lilith как `agent-first` продукт:

- не просто LLM sales workflow;
- а agentic sales assistant system;
- при этом сохраняющий внешний deterministic safety shell.

## 2. Продуктовая цель

Lilith v2.0 должна быть омниканальной агентной sales-системой, которая:

- принимает обращения через Chatwoot;
- ведёт многотуровый диалог с памятью;
- использует retrieval как first-class capability;
- умеет вызывать bounded tools;
- знает, когда нужно эскалировать человеку;
- не теряет auditability при high-impact действиях.

## 3. Главный архитектурный сдвиг

### v1

`Chatwoot -> n8n -> Guardrails -> State -> Retrieval -> LLM -> Decision -> Reply / Handoff / Lead Write`

### v2

`Chatwoot -> Ingress Shell -> Dedup / Safety -> Agent Core -> Decision Gate -> Reply / Handoff / Lead Gateway -> Observability`

Ключевой сдвиг:

- `LLM` больше не трактуется как отдельный bounded text-generation step;
- `AI Agent` становится корневой сущностью AI-layer;
- retrieval и memory становятся частью agentic reasoning;
- внешний workflow сохраняет контроль над критичными внешними действиями.

## 4. Жёсткие инварианты v2.0

Следующие правила сохраняются:

1. Все каналы по-прежнему входят через Chatwoot.
2. Вся оркестрация по-прежнему находится в n8n.
3. `Code / Function / Function Item` по-прежнему запрещены.
4. Внешний ingress shell остаётся deterministic и audit-friendly.
5. Handoff остаётся first-class feature.
6. Lead write остаётся идемпотентным и внешне gated.
7. High-impact actions не должны уходить в скрытый model-owned path.
8. Evidence и acceptance остаются обязательными на каждую фазу.

## 5. Ownership Model

### Workflow-owned

- ingress from Chatwoot
- normalization
- dedup / anti-loop
- explicit approval / HITL gates
- reply publication
- handoff publication
- lead write gateway
- correlation / observability shell

### Agent-owned

- conversational reasoning
- memory-aware answer planning
- retrieval tool usage
- clarification strategy
- proposal drafting
- handoff recommendation
- summary drafting

### Human-owned

- approval of high-impact tools where required
- operator handoff resolution
- final human takeover after handoff

## 6. Agent Core

Agent Core в `v2.0` — это bounded AI runtime внутри n8n, который:

- использует `AI Agent` как корневую AI-сущность;
- работает с memory;
- работает с retrieval tools;
- возвращает структурированный `agent decision envelope`;
- не публикует side effects наружу напрямую без внешнего gate.

## 7. Memory Strategy

Память в `v2.0` является first-class capability.

Требования:

- память не должна существовать только как prompt-hack;
- memory provider должен быть production-viable;
- memory trace должен быть наблюдаем;
- memory не может стать “скрытой истиной”, неподконтрольной observability.

`Simple Memory` допустима только как dev/spike path, но не как production default, если режим исполнения или масштаб делает её ограничивающей.

## 8. Retrieval Strategy

Retrieval в `v2.0` трактуется как bounded tool capability, а grounding — как обязательное наблюдаемое свойство knowledge-driven ответов.

Правила:

- retrieval может быть вызван агентом как tool;
- agent не должен симулировать grounded knowledge без usable retrieval;
- retrieval quality должна нормализоваться в explicit signal;
- weak/empty retrieval должны переводиться в safe answer или handoff path.

Retrieval не считается валидным только потому, что "модель ответила умно".
Нужны versioned knowledge source, traceable tool invocation и quality-aware result semantics.

## 9. Decision Gate

Даже при agent-first architecture итоговое внешнее действие должно проходить через явный decision gate.

Decision gate обязан различать:

- `reply`
- `handoff`
- `lead_capture_continue`
- `lead_write_request`
- `safe_fallback`

Agent может рекомендовать действие, но финальное внешнее side effect решение остаётся у workflow-owned boundary.

Decision gate является одной из ключевых границ `v2`, потому что именно он не даёт agent core незаметно присвоить ownership над reply/handoff/write paths.

## 10. Sales Governance

Даже в `agent-first` модели sales truth не должна растворяться внутри внутреннего reasoning.

Внешний workflow/governance слой обязан сохранять:

- явную стадию диалога;
- ограничение числа бессмысленных уточнений;
- управляемый CTA;
- возможность объяснить progression по trace.

Agent может помогать sales progression, но не должен подменять собой governance truth.

## 11. Handoff in v2.0

Handoff остаётся explicit feature, а не неявным провалом агента.

Agent может:

- рекомендовать handoff;
- подготавливать summary draft;
- указывать basis for handoff.

Workflow обязан:

- оформить explicit handoff event;
- записать summary;
- уведомить пользователя;
- остановить bot-owned continuation.

## 12. Lead Capture and Lead Write in v2.0

В `v2` lead flow делится на два слоя:

- `Agent-Assisted Lead Capture`
- `Lead Write Gateway`

Agent не должен владеть финальной lead truth без внешней валидации.

Agent не должен напрямую владеть lead write.

Agent может:

- выявить готовность лида;
- предложить недостающие поля;
- сформировать draft payload.

Workflow обязан:

- валидировать payload;
- выполнить idempotent write;
- зафиксировать response trace;
- безопасно обработать duplicate / failed cases.

## 13. Contracts v2.0

Текущий контрактный слой недостаточен для agent-first runtime.

Минимальный новый набор draft contracts:

- `agent-input-envelope`
- `agent-decision-envelope`
- `agent-tool-trace`
- `memory-turn-record`
- `approval-outcome`
- `handoff-summary-v2`
- `lead-write-request`
- `lead-write-result`

Старые v1 contracts не удаляются автоматически, а требуют migration table.

Контрактный слой `v2` должен различать:

- bounded agent input;
- structured agent decision;
- tool trace;
- memory trace;
- approval outcome;
- handoff summary;
- lead write request/result.

## 14. Observability and Evals v2.0

Корреляционный trace должен проходить через:

`ingress -> dedup -> agent_start -> memory_read/write -> retrieval_tool -> tool_result -> decision_gate -> reply/handoff/lead_write -> completion`

Минимально логируются:

- inbound received
- dedup suppress
- agent started
- memory read/write
- tool invoked
- tool result quality
- approval requested / approved / denied
- decision emitted
- reply published
- handoff published
- lead write attempted / duplicate / failed / success

Observability `v2` должна покрывать не только happy path, но и fallback path, approval path и migration compatibility evidence.

## 15. Safety Rules

1. Agent не должен владеть прямыми destructive writes без gate.
2. Prompt injection считается частью threat model.
3. Tool risk должен быть классифицирован.
4. High-impact tools должны поддерживать HITL path, где это необходимо.
5. Safe fallback должен быть explicit.

## 16. Acceptance Philosophy

`v2.0` не считается принятой, пока не доказано:

- что agent-first реально улучшает product capability;
- что observability не деградировала;
- что handoff и lead write не потеряли прозрачности;
- что memory/retrieval/tool-use не разрушили управляемость системы;
- что migration compatibility с доказанным `v1 baseline` сохранена.

Принятие `v2` требует одновременно:

- product evidence;
- safety evidence;
- observability evidence;
- migration compatibility evidence.

## 17. Migration Rule

`v1 baseline` больше не является каноном, но сохраняется как архивный operational reference.

Правила миграции:

- архивный `v1` используется как baseline evidence;
- runtime migration должна соответствовать текущему канону `v2`;
- новые workflow и contracts не должны опираться на устаревшую deterministic модель как на целевую;
- при любом отклонении от `v2` требуется явная фиксация `SPEC_GAP` или новая ревизия канона.

## 18. Detailed v2 Phase Map

Подробная фазовая карта зафиксирована в [03-workflow-phases.md](F:\project\Lilith\docs\03-workflow-phases.md).

## 19. Decision Basis

Выбор `AI Agent` как корневой AI-сущности зафиксирован в [21-decision-card-ai-root-node.md](F:\project\Lilith\docs\21-decision-card-ai-root-node.md).

## 20. Governance Basis

Принцип выбора сущностей и нод, на котором основан `v2` rewrite, зафиксирован в:

- [19-node-selection-principle.md](F:\project\Lilith\docs\19-node-selection-principle.md)
- [20-node-decision-card-template.md](F:\project\Lilith\docs\20-node-decision-card-template.md)
- [00-doc-map.md](F:\project\Lilith\docs\00-doc-map.md)
