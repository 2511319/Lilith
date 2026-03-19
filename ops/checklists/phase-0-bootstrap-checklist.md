# Phase 0 Bootstrap Checklist

## Execution plan

1. Сверить канонические документы `master-spec.md`, `AGENTS.md`, `docs/10-12`, `tasks/codex-bootstrap.md`, `tasks/phase-backlog.md`.
2. Добрать отсутствующий bootstrap baseline: каталоги, prompts, workflows, samples, ops.
3. Зафиксировать решение по `.codex/` и project-specific subagents.
4. Подтвердить корректность JSON и структуры репозитория.

## Статус

- [x] Корневые spec-артефакты присутствуют.
- [x] Созданы `prompts/`, `workflows/`, `samples/`, `services/`, `tests/`, `ops/`.
- [x] Созданы prompt placeholders.
- [x] Созданы workflow placeholders `01..10`.
- [x] Добавлены sample payloads для chatwoot/leads/rag.
- [x] Добавлены `ops/env.example` и bootstrap runbook.
- [x] Прочитан `tasks/codex-initiating-prompt.md`.

## Решение по `.codex/` и subagents

- Repo-local `.codex/` не создавался.
- Основание: текущая глобальная конфигурация Codex уже предоставляет shell, filesystem, git, playwright, n8n MCP и real subagents.
- Project-specific subagents сверх глобальной конфигурации для Фазы 0 не требуются.
- Subagent использовался только как read-only explorer для docs verification; runtime-архитектура продукта не менялась.

## Validation notes

- Распарсено `27` JSON-файлов bootstrap working tree без ошибок.
- `samples/leads/lead_payload_valid.json` проходит проверку схемой `contracts/lead-payload.schema.json`.
- `samples/rag/retrieval_result_strong.json` и `samples/rag/retrieval_result_empty.json` проходят проверку схемой `contracts/retrieval-result.schema.json`.
- `samples/leads/lead_payload_partial.json` является намеренно частичным sample для будущей Фазы 8 и не обязан проходить схему полного `Lead Payload`.
- `workflows/01_inbound_echo.json` проходит representative n8n validation как placeholder workflow (`Manual Trigger -> Set`).
- `samples/chatwoot/*` считаются illustrative bootstrap samples, а не каноническим source contract; см. `samples/chatwoot/README.md`.
- Ограничение: полный import всех `10` workflow в n8n не проверялся в Фазе 0.

## SPEC_GAP

- `master-spec.md` в разделе repo skeleton использует имена contract-файлов в стиле `inbound_message.normalized.schema.json` / `dedup_record.schema.json`, тогда как `docs/11-contracts-overview.md`, `spec-pack-manifest.json` и фактические файлы репозитория используют hyphenated имена.
- В Фазе 0 сохранено фактическое текущее именование, чтобы не разорвать уже существующий spec-pack.
- Перед массовым переименованием нужна отдельная фиксация канонического варианта в master-spec.
