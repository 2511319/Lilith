# Phase 8 Lead Capture Checklist

## Цель фазы

Собрать валидный lead payload, не теряя partial progress и не смешивая внутренние processing fields с каноническим write-контрактом.

## Канонические документы и контракты

- `master-spec.md`
- `docs/03-workflow-phases.md`
- `docs/07-lead-policy.md`
- `docs/09-acceptance-criteria.md`
- `contracts/lead-payload.schema.json`
- `contracts/conversation-state.schema.json`

## Implementation tasks

- [ ] Реализовать slot filling для `contact`, `name`, `interest`, `description`.
- [ ] Добавить минимальную валидацию контакта без избыточного усложнения UX.
- [ ] Сохранять partial progress в state layer.
- [ ] Подготовить финальный `lead-payload` без поля внутреннего `status`.
- [ ] Определить момент перехода из sales flow в lead capture complete или handoff.

## Test and validation tasks

- [ ] Проверить successful lead capture case.
- [ ] Проверить partial or invalid contact case.
- [ ] Проверить сохранение partial progress между сообщениями.
- [ ] Провалидировать representative valid lead payload схемой.

## Evidence links

- [ ] Successful lead capture trace.
- [ ] Partial capture or invalid contact trace.
- [ ] Representative valid payload sample.

## Blockers / assumptions / `SPEC_GAP`

- Blockers: отсутствуют на старте.
- Assumptions: baseline contact validation можно реализовать без внешних верификационных сервисов.
- `SPEC_GAP`: зафиксировать, если потребуется уточнение канонического поля `source` или правил contact normalization.

## Sign-off

- Статус: `not_started`
- Exit criteria: valid payload собирается, partial progress не теряется, invalid case обработан, evidence приложен.
- Остаточные риски: качество extraction зависит от устойчивости LLM и state machine.
