# 12. Implementation Plan

## Фаза 0 — Bootstrap
- создать чистый репозиторий;
- добавить master-spec и AGENTS;
- разложить директории;
- создать placeholders;
- зафиксировать initiating prompt для Codex;
- проверить, нужны ли repo-local `.codex/` overrides и project-specific subagents сверх глобальной настройки.

## Фаза 1 — Echo
- доказать inbound/outbound связность;
- подготовить smoke evidence.

## Фаза 2 — Guardrails
- реализовать dedup и anti-loop;
- подготовить duplicate scenarios.

## Фаза 3 — LLM без RAG
- настроить HTTP-вызов модели;
- зафиксировать prompt-policy;
- добиться стабильного RU-only sales baseline.

## Фаза 4 — Handoff
- зафиксировать trigger logic;
- публиковать internal note и summary.

## Фаза 5 — Snapshot Ingestion
- собрать repeatable pipeline;
- загрузить Qdrant baseline.

## Фаза 6 — RAG
- выполнить retrieval;
- внедрить grounded answer и safe fallback.

## Фаза 7 — Sales State Machine
- сделать предсказуемые state transitions;
- ограничить бесконечные уточнения.

## Фаза 8 — Lead Capture
- собрать и валидировать контакты;
- сохранить partial progress.

## Фаза 9 — Lead Write
- реализовать идемпотентный write в Target API;
- создать duplicate-safe flow.

## Фаза 10 — Observability и Pilot
- включить traces, метрики, operational checks;
- подготовить пилотный contour.


## Правило использования subagents во время реализации
- subagents используются только как слой исполнения Codex и контроля качества сборки;
- делегировать в первую очередь read-heavy, evidence-heavy, docs/review задачи;
- parallel write-heavy исполнение по умолчанию не считать базовым режимом;
- финальная интеграция решений и ответственность за соответствие master-spec остаются за родительским агентом.
