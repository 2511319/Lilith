# Phase 6 RAG Baseline Checklist

## Цель фазы

Добавить retrieval и grounded answer layer с безопасным поведением при weak или empty context.

## Канонические документы и контракты

- `master-spec.md`
- `docs/02-architecture.md`
- `docs/03-workflow-phases.md`
- `docs/06-rag-policy.md`
- `docs/09-acceptance-criteria.md`
- `contracts/retrieval-result.schema.json`

## Implementation tasks

- [ ] Реализовать retrieval top-k из Qdrant.
- [ ] Ввести quality flag для retrieval strength.
- [ ] Подмешать grounded context в LLM flow без нарушения RU-only policy.
- [ ] Реализовать safe fallback для weak or empty retrieval.
- [ ] Зафиксировать трассировку retrieval decision.

## Test and validation tasks

- [ ] Прогнать strong retrieval case.
- [ ] Прогнать empty retrieval case.
- [ ] Подтвердить отсутствие галлюцинаций при слабом контексте.
- [ ] Проверить соответствие representative retrieval result contract.

## Evidence links

- [ ] Strong retrieval trace.
- [ ] Empty retrieval trace.
- [ ] Representative retrieval result sample.

## Blockers / assumptions / `SPEC_GAP`

- Blockers: отсутствуют на старте.
- Assumptions: ingest pipeline Фазы 5 даёт достаточно качественные chunks для baseline retrieval.
- `SPEC_GAP`: зафиксировать, если для quality flag потребуются новые contract fields.

## Sign-off

- Статус: `not_started`
- Exit criteria: retrieval работает, grounded answer доказан, safe fallback подтверждён, evidence приложен.
- Остаточные риски: retrieval quality и ranking могут потребовать итерации без изменения базового контура.
