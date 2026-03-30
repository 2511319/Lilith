# 26. Development Specification v2

## Статус

Detailed development specification для `v2` runtime.

Этот документ является practical supporting-doc для [master-spec.md](F:\project\Lilith\master-spec.md) и предназначен для сборки, миграции и проверки `v2`-линейки runtime без смешения с `v1 baseline`.

## Назначение

Этот документ нужен, чтобы до начала активной пересборки `WF-*`:

- свести в одном месте описание проекта и целевой продуктовой формы `v2`;
- зафиксировать подробную фазовую карту разработки;
- атомарно описать все ключевые модули runtime;
- определить ownership и границы между workflow-owned, agent-owned и human-owned слоями;
- зафиксировать основные взаимодействия между модулями;
- сделать дальнейшую реализацию repeatable и audit-friendly.

## Связанные документы

- [master-spec.md](F:\project\Lilith\master-spec.md)
- [01-product-scope.md](F:\project\Lilith\docs\legacy-quarantine\01-product-scope.md)
- [02-architecture.md](F:\project\Lilith\docs\02-architecture.md)
- [03-workflow-phases.md](F:\project\Lilith\docs\03-workflow-phases.md)
- [09-acceptance-criteria.md](F:\project\Lilith\docs\09-acceptance-criteria.md)
- [11-contracts-overview.md](F:\project\Lilith\docs\11-contracts-overview.md)
- [15-chatwoot-real-contract.md](F:\project\Lilith\docs\15-chatwoot-real-contract.md)
- [25-v2-runtime-migration-plan.md](F:\project\Lilith\docs\25-v2-runtime-migration-plan.md)

## 1. Описание проекта

Lilith `v2` — это agent-first sales assistant system, который:

- принимает обращения через Chatwoot;
- ведёт многошаговый коммерческий диалог;
- сохраняет контекст разговора;
- использует retrieval как bounded capability;
- умеет рекомендовать handoff;
- помогает собирать lead, но не получает ownership над внешней записью лида;
- работает через прозрачный workflow shell, а не как скрытый автономный агент.

### Бизнес-цель

Цель продукта — заменить или усилить первую линию sales-диалога:

- без выдумывания фактов;
- без потери управляемости;
- без передачи критичных внешних действий в непрозрачный model-owned path.

### Что входит в `v2 baseline`

- Chatwoot как фасад канала;
- n8n как orchestration runtime;
- `AI Agent` как корневой AI-модуль;
- memory backbone;
- retrieval tools;
- explicit decision gate;
- handoff gate;
- lead gateway;
- observability и eval loop.

### Что не входит в `v2 baseline`

- полноценный multi-agent swarm;
- скрытый middleware, перетягивающий оркестрацию из `n8n`;
- произвольные side effects, инициируемые агентом без workflow gate;
- размытие канала, governance и write-слоя в едином неаудируемом AI-контуре.

## 2. Development Principles

### 2.1 Canon rule

Канонический источник истины — [master-spec.md](F:\project\Lilith\master-spec.md).

Этот development spec:

- не заменяет master-spec;
- не расширяет архитектуру самовольно;
- конкретизирует реализацию и сборку runtime.

### 2.2 Additive migration rule

`v1` не ломается и не переписывается поверх себя.

`v2` строится как отдельная additive-линейка:

- отдельные workflow files;
- отдельные checklist;
- отдельные endpoints;
- отдельные evidence packs.

### 2.3 Transparency rule

Если есть выбор между:

- более “умной” скрытой логикой;
- и более прозрачной явной оркестрацией,

приоритет у прозрачной оркестрации.

### 2.4 Boundary rule

Workflow-owned и agent-owned responsibilities не должны смешиваться.

### 2.5 Evidence rule

Ни один модуль или фаза не считаются готовыми без:

- product evidence;
- safety evidence;
- observability evidence;
- migration compatibility evidence.

## 3. Целевая схема runtime

Канонический `v2` контур:

`Channel -> Chatwoot -> Ingress Safety Shell -> Agent Core -> Decision Gate -> Reply / Handoff / Lead Gateway -> Observability`

### 3.1 Внешний shell

Внешний shell остаётся deterministic и workflow-owned.

Он отвечает за:

- ingress;
- normalization;
- suppress logic;
- dedup;
- correlation;
- explicit publication of side effects.

### 3.2 Внутренний AI core

AI core становится agentic и отвечает за:

- reasoning;
- context-aware response planning;
- memory usage;
- retrieval tool usage;
- structured recommendation of next action.

### 3.3 Критический принцип

Agent может рекомендовать действие.

Workflow принимает решение о внешнем side effect и публикует его.

## 4. Atomic Module Inventory

Ниже перечислены все основные модули `v2` с атомарным описанием роли.

### M-01. Channel Facade

Роль:

- внешний пользовательский входной канал.

В baseline:

- Chatwoot website/widget и связанные conversation threads.

Ownership:

- external platform.

### M-02. Ingress Adapter

Роль:

- принять webhook от Chatwoot и превратить raw upstream payload в workflow-owned вход.

Вход:

- account-level webhook payload.

Выход:

- сырой item для нормализации.

Ownership:

- workflow-owned.

### M-03. Normalization Layer

Роль:

- выделить из raw payload нормализованный runtime input.

Вход:

- raw Chatwoot payload.

Выход:

- `inbound-message-normalized`.

Ownership:

- workflow-owned.

### M-04. Dedup and Anti-loop Guard

Роль:

- отсечь повторные доставки и сообщения, на которые бот не должен отвечать.

Вход:

- normalized inbound.

Выход:

- либо suppress trace;
- либо безопасный ingress continuation.

Ownership:

- workflow-owned.

### M-05. Correlation and Trace Shell

Роль:

- назначить и сохранить correlation semantics для дальнейших шагов.

Вход:

- ingress item после suppress checks.

Выход:

- trace-ready item.

Ownership:

- workflow-owned.

### M-06. Agent Input Assembler

Роль:

- собрать bounded вход для Agent Core.

Вход:

- normalized inbound;
- governance hints;
- memory context;
- retrieval affordances;
- optional policy hints.

Выход:

- `agent-input-envelope`.

Ownership:

- workflow-owned.

### M-07. Agent Core

Роль:

- выполнить reasoning loop и сформировать рекомендацию следующего действия.

Вход:

- `agent-input-envelope`.

Выход:

- `agent-decision-envelope`.

Ownership:

- agent-owned.

### M-08. Memory Backbone

Роль:

- обеспечить чтение и запись краткосрочной и рабочей conversational memory.

Вход:

- conversation context;
- selected turn artifacts.

Выход:

- memory context;
- `memory-turn-record`.

Ownership:

- split: orchestration workflow owns integration, agent owns usage logic.

### M-09. Retrieval Tool Adapter

Роль:

- дать агенту bounded capability доступа к knowledge layer.

Вход:

- retrieval query/intention.

Выход:

- `retrieval-result`;
- `agent-tool-trace`.

Ownership:

- workflow-owned execution boundary, agent-owned invocation intent.

### M-10. Decision Gate

Роль:

- превратить `agent-decision-envelope` в explicit external branch.

Поддерживаемые ветки:

- `reply`
- `handoff`
- `lead_capture_continue`
- `lead_write_request`
- `safe_fallback`

Ownership:

- workflow-owned.

### M-11. Reply Publisher

Роль:

- публиковать ответ в Chatwoot как безопасный bot action.

Вход:

- validated reply branch.

Выход:

- bot message публикация;
- reply trace.

Ownership:

- workflow-owned.

### M-12. Handoff Gateway

Роль:

- перевести диалог в operator-assisted режим.

Вход:

- handoff branch;
- summary draft;
- policy signals.

Выход:

- handoff event;
- `handoff-summary-v2`;
- operator-facing artifacts.

Ownership:

- workflow-owned, с agent-assisted summary drafting.

### M-13. Lead Capture Coordinator

Роль:

- управлять conversational progression к сбору lead.

Вход:

- lead-related decision and state.

Выход:

- updated conversation progression;
- draft lead payload fragments.

Ownership:

- shared: agent suggests, workflow governs.

### M-14. Lead Write Gateway

Роль:

- выполнить final, idempotent external write.

Вход:

- validated `lead-write-request`.

Выход:

- `lead-write-result`.

Ownership:

- workflow-owned.

### M-15. Observability and Evals Layer

Роль:

- собирать traces, execution evidence и evaluation signals.

Вход:

- correlation events from all phases.

Выход:

- audit trail;
- evidence pack;
- eval-ready artifacts.

Ownership:

- workflow-owned shell with cross-cutting reach.

## 5. Interaction Model

### 5.1 Основная последовательность

1. Пользователь пишет в канал.
2. Chatwoot создаёт conversation event.
3. Ingress Adapter принимает webhook.
4. Normalization Layer выпускает `inbound-message-normalized`.
5. Dedup and Anti-loop Guard либо suppresses, либо пропускает дальше.
6. Correlation and Trace Shell назначает trace context.
7. Agent Input Assembler собирает bounded input.
8. Agent Core выполняет reasoning.
9. Memory Backbone и Retrieval Tool Adapter используются агентом в пределах разрешённой capability-модели.
10. Agent Core возвращает `agent-decision-envelope`.
11. Decision Gate выбирает внешнюю ветку.
12. Workflow публикует reply, handoff или lead write outcome.
13. Observability and Evals Layer фиксирует весь проход.

### 5.2 Interaction table

| From | To | Передаваемая сущность | Смысл |
|---|---|---|---|
| Channel Facade | Ingress Adapter | raw webhook payload | входной каналовый event |
| Ingress Adapter | Normalization Layer | raw inbound item | подготовка к runtime |
| Normalization Layer | Dedup and Anti-loop Guard | `inbound-message-normalized` | безопасный ingress input |
| Dedup and Anti-loop Guard | Correlation and Trace Shell | accepted inbound | продолжение сценария |
| Correlation and Trace Shell | Agent Input Assembler | trace-ready inbound | сбор bounded agent input |
| Agent Input Assembler | Agent Core | `agent-input-envelope` | вход для reasoning |
| Agent Core | Memory Backbone | memory read/write intents | работа с контекстом |
| Agent Core | Retrieval Tool Adapter | retrieval tool intent | grounded knowledge path |
| Agent Core | Decision Gate | `agent-decision-envelope` | выбор внешней ветки |
| Decision Gate | Reply Publisher | reply branch | публикация bot message |
| Decision Gate | Handoff Gateway | handoff branch | переход к оператору |
| Decision Gate | Lead Capture Coordinator | lead progression branch | сбор lead-данных |
| Lead Capture Coordinator | Lead Write Gateway | `lead-write-request` | внешняя запись лида |
| All major modules | Observability and Evals Layer | traces/events/results | наблюдаемость и evidence |

## 6. Ownership and Responsibility Matrix

| Область | Owner | Почему |
|---|---|---|
| Ingress acceptance | Workflow | нельзя отдавать модели входной контур |
| Dedup / anti-loop | Workflow | safety shell должен быть deterministic |
| Memory usage policy | Shared | агент пользуется памятью, но platform владеет интеграцией и trace |
| Retrieval invocation | Shared | агент инициирует, workflow ограничивает capability |
| Reply text drafting | Agent | это reasoning concern |
| Reply publication | Workflow | внешний side effect |
| Handoff recommendation | Agent | reasoning concern |
| Handoff publication | Workflow | explicit gate |
| Lead readiness judgment | Agent-assisted | conversational intelligence |
| Final lead write | Workflow | idempotent external write |
| Observability | Workflow | единый audit shell |

## 7. Фазовая карта разработки

### WF-00 — Baseline Freeze

Результат:

- frozen inventory `v1`;
- reference traces;
- rollout boundaries for `v2`.

### WF-01 — Ingress Safety Shell

Результат:

- новый `v2` ingress runtime;
- normalization;
- dedup / anti-loop;
- suppress traces;
- handoff в agent core, но без самого агента.

### WF-02 — Agent Core Baseline

Результат:

- minimal `AI Agent`;
- structured `agent-decision-envelope`;
- explicit decision gate;
- safe fallback.

### WF-03 — Memory Backbone

Результат:

- production-viable memory capability;
- memory traces;
- controlled context carryover.

### WF-04 — Handoff Gate

Результат:

- explicit handoff branch;
- operator summary;
- bot stop condition after handoff.

### WF-05 — Retrieval Tools

Результат:

- first bounded retrieval tool;
- tool trace;
- retrieval quality semantics.

### WF-06 — Grounded Agent Answers

Результат:

- grounded answer path;
- safe weak/empty retrieval behavior.

### WF-07 — Sales Governance Layer

Результат:

- explicit conversational governance over agent behavior.

### WF-08 — Agent-Assisted Lead Capture

Результат:

- conversational сбор обязательных lead fields;
- draft lead payload.

### WF-09 — Lead Write Gateway

Результат:

- explicit validated write path;
- idempotent external write;
- duplicate/failure semantics.

### WF-10 — Observability, Evals, Pilot

Результат:

- complete traces;
- eval loop;
- pilot readiness evidence.

## 8. Фазовая зависимость

| Фаза | Зависит от |
|---|---|
| WF-00 | нет |
| WF-01 | WF-00 |
| WF-02 | WF-01 |
| WF-03 | WF-02 |
| WF-04 | WF-02 |
| WF-05 | WF-02 |
| WF-06 | WF-03, WF-05 |
| WF-07 | WF-02, WF-06 |
| WF-08 | WF-07 |
| WF-09 | WF-08 |
| WF-10 | WF-01…WF-09 |

## 9. Module-to-Phase Mapping

| Модуль | Фаза ввода |
|---|---|
| M-01 Channel Facade | baseline external |
| M-02 Ingress Adapter | WF-01 |
| M-03 Normalization Layer | WF-01 |
| M-04 Dedup and Anti-loop Guard | WF-01 |
| M-05 Correlation and Trace Shell | WF-01 |
| M-06 Agent Input Assembler | WF-02 |
| M-07 Agent Core | WF-02 |
| M-08 Memory Backbone | WF-03 |
| M-09 Retrieval Tool Adapter | WF-05 |
| M-10 Decision Gate | WF-02 |
| M-11 Reply Publisher | WF-01/WF-02 integration |
| M-12 Handoff Gateway | WF-04 |
| M-13 Lead Capture Coordinator | WF-08 |
| M-14 Lead Write Gateway | WF-09 |
| M-15 Observability and Evals Layer | cross-cutting, полнота в WF-10 |

## 10. Runtime Artifact Policy

### Локальные файлы

`v1` workflow и checklist не трогаются.

Для `v2` создаются новые артефакты:

- `workflows/v2_00_*.json`
- `workflows/v2_01_*.json`
- ...
- `ops/checklists/v2-wf-00-*.md`
- `ops/checklists/v2-wf-01-*.md`
- ...

### Remote n8n

`v1` workflow на удалённом инстансе сохраняются как есть.

`v2` workflow создаются как отдельные сущности с маркировкой `V2`.

### Endpoint policy

`v2` использует отдельные endpoints:

- `/webhook/dev/v2/...`
- `/webhook-test/dev/v2/...`

## 11. Contract Strategy

### Reuse without breakage

Можно reuse:

- `inbound-message-normalized`
- `dedup-record`
- `knowledge-chunk`
- `retrieval-result` с `v2`-адаптацией

### New v2 contracts

Нужно ввести отдельно:

- `agent-input-envelope`
- `agent-decision-envelope`
- `agent-tool-trace`
- `memory-turn-record`
- `approval-outcome`
- `handoff-summary-v2`
- `lead-write-request`
- `lead-write-result`

### Contract rule

Нельзя молча расширять `v1`-контракты так, чтобы они незаметно становились `v2`.

## 12. Acceptance Model

Каждая фаза считается завершённой только если одновременно есть:

- product evidence;
- safety evidence;
- observability evidence;
- migration compatibility evidence.

Дополнительно:

- agent quality без traceability не считается достаточной;
- “ответ стал лучше” не заменяет acceptance;
- любой новый side effect path требует explicit gate и rollback semantics.

## 13. Definition of Ready for Runtime Work

Активная реализация `WF-*` может считаться корректно подготовленной, если:

1. Существует frozen `v1` inventory.
2. `v2` naming/versioning policy уже зафиксирована.
3. Понятно, какие новые файлы создаются, а какие старые остаются frozen.
4. Определён atomic module inventory.
5. Определён interaction model.
6. Определены ownership boundaries.
7. Зафиксирован contract strategy.
8. Зафиксирована фазовая зависимость.

## 14. Definition of Bad Implementation

Реализация `v2` считается дефектной, если выполняется хотя бы одно условие:

- `v2` перетирает существующий `v1` workflow вместо additive deployment;
- новый runtime смешивает workflow-owned и agent-owned responsibilities;
- agent напрямую получает ownership над reply publication, handoff publication или lead write;
- память или retrieval добавлены без traceability;
- acceptance опирается только на subjective quality ответа;
- evidence `v1` и `v2` перемешаны так, что нельзя понять, какая версия что доказала.

## 15. Практический порядок следующей реализации

1. `WF-00 Baseline Freeze`
2. `WF-01 Ingress Safety Shell`
3. `WF-02 Agent Core Baseline`
4. только после этого двигаться дальше по `WF-03+`

Это минимально правильный старт, потому что без него:

- память негде будет безопасно подключать;
- агент не получит корректный bounded input;
- дальнейшие фазы начнут строиться на неустойчивом основании.
