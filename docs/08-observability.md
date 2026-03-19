# 08. Observability

## Зачем нужен этот слой

Без наблюдаемости проект станет набором труднообъяснимых сбоев.  
Для пилота нужны не только ответы бота, но и понятный путь обработки каждого входного события.

## Обязательная трассировка

Каждое inbound-событие должно получать `correlation_id`, который проходит через:

`inbound -> dedup -> state -> retrieval -> llm -> decision -> reply/handoff/lead_write`

## Минимальные события логирования

- inbound received;
- suppress by dedup;
- suppress by sender type;
- LLM request started / finished / failed;
- retrieval started / finished / empty / weak;
- decision emitted;
- handoff triggered;
- lead write created / duplicate / failed.

## Минимальные метрики пилота

- inbound latency;
- LLM latency;
- retrieval latency;
- handoff rate;
- lead rate;
- empty retrieval rate;
- duplicate suppress rate;
- lead write success/failure rate.

## Требования к runbook

В ops/runbook позже должны попасть инструкции:

- как понять, почему бот не ответил;
- как диагностировать duplicate suppress;
- как понять, почему произошёл handoff;
- как проверить, какой knowledge snapshot использовался;
- как проверить, был ли лид создан или подавлен как duplicate.
