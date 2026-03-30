# 08. Observability

## Статус

Supporting-doc для `v2 observability shell`.
Этот документ больше не описывает только pipeline-метрики `v1`.
В `v2` наблюдаемость должна покрывать внешний shell и внутренний agent/tool/memory слой.

## Зачем нужен этот слой

Без observability agent-first система быстро превратится в набор труднообъяснимых решений.
Для `v2` недостаточно знать только то, что "бот ответил". Нужно понимать:

- что пришло;
- что было подавлено;
- что решил агент;
- читал ли он память;
- вызывал ли retrieval/tool;
- почему был выбран reply, handoff или lead progression;
- чем закончился внешний side effect.

## Обязательный trace path

Каждое inbound-событие должно получать `correlation_id`, проходящий как минимум через:

`ingress -> dedup -> agent_start -> memory_read/write -> retrieval_tool -> tool_result -> decision_gate -> reply/handoff/lead_write -> completion`

## Минимальные log events

- inbound received;
- dedup suppress;
- sender suppress;
- agent started;
- agent decision emitted;
- safe fallback emitted;
- memory read;
- memory write;
- retrieval tool invoked;
- retrieval result quality;
- approval requested / approved / denied, если применимо;
- handoff triggered;
- lead write created / duplicate / failed;
- reply published.

## Минимальные pilot metrics

- inbound latency;
- agent latency;
- retrieval latency;
- memory operation latency, если релевантно;
- handoff rate;
- fallback rate;
- empty/weak retrieval rate;
- duplicate suppress rate;
- lead write success/failure/duplicate rate.

## Observability Rules

1. Agent behavior без trace не считается приемлемым.
2. Tool use без trace не считается допустимым.
3. Memory without observability не считается production-ready memory.
4. High-impact path должен быть объясним по trace.
5. Fallback path должен быть видим не хуже happy path.

## Runbook Requirements

Операционный runbook должен позволять ответить на вопросы:

- почему бот не ответил;
- почему событие было подавлено;
- почему агент рекомендовал handoff;
- был ли вызван retrieval tool и с каким quality signal;
- использовалась ли память;
- был ли запрошен approval;
- был ли лид реально создан, подавлен как duplicate или завершился ошибкой.

## Признаки дефектной observability

- есть пользовательский эффект, но нет объяснимого trace;
- retrieval/tool/memory path невидим;
- handoff нельзя объяснить по событийному следу;
- lead write outcome нельзя связать с конкретным `correlation_id`;
- fallback прячется как будто это normal-case.
