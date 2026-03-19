# 11. Contracts Overview

## Канонический набор baseline-контрактов

- `inbound-message-normalized.schema.json`
- `dedup-record.schema.json`
- `conversation-state.schema.json`
- `knowledge-chunk.schema.json`
- `retrieval-result.schema.json`
- `llm-decision-envelope.schema.json`
- `lead-payload.schema.json`
- `lead-target-api-response.schema.json`
- `handoff-summary.schema.json`

## Принципы контрактов

1. Контракт — это не пример, а управляемое соглашение.
2. Изменение контракта требует обновления тестов и связанных workflow.
3. Не допускаются “плавающие” поля без причины.
4. `additionalProperties` по умолчанию должны быть закрыты там, где это не мешает эволюции схемы.
5. Все timestamp-поля — ISO-8601.

## Смысл контрактов

### Normalized inbound
Единая форма входного события после Chatwoot webhook normalization.

### Dedup record
След прохождения конкретного события через дедуп-слой.

### Conversation state
Краткоживущее состояние стадии, слотов и флагов handoff.

### Knowledge chunk / retrieval result
Базовые сущности knowledge layer.

### LLM decision envelope
Структурированный результат, на который опирается следующая маршрутизация.

### Lead payload / Lead Target response
Идемпотентный контур записи лида.

Уточнение нормализации:
- `source` считается каноническим полем `Lead Payload` и должен выводиться из channel/inbox/campaign metadata, если не введён пользователем напрямую;
- `status` относится к внутреннему processing/state слою или к ответу Target API, но не к исходному `Lead Payload`.

### Handoff summary
То, что получает оператор для входа в диалог без потери контекста.


Subagents и multi-agent execution не создают новых продуктовых data contracts. Они влияют на процесс реализации и review, но не меняют канонический набор runtime-контрактов бота.
