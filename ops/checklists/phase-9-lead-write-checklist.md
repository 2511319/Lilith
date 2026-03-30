# Phase 9 Lead Write Checklist

## Цель фазы

Реализовать идемпотентную запись лида в Lead Target API и корректную обработку `created / duplicate / failed`.

## Канонические документы и контракты

- `master-spec.md`
- `docs/03-workflow-phases.md`
- `docs/07-lead-policy.md`
- `docs/09-acceptance-criteria.md`
- `contracts/lead-payload.schema.json`
- `contracts/lead-target-api-response.schema.json`

## Implementation tasks

- [ ] Определить fingerprint или иной идемпотентный ключ записи.
- [ ] Реализовать write contour через Lead Target API.
- [ ] Обработать статусы `created / duplicate / failed`.
- [ ] Публиковать operator note с `lead_id` или эквивалентным traceable identifier.
- [ ] Согласовать retry policy так, чтобы не создавать дубли.

## Test and validation tasks

- [ ] Проверить successful created case.
- [ ] Проверить duplicate case без повторной записи.
- [ ] Проверить failed case и корректную реакцию системы.
- [ ] Провалидировать representative response contract.

## Evidence links

- [ ] Created case trace.
- [ ] Duplicate case trace.
- [ ] Failed case trace.

## Blockers / assumptions / `SPEC_GAP`

- Blockers: отсутствуют на старте.
- Assumptions: Lead Target API предоставляет достаточно стабильный ответ для различения created и duplicate.
- `SPEC_GAP`: зафиксировать, если в ответе API не хватает канонического поля для traceable result.

## Sign-off

- Статус: `not_started`
- Exit criteria: write идемпотентен, duplicate подавлен, `lead_id` traceable, evidence приложен.
- Остаточные риски: взаимодействие retry и внешней недоступности API требует аккуратной operational настройки.
