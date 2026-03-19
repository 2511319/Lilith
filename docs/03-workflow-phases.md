# 03. Workflow Phases

## Принцип

Один workflow не должен поглощать всю логику проекта. Система декомпозируется на отдельные читаемые workflow-единицы.

## Фазовая карта

### WF-01 — Inbound Echo Baseline
Цель: доказать технический проход `Chatwoot -> n8n -> Chatwoot reply`.

### WF-02 — Dedup and Anti-loop
Цель: гарантировать `1 inbound -> 1 answer`, отсеять bot/operator/system messages, записать suppress reason.

### WF-03 — LLM Dialog Without RAG
Цель: получить стабильный RU-only sales-ответ без knowledge layer.

### WF-04 — Handoff
Цель: корректно эскалировать диалог оператору, записать summary и остановить попытку “дожать” кейс ботом.

### WF-05 — Site Snapshot Ingestion
Цель: получить воспроизводимый knowledge snapshot и загрузить его в Qdrant.

### WF-06 — RAG Answer Flow
Цель: выполнять retrieval, определять силу контекста, подмешивать grounded context и безопасно вести себя при weak/empty retrieval.

### WF-07 — Sales State Machine
Цель: управлять стадиями `intro / qualify / propose / cta / lead_capture / handoff / closed`.

### WF-08 — Lead Capture
Цель: собрать `contact`, `name`, `interest`, `description`, валидировать контакт и сохранить partial progress.

### WF-09 — Lead Write
Цель: сделать идемпотентную запись в Lead Target API и корректно обработать `created / duplicate / failed`.

### WF-10 — Observability and Pilot Ops
Цель: обеспечить логи, correlation trace, ключевые метрики и пилотную диагностику.

## Правило реализации

Codex обязан идти по фазам последовательно.  
Запрещено перепрыгивать через dedup, handoff или observability ради “быстрого MVP”.
