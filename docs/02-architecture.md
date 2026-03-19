# 02. Architecture

## Канонический контур

`Канал -> Chatwoot -> Webhook -> n8n -> Guardrails -> State -> Retrieval -> LLM -> Decision -> Reply / Handoff / Lead Write`

## Роли компонентов

### Chatwoot
- единая точка входа по каналам;
- conversation thread;
- рабочее место оператора;
- публикация bot reply и internal note.

### n8n
- главный слой оркестрации;
- guardrails, маршрутизация, state transitions;
- HTTP-вызовы LLM, Qdrant и Lead Target API;
- запись трассировки и метрик.

### LLM endpoint
- генерация ответа;
- выдача decision envelope;
- соблюдение RU-only, sales-role и no-hallucination policy.

### Qdrant
- knowledge storage;
- retrieval top-k;
- grounded context для ответа.

### Lead Target API
- первый write-контур;
- идемпотентный приём lead payload;
- адаптационный буфер перед CRM.

## Архитектурные инварианты

1. Все каналы входят через Chatwoot.
2. Вся оркестрация находится в n8n.
3. `Code` / `Function`-ноды запрещены.
4. Псевдо-no-code обходы запрещены.
5. Grounded-ответ обязателен там, где речь идёт о продуктах и услугах.
6. Handoff — штатная функция, а не аварийная.
7. Lead write должен быть идемпотентным.
8. Подключение нового канала не переписывает ядро sales/RAG/lead logic.

## Предпочтительная граница вспомогательных сервисов

Разрешённые отдельные сервисы:

- ingestion pipeline;
- явно специфицированный retrieval API при невозможности прозрачной реализации внутри n8n;
- адаптеры Lead Target API и CRM.

Неразрешённый путь:

- скрытый middleware, который забирает на себя основную маршрутизацию и разрушает прозрачность workflow.
