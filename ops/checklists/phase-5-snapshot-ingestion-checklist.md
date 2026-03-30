# Phase 5 Snapshot Ingestion Checklist

## Цель фазы

Построить воспроизводимый pipeline получения knowledge snapshot и загрузки его в Qdrant.

## Канонические документы и контракты

- `master-spec.md`
- `docs/02-architecture.md`
- `docs/03-workflow-phases.md`
- `docs/06-rag-policy.md`
- `contracts/knowledge-chunk.schema.json`
- `services/ingestion/README.md`

## Implementation tasks

- [ ] Определить источник snapshot и repeatable ingestion contour.
- [ ] Реализовать chunking strategy без скрытого смещения логики из n8n orchestration.
- [ ] Реализовать embeddings step и Qdrant upsert.
- [ ] Ввести snapshot versioning и ingest report.
- [ ] Зафиксировать границу между сервисом ingestion и продуктовым workflow.

## Test and validation tasks

- [ ] Подтвердить успешную загрузку representative snapshot в Qdrant.
- [ ] Проверить соответствие `knowledge-chunk` contract.
- [ ] Проверить repeatability: одинаковый input не ломает ingest contour.
- [ ] Проверить наличие ingest report и snapshot version.

## Evidence links

- [ ] Ingest report.
- [ ] Snapshot version example.
- [ ] Representative Qdrant verification trace.

## Blockers / assumptions / `SPEC_GAP`

- Blockers: отсутствуют на старте.
- Assumptions: внешний источник сайта и embeddings endpoint доступны в допустимом проектном контуре.
- `SPEC_GAP`: зафиксировать, если понадобится отдельный retrieval API сверх текущей спецификации.

## Sign-off

- Статус: `not_started`
- Exit criteria: snapshot pipeline воспроизводим, knowledge chunks валидны, Qdrant upsert доказан, evidence приложен.
- Остаточные риски: качество chunking и freshness snapshot потребуют отдельной операционной проверки.
