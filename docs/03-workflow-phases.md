# 03. Workflow Phases

## Статус

Supporting-doc для действующей `v2` phase map.
Этот документ больше не описывает старую линейную deterministic phase-модель как актуальную цель.
Фазовая карта синхронизирована с [master-spec.md](F:\project\Lilith\master-spec.md).

## Принцип

Фазы `v2` больше не строятся вокруг идеи "добавим ещё один слой в deterministic pipeline".
Они строятся вокруг controlled build-up agent-first runtime при сохранении внешнего safety shell.

Ключевое правило:

- сначала сохраняется и замораживается доказанный baseline;
- затем agentic возможности вводятся слоями;
- при этом ingress, dedup, handoff gate, lead gateway и observability не теряют прозрачности.

## Фазовая карта v2

### WF-00 — Baseline Freeze

Цель: зафиксировать `v1` runtime, traces и evidence как reference baseline.

### WF-01 — Ingress Safety Shell

Цель: сохранить Chatwoot ingress, normalization, dedup и anti-loop как внешний deterministic shell.

### WF-02 — Agent Core Baseline

Цель: поднять minimal `AI Agent` reasoning loop без retrieval, но с explicit decision gate.

### WF-03 — Memory Backbone

Цель: добавить production-viable conversational memory с traceability.

### WF-04 — Handoff Gate

Цель: реализовать explicit handoff path поверх agent recommendation.

### WF-05 — Retrieval Tools

Цель: подключить retrieval как bounded tool capability.

### WF-06 — Grounded Agent Answers

Цель: обеспечить knowledge-driven agent ответы с safe weak/empty behavior.

### WF-07 — Sales Governance Layer

Цель: сохранить явную sales-governance truth поверх agent core.

### WF-08 — Agent-Assisted Lead Capture

Цель: собирать lead conversationally, не передавая агенту final truth ownership.

### WF-09 — Lead Write Gateway

Цель: выполнить explicit idempotent external write через workflow-owned boundary.

### WF-10 — Observability, Evals, Pilot

Цель: обеспечить agent/tool/memory traces, eval loops и pilot-readiness.

## Логика фаз

### Что теперь считается foundation

- baseline freeze;
- ingress shell;
- dedup / anti-loop;
- decision gate;
- observability.

### Что теперь считается agentic build-up

- agent core;
- memory;
- retrieval tools;
- grounded answers;
- agent-assisted capture.

### Что всегда остаётся explicit workflow responsibility

- ingress acceptance;
- suppress logic;
- handoff publication;
- lead write;
- pilot observability shell.

## Правило миграции

Фазы `v1` не выбрасываются, а переосмысляются:

- `Phase 1` и `Phase 2` становятся частью `WF-01 Ingress Safety Shell`;
- старая `Phase 3` становится историческим bounded LLM baseline;
- дальнейшие `v2` фазы строятся уже вокруг agent core, а не вокруг isolated LLM-step.

## Правило завершённости фазы

Фаза считается завершённой только если одновременно есть:

- product evidence;
- observability evidence;
- safety evidence;
- migration compatibility evidence.

Нельзя закрывать фазу только по признаку, что агент отвечает "лучше" или "умнее".

## Чего больше нельзя делать

- трактовать `LLM without RAG` как конечную форму AI-layer;
- считать retrieval просто ещё одним линейным этапом после state;
- смешивать agent-owned reasoning и workflow-owned external actions;
- перепрыгивать через observability ради быстрого продвижения runtime.

## Связанные документы

- [master-spec.md](F:\project\Lilith\master-spec.md)
- [09-acceptance-criteria.md](F:\project\Lilith\docs\09-acceptance-criteria.md)
- [24-spec-delta-v1-v2.md](F:\project\Lilith\docs\24-spec-delta-v1-v2.md)
