# Phase 4 Handoff Checklist

## Цель фазы

Реализовать штатный handoff на оператора по прямому запросу пользователя и по fallback-условиям.

## Канонические документы и контракты

- `master-spec.md`
- `docs/02-architecture.md`
- `docs/03-workflow-phases.md`
- `docs/05-handoff-policy.md`
- `docs/09-acceptance-criteria.md`
- `contracts/handoff-summary.schema.json`
- `prompts/handoff.summary.txt`

## Implementation tasks

- [ ] Определить explicit handoff trigger на уровне user intent.
- [ ] Определить fallback handoff trigger для low-confidence или blocked flow.
- [ ] Реализовать публикацию internal note в Chatwoot.
- [ ] Реализовать generation и валидацию `handoff-summary`.
- [ ] Гарантировать остановку bot-flow после успешного handoff.

## Test and validation tasks

- [ ] Проверить сценарий "позовите человека".
- [ ] Проверить fallback handoff на low-confidence case.
- [ ] Проверить публикацию internal note и summary.
- [ ] Убедиться, что после handoff бот не продолжает sales pressure.

## Evidence links

- [ ] Direct handoff trace.
- [ ] Low-confidence handoff trace.
- [ ] Representative handoff summary sample.

## Blockers / assumptions / `SPEC_GAP`

- Blockers: отсутствуют на старте.
- Assumptions: Chatwoot поддерживает нужный тип internal note и conversation flagging без обходных путей.
- `SPEC_GAP`: зафиксировать, если handoff cause taxonomy окажется недостаточно определённой.

## Sign-off

- Статус: `not_started`
- Exit criteria: explicit и fallback handoff доказаны, operator summary публикуется, bot-flow корректно останавливается.
- Остаточные риски: quality handoff summary зависит от устойчивости предыдущих decision layers.
