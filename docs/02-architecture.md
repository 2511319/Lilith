# 02. Architecture

## Статус

Supporting-doc для действующего `v2` канона.
Этот документ больше не описывает `v1 deterministic pipeline` как актуальную целевую архитектуру.
Каноническая архитектурная формулировка зафиксирована в [master-spec.md](F:\project\Lilith\master-spec.md).

## Канонический контур v2

`Канал -> Chatwoot -> Ingress Shell -> Dedup / Safety -> Agent Core -> Decision Gate -> Reply / Handoff / Lead Gateway -> Observability`

## Архитектурная идея

Lilith `v2` строится не как линейный deterministic pipeline с отдельным `LLM-step`, а как agent-first система с внешним управляемым safety shell.

Ключевой принцип:

- внешний контур остаётся прозрачным и workflow-owned;
- внутренний AI-слой становится agentic;
- high-impact side effects не передаются в полную ownership модели.

## Роли компонентов

### Chatwoot

- единый каналовый фасад;
- хранение conversation thread;
- рабочее место оператора;
- публикация bot reply;
- публикация internal note и handoff-сигналов.

### n8n

- главный слой оркестрации;
- ingress normalization;
- dedup / anti-loop;
- запуск agent core;
- explicit decision gate;
- handoff publication;
- lead write gateway;
- correlation / observability shell.

### Agent Core

- conversational reasoning;
- memory-aware planning;
- retrieval tool usage;
- clarification strategy;
- recommendation of next action;
- подготовка structured agent decision.

### Memory Layer

- conversational context beyond one turn;
- observable memory read/write behavior;
- production-viable memory provider;
- не скрытая истина, а контролируемая capability.

### Retrieval Layer

- bounded tool capability для knowledge access;
- quality-aware retrieval result;
- grounded answer support;
- safe weak/empty behavior.

### Decision Gate

- принимает `agent-decision-envelope`;
- различает `reply / handoff / lead_capture_continue / lead_write_request / safe_fallback`;
- удерживает внешний контроль над side effects.

### Lead Gateway

- валидирует write intent;
- выполняет idempotent external write;
- возвращает traceable result;
- не отдаёт destructive ownership агенту.

## Ownership boundaries

### Workflow-owned

- ingress
- normalization
- dedup / anti-loop
- explicit approval / HITL gates
- reply publication
- handoff publication
- lead write gateway
- observability shell

### Agent-owned

- reasoning
- memory-aware answer planning
- retrieval tool usage
- proposal drafting
- recommendation of reply / handoff / lead progression

### Human-owned

- approval of high-impact actions where required
- operator handoff resolution
- final takeover after handoff

## Жёсткие инварианты

1. Все каналы входят через Chatwoot.
2. Вся оркестрация находится в `n8n`.
3. `Code / Function / Function Item` запрещены.
4. Внешний ingress shell остаётся deterministic и audit-friendly.
5. Agent не владеет destructive/high-impact side effects без explicit gate.
6. Handoff остаётся first-class feature.
7. Lead write остаётся explicit idempotent gateway.
8. Observability должна покрывать не только pipeline, но и agent/tool/memory behavior.

## Что архитектура v2 больше не считает центральной моделью

- `LLM` как изолированный bounded text-generation step;
- отдельный deterministic `RAG step` как единственную форму knowledge usage;
- state-only модель контекста без first-class memory;
- линейную фазовую эволюцию без agent/tool/memory boundary.

## Разрешённая декомпозиция

Система может быть разбита на несколько читаемых workflow-единиц, если:

- внешние границы остаются прозрачными;
- ownership boundaries не размываются;
- contracts и traces остаются явными;
- нет скрытого middleware, который тихо забирает оркестрацию себе.

## Связанные документы

- [master-spec.md](F:\project\Lilith\master-spec.md)
- [03-workflow-phases.md](F:\project\Lilith\docs\03-workflow-phases.md)
- [09-acceptance-criteria.md](F:\project\Lilith\docs\09-acceptance-criteria.md)
- [11-contracts-overview.md](F:\project\Lilith\docs\11-contracts-overview.md)
