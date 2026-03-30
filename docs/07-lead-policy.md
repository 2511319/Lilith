# 07. Lead Policy

## Статус

Supporting-doc для `v2 lead capture + lead write gateway`.
В `v2` агент помогает conversationally собирать lead, но не получает ownership над финальной записью лида.

## Принцип

Lead flow в `v2` делится на два разных слоя:

- `Agent-Assisted Lead Capture`
- `Lead Write Gateway`

Это нужно, чтобы:

- не смешивать разговорную помощь и внешнюю запись;
- не отдавать агенту право считать лид "созданным" без gateway;
- сохранить idempotent и audit-friendly write path.

## Minimal Lead Draft

Практически необходимые поля:

- `conversation_id`
- `external_user_id`
- `channel`
- `contact`
- `contact_type`
- `interest`
- `description`
- `dedup_fingerprint`
- `created_at`

Желательные:

- `name`
- `last_updated_at`
- `source`

`source` должен выводиться из channel/inbox/campaign metadata, если пользователь его не вводит сам.

## Lead Capture Rules

1. Агент начинает capture только когда у пользователя уже есть контекст следующего шага.
2. Контакт запрашивается ограниченно и осмысленно.
3. Partial progress не теряется.
4. При неуспехе по контакту не допускается бесконечный цикл вопросов.
5. Если capture застрял, допустим handoff path.

## Lead Truth Boundary

Agent может:

- выявлять готовность к lead progression;
- собирать и нормализовать draft fields;
- предлагать недостающие поля;
- рекомендовать переход к write.

Agent не может:

- считать lead "записанным" без gateway;
- выполнять внешний write напрямую;
- подменять validation workflow-сигналами собственного reasoning.

## Lead Write Gateway

Lead write идёт не напрямую в CRM, а в explicit gateway layer.

Gateway обязан:

- валидировать draft;
- обеспечивать idempotency;
- нормализовать `created / duplicate / failed`;
- возвращать traceable result;
- не маскировать failure под success.

## Идемпотентность

Duplicate-safe поведение строится как минимум по сочетанию:

- контакта;
- окна времени;
- интереса / направления;
- канала;
- при необходимости conversation context.

Повторный write не должен плодить новый лид без оснований.

## После успешной записи

- пользователь получает понятный следующий шаг;
- оператор получает internal note / summary при необходимости;
- observability слой получает traceable external result.

## Признаки дефектного lead flow

- агент объявляет успех до gateway;
- partial progress теряется;
- duplicate ведёт к второму лиду;
- contact loop не останавливается;
- external write outcome нельзя объяснить по trace.
