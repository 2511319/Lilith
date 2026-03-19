# 13. Bootstrap Acceptance Matrix

## Назначение

Матрица фиксирует, что Фаза 0 закрыта как bootstrap baseline, а не формально.
Она не заменяет `master-spec.md`, а показывает соответствие созданных артефактов каноническим требованиям.

## Матрица

| Область | Требование | Статус | Evidence |
| --- | --- | --- | --- |
| Корень репозитория | `master-spec.md`, `AGENTS.md`, `README.md` присутствуют | done | файлы в корне репозитория |
| Структура каталогов | созданы `prompts/`, `workflows/`, `samples/`, `services/`, `tests/`, `ops/` | done | дерево репозитория после bootstrap |
| Контракты | baseline-схемы лежат в `contracts/` | done | существующие JSON Schema в `contracts/` |
| Prompts | созданы phase-0 placeholders для system/decision/handoff/lead/no-answer | done | файлы в `prompts/` |
| Workflows | созданы import-friendly placeholders `01..10` без продуктовой логики | done | JSON parse всех `.json`; representative `01_inbound_echo` проходит `n8n validate_workflow` |
| Samples | добавлены sample payloads для chatwoot/leads/rag сценариев | done with caveat | `lead_payload_valid` и `retrieval_result_*` проходят schema validation; `samples/chatwoot/*` помечены как illustrative/non-canonical |
| Ops | подготовлены `ops/env.example`, runbook и bootstrap checklist | done | файлы в `ops/`; checklist фиксирует `.codex` decision, validation notes и `SPEC_GAP` |
| Initiating prompt | `tasks/codex-initiating-prompt.md` прочитан и принят как стартовый prompt | done | checklist Фазы 0 |
| `.codex/` слой | оценён и не создан без необходимости | done | checklist Фазы 0 |
| Scope control | Фаза 1 и далее не реализовывались | done | workflow placeholders выдают только placeholder metadata через `Manual Trigger -> Set` |
| Git baseline | каталог инициализирован как локальный git-репозиторий | done | `git init`, затем `git status` показывает чистый bootstrap working tree без коммитов |

## Gate to Phase 1

Переход к Фазе 1 допустим только после:

1. чтения `tasks/codex-initiating-prompt.md`;
2. проверки JSON-файлов и sample payloads;
3. фиксации `SPEC_GAP`, если противоречие между каноническими документами мешает следующей фазе.

## Проверки, на которые опирается матрица

1. Распарсено `27` JSON-файлов без ошибок.
2. Schema validation пройдена для:
   - `samples/leads/lead_payload_valid.json`
   - `samples/rag/retrieval_result_strong.json`
   - `samples/rag/retrieval_result_empty.json`
3. Representative workflow `workflows/01_inbound_echo.json` валиден для n8n как placeholder workflow.
4. Ограничение evidence: реальный import всех `10` workflow в n8n и соответствие illustrative Chatwoot samples upstream payload пока не доказывались в Phase 0.
