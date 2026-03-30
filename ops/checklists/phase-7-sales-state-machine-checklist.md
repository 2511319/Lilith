# Phase 7 Sales State Machine Checklist

## Цель фазы

Сделать коммерческий диалог предсказуемым через управляемые state transitions и ограничение бесконечных уточнений.

## Канонические документы и контракты

- `master-spec.md`
- `docs/03-workflow-phases.md`
- `docs/04-sales-policy.md`
- `docs/09-acceptance-criteria.md`
- `contracts/conversation-state.schema.json`

## Implementation tasks

- [ ] Ввести стадии `intro / qualify / propose / cta / lead_capture / handoff / closed`.
- [ ] Определить входы, выходы и допустимые переходы для каждой стадии.
- [ ] Реализовать clarification limit и правило выхода из циклов.
- [ ] Согласовать state machine с handoff и RAG layers.
- [ ] Зафиксировать хранение и обновление краткоживущего conversation state.

## Test and validation tasks

- [ ] Прогнать staged conversation trace через ключевые стадии.
- [ ] Проверить scenario с достижением clarification limit.
- [ ] Проверить корректный переход к CTA.
- [ ] Убедиться, что state machine не ломает handoff и lead capture readiness.

## Evidence links

- [ ] Staged conversation traces.
- [ ] Clarification limit reached case.
- [ ] Representative conversation state sample.

## Blockers / assumptions / `SPEC_GAP`

- Blockers: отсутствуют на старте.
- Assumptions: conversation state можно хранить в рамках выбранного state store без отдельного runtime-сервиса.
- `SPEC_GAP`: зафиксировать, если понадобится формальная таблица transition rules в master-spec.

## Sign-off

- Статус: `not_started`
- Exit criteria: state transitions предсказуемы, уточнения ограничены, CTA path доказан, evidence приложен.
- Остаточные риски: сложные разговорные ветки могут выявить дополнительные transition cases.
