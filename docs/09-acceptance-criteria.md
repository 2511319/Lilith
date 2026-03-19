# 09. Acceptance Criteria

## Интеграционный контур
- Chatwoot webhook доходит до n8n.
- n8n публикует ответ в Chatwoot.
- smoke-поток воспроизводим.

## Guardrails
- повторная доставка одного inbound не создаёт второй ответ;
- bot/operator/system messages не входят в ответный контур;
- suppress reason логируется.

## LLM without RAG
- пользовательский ответ формируется на русском языке;
- ответ не пустой без объяснимой причины;
- timeout и ошибки не приводят к немому провалу без trace.

## RAG
- при наличии данных retrieval возвращает usable context;
- LLM использует этот контекст;
- при weak/empty retrieval не начинается выдумывание.

## Sales flow
- бот движется по стадиям;
- число уточнений ограничено;
- есть естественный CTA.

## Handoff
- handoff возможен по прямому запросу пользователя;
- handoff возможен по fallback-условиям;
- оператор получает summary и видит причину передачи.

## Lead capture and write
- собирается валидный lead payload;
- partial progress сохраняется;
- valid payload записывается в Lead Target API;
- duplicate подавляется корректно;
- successful write создаёт traceable `lead_id`.

## Архитектурная дисциплина
- в workflow нет запрещённых нод;
- нет скрытой логики в expressions;
- структура репозитория соответствует spec-pack.
