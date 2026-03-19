# Phase Backlog

## Фаза 0 — Bootstrap
### Done, когда:
- структура каталогов создана;
- spec-pack перенесён в репозиторий;
- placeholders и contracts на месте.

### Дополнительно проверить:
- initiating prompt добавлен и согласован с master-spec;
- subagents, если используются, не подменяют архитектурные решения и не превращают сборку в неконтролируемый parallel write-heavy процесс.

## Фаза 1 — Inbound Echo
### Сделать:
- принять Chatwoot webhook;
- нормализовать событие;
- вернуть простой ответ в Chatwoot.
### Evidence:
- sample inbound;
- trace публикации ответа.

## Фаза 2 — Dedup / Anti-loop
### Сделать:
- dedup key;
- TTL state store;
- suppress bot/operator/system messages.
### Evidence:
- duplicate webhook case;
- suppress case.

## Фаза 3 — LLM Without RAG
### Сделать:
- HTTP Request к модели;
- prompt-policy;
- retry/timeout/fallback.
### Evidence:
- RU-only reply case;
- timeout case.

## Фаза 4 — Handoff
### Сделать:
- explicit и fallback trigger;
- internal note;
- summary.
### Evidence:
- “позовите человека” case;
- low-confidence case.

## Фаза 5 — Snapshot Ingestion
### Сделать:
- repeatable snapshot pipeline;
- chunking;
- embeddings;
- Qdrant upsert.
### Evidence:
- snapshot version;
- ingest report.

## Фаза 6 — RAG Baseline
### Сделать:
- retrieval top-k;
- quality flag;
- grounded answer.
### Evidence:
- strong retrieval case;
- empty retrieval case.

## Фаза 7 — Sales State Machine
### Сделать:
- state transitions;
- clarification limit;
- CTA transition.
### Evidence:
- staged conversation traces.

## Фаза 8 — Lead Capture
### Сделать:
- slot filling;
- minimal validation;
- partial state persistence.
### Evidence:
- successful contact capture;
- contact capture failed -> handoff.

## Фаза 9 — Lead Write
### Сделать:
- dedup fingerprint;
- idempotent write;
- operator note with lead_id.
### Evidence:
- created case;
- duplicate case.

## Фаза 10 — Observability / Pilot
### Сделать:
- correlation logs;
- metrics;
- runbook;
- pilot acceptance matrix.
### Evidence:
- end-to-end trace;
- pilot dashboard or equivalent metrics export.
