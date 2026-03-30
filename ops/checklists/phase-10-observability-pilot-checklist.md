# Phase 10 Observability / Pilot Checklist

## Цель фазы

Довести систему до baseline-ready состояния через наблюдаемость, operational checks и pilot acceptance evidence.

## Канонические документы и контракты

- `master-spec.md`
- `docs/08-observability.md`
- `docs/09-acceptance-criteria.md`
- `docs/legacy-quarantine/14-delivery-plan.md`
- `ops/runbooks/bootstrap-phase-0.md`

## Implementation tasks

- [ ] Ввести correlation logging по критическому message flow.
- [ ] Добавить ключевые метрики по inbound, suppress, LLM, retrieval, handoff и lead write.
- [ ] Подготовить operational checks и baseline runbook эксплуатации.
- [ ] Собрать pilot acceptance matrix по всему критическому контуру.
- [ ] Подтвердить, что evidence предыдущих фаз полно и доступно.

## Test and validation tasks

- [ ] Прогнать end-to-end scenario `inbound -> reply -> lead or handoff`.
- [ ] Проверить наличие correlation trace на всём пути.
- [ ] Проверить доступность ключевых метрик или их эквивалентного экспорта.
- [ ] Сверить финальный baseline со всеми пунктами `docs/09-acceptance-criteria.md`.

## Evidence links

- [ ] End-to-end trace.
- [ ] Metrics snapshot or export.
- [ ] Pilot acceptance matrix.
- [ ] Final operational runbook.

## Blockers / assumptions / `SPEC_GAP`

- Blockers: отсутствуют на старте.
- Assumptions: все предыдущие фазы закрыты с достаточным evidence для сквозной верификации.
- `SPEC_GAP`: зафиксировать, если observability требует обязательного внешнего сервиса, не описанного в baseline.

## Sign-off

- Статус: `not_started`
- Exit criteria: acceptance criteria закрыты, сквозной trace доступен, metrics и runbook готовы, evidence приложен.
- Остаточные риски: pilot покажет реальные эксплуатационные пробелы, не видимые на тестовом контуре.
