# Phase 3 LLM Without RAG Checklist

## Цель фазы

Подключить LLM через штатные AI-ноды `n8n` и получить стабильный RU-only sales baseline без retrieval layer.

## Канонические документы и контракты

- `master-spec.md`
- `docs/02-architecture.md`
- `docs/03-workflow-phases.md`
- `docs/04-sales-policy.md`
- `docs/09-acceptance-criteria.md`
- `contracts/llm-decision-envelope.schema.json`
- `prompts/system.sales.ru.txt`
- `prompts/decision.sales.json-mode.txt`
- `prompts/no-answer.policy.txt`

## Implementation tasks

- [x] Реализовать `workflows/03_llm_dialog_no_rag.json` на `Execute Sub-workflow Trigger + Basic LLM Chain + OpenAI Chat Model + Structured Output Parser + Auto-fixing Output Parser`.
- [x] Перевести prompt placeholders в рабочий Phase 3 baseline без ухода в RAG.
- [x] Реализовать structured output в виде `llm-decision-envelope`.
- [x] Добавить retry/timeout/fallback policy через `OpenAI Chat Model` options и явную fallback-ветку.
- [x] Сохранить прозрачную трассировку запроса и ответа модели через execution data в `n8n`.

## Test and validation tasks

- [x] Подтвердить RU-only reply на representative user question.
- [x] Проверить непустой ответ в normal case.
- [x] Проверить error fallback без silent failure.
- [x] Провалидировать representative `llm-decision-envelope`.

## Evidence links

- [x] RU-only happy path trace: workflow `gViChIh0yTY6zclR`, execution `180854893`, endpoint `https://n8n.dbi.ru/webhook/dev/llm/no-rag`.
- [x] Error fallback trace: workflow `gViChIh0yTY6zclR`, execution `180854905`, input `llm_model = invalid-model-for-fallback-evidence`.
- [x] Integrated runtime trace: Chatwoot inbound `message_id = 234` -> WF-01 execution `180856882` -> WF-03 execution `180856883` -> Chatwoot reply `message_id = 235`.
- [x] Representative decision envelope samples:
  - `samples/llm/llm_decision_envelope_normal.json`
  - `samples/llm/llm_decision_envelope_fallback.json`

## Blockers / assumptions / `SPEC_GAP`

- Blockers: отсутствуют.
- Assumptions: credential `Corp LLM (ai.dbi.ru)` (`gTajZLEOzDTGKi2q`) остаётся доступным на dev-инстансе `n8n.dbi.ru`.
- `SPEC_GAP`: исходный checklist требовал `HTTP Request` к LLM endpoint, но platform-native path оказался лучше и доказан на живом инстансе. Для Phase 3 канонический путь теперь: `Basic LLM Chain + OpenAI Chat Model + Structured Output Parser`.

## Sign-off

- Статус: `done`
- Exit criteria:
  - RU-only reply стабилен на живом ingress runtime-path через WF-01 -> WF-03.
  - Error fallback прозрачен и не приводит к silent failure.
  - `llm-decision-envelope` зафиксирован sample-файлами и тестами.
  - Local tests: `6/6 pass` по `tests/smoke/phase-3-llm-without-rag.test.mjs` и `tests/integration/phase-3-llm-without-rag.test.mjs`.
- Остаточные риски:
  - качество sales baseline без RAG ограничено до Фазы 6;
  - fallback сейчас доказан через controlled model error, а не через отдельный integrated timeout кейс;
  - ответы зависят от доступности credential и OpenAI-compatible gateway `ai.dbi.ru`.
