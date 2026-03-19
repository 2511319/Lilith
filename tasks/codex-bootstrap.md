# Codex Bootstrap Task

## Цель

Запустить новый чистый репозиторий и подготовить его так, чтобы реализация могла идти по фазам 0–10 без архитектурного дрейфа.

## Обязательный порядок действий

1. Создать пустой репозиторий.
2. Положить в корень:
   - `master-spec.md`
   - `AGENTS.md`
   - `README.md`
3. Создать каталоги:
   - `docs/`
   - `contracts/`
   - `prompts/`
   - `workflows/`
   - `samples/`
   - `services/`
   - `tests/`
   - `ops/`
   - опционально `.codex/` и `.codex/agents/`, если проекту нужны repo-local Codex overrides или project-specific subagents
4. Скопировать JSON Schema из `contracts/`.
5. Создать placeholders для:
   - `prompts/system.sales.ru.txt`
   - `prompts/decision.sales.json-mode.txt`
   - `prompts/handoff.summary.txt`
   - `prompts/lead.capture.txt`
   - `prompts/no-answer.policy.txt`
6. Создать workflow placeholders:
   - `01_inbound_echo`
   - `02_dedup_guardrails`
   - `03_llm_dialog_no_rag`
   - `04_handoff`
   - `05_site_snapshot_ingestion`
   - `06_rag_answer`
   - `07_sales_state_machine`
   - `08_lead_capture`
   - `09_lead_write`
   - `10_observability`
7. Добавить sample payloads для smoke и acceptance-сценариев.
8. Подготовить `env.example` и базовый runbook.
9. Прочитать `tasks/codex-initiating-prompt.md` и использовать его как стартовый prompt до начала рабочих фаз.
10. Проверить активные instruction sources и понять, нужны ли project-specific subagents поверх глобальной конфигурации.

## Что нельзя делать

- нельзя начинать писать workflow до появления contracts и placeholders;
- нельзя сразу прыгать в RAG, минуя echo и dedup;
- нельзя добавлять code-node “временно”;
- нельзя считать subagents частью runtime-архитектуры продукта;
- нельзя по умолчанию распараллеливать write-heavy изменения без явного контроля родительского агента.

## Результат фазы Bootstrap

Репозиторий структурирован, правила зафиксированы, initiating prompt готов, а execution-layer Codex понятен и не смешан с продуктовой архитектурой.
