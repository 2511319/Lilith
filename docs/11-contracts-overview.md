# 11. Contracts Overview

## Статус

Contract-layer для действующего `v2` канона с сохранённой migration table `v1 -> v2`.
Архивные `v1` contracts остаются baseline reference, но больше не считаются достаточными для целевой agent-first архитектуры.

## Принцип contract layer

1. Контракт — это не пример, а управляемое соглашение.
2. Raw upstream payload и runtime-contract системы не одно и то же.
3. Изменение контракта требует синхронного обновления workflow, tests, samples и evidence.
4. Переход на `v2` не должен молча ломать `v1 baseline`; нужен явный migration table.
5. Контракты должны поддерживать auditability и observability, а не только удобство текущего узкого workflow.

## Текущий baseline v1 contracts

- `inbound-message-normalized.schema.json`
- `dedup-record.schema.json`
- `conversation-state.schema.json`
- `knowledge-chunk.schema.json`
- `retrieval-result.schema.json`
- `llm-decision-envelope.schema.json`
- `lead-payload.schema.json`
- `lead-target-api-response.schema.json`
- `handoff-summary.schema.json`

## Почему v1 contract layer уже недостаточен

`v1` хорошо описывает deterministic pipeline:

- ingress;
- dedup;
- отдельный LLM-step;
- отдельный retrieval-step;
- отдельный handoff/write layer.

Для `v2 agent-first` этого уже мало, потому что появляются новые наблюдаемые сущности:

- bounded agent input;
- structured agent decision;
- tool invocation trace;
- memory read/write trace;
- approval / HITL outcome;
- gateway-level lead write result;
- новая handoff summary модель.

## Migration Model

### Категории миграции

- `keep`: контракт переносится почти без изменения.
- `adapt`: контракт сохраняет ядро смысла, но меняет shape или роль.
- `replace`: контракт заменяется новым.
- `split`: один контракт распадается на два или более.
- `archive`: контракт остаётся только для legacy evidence и backward reference.

## Migration Table v1 -> v2

| v1 contract | Статус | v2 target | Решение |
|---|---|---|---|
| `inbound-message-normalized` | `keep` | `inbound-message-normalized` | Остаётся ingress-shell контрактом |
| `dedup-record` | `keep` | `dedup-record` | Остаётся outer safety contract |
| `conversation-state` | `split` | `memory-turn-record` + future governance state contract | Разделить memory и governance truth |
| `knowledge-chunk` | `keep` | `knowledge-chunk` | Остаётся ingestion contract |
| `retrieval-result` | `adapt` | `retrieval-result` | Сохранить смысл, но расширить под tool trace и quality semantics |
| `llm-decision-envelope` | `replace` | `agent-decision-envelope` | Заменить bounded LLM result на agent decision model |
| `lead-payload` | `adapt` | `lead-write-request` | Сохранить payload-ядро внутри gateway request |
| `lead-target-api-response` | `adapt` | `lead-write-result` | Нормализовать как gateway result |
| `handoff-summary` | `adapt` | `handoff-summary-v2` | Переписать под agent recommendation + explicit gate |

## Draft v2 contract set

### Новые обязательные contracts

- `agent-input-envelope`
- `agent-decision-envelope`
- `agent-tool-trace`
- `memory-turn-record`
- `approval-outcome`
- `handoff-summary-v2`
- `lead-write-request`
- `lead-write-result`

### Сохраняемые contracts

- `inbound-message-normalized`
- `dedup-record`
- `knowledge-chunk`
- `retrieval-result` с адаптацией

## Семантика v2 contracts

### Agent Input Envelope

Нормализованный, безопасный, bounded вход для agent core.
Не должен быть сырым Chatwoot payload.

### Agent Decision Envelope

Структурированный результат agent core, на который опирается explicit decision gate.
Минимально должен различать:

- `reply`
- `handoff`
- `lead_capture_continue`
- `lead_write_request`
- `safe_fallback`

### Agent Tool Trace

Явная запись использования bounded tool capability:

- какой tool вызван;
- зачем вызван;
- с каким outcome;
- с каким quality signal.

### Memory Turn Record

Нормализованный след memory interaction в рамках одного диалога или хода:

- memory read;
- memory write;
- relevant turn linkage;
- traceability.

### Approval Outcome

Нормализованный результат explicit approval / HITL gate:

- requested;
- approved;
- denied;
- bypassed by policy, если это допустимо архитектурой.

### Handoff Summary v2

Summary для оператора, построенный под agent-first модель, но публикуемый workflow-owned boundary.

### Lead Write Request / Result

Контрактная пара внешнего write gateway:

- request описывает проверенный draft на запись;
- result описывает `created / duplicate / failed` в нормализованной форме.

## Правила эволюции контрактов

1. Нельзя молча расширять `v1` контракты так, чтобы они скрыто превращались в `v2`.
2. Нельзя вводить новые runtime contracts без ссылки на spec/delta/decision basis.
3. Если новый workflow опирается на `v2` contract, это должно быть видно в tests и samples.
4. Любой `replace` или `split` должен иметь migration note.
5. Legacy contracts можно архивировать только после того, как они перестанут быть нужны для baseline evidence.

## Связанные документы

- [15-chatwoot-real-contract.md](F:\project\Lilith\docs\15-chatwoot-real-contract.md)
- [master-spec.md](F:\project\Lilith\master-spec.md)
- [03-workflow-phases.md](F:\project\Lilith\docs\03-workflow-phases.md)
- [24-spec-delta-v1-v2.md](F:\project\Lilith\docs\24-spec-delta-v1-v2.md)
