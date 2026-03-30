# 10. Repo Skeleton

## Целевая структура

```text
repo-root/
  AGENTS.md
  README.md
  master-spec.md
  .codex/                  # optional: repo-local Codex execution layer
    config.toml            # optional: repo-specific overrides
    agents/                # optional: repo-specific subagents
  docs/
  contracts/
  prompts/
  workflows/
  samples/
  services/
  tests/
  ops/
```

## Назначение директорий

### `docs/`
Человекочитаемые документы, срезы мастер-спеки, acceptance matrix, runbooks.

### `contracts/`
JSON Schema и иные управляемые data contracts.

### `prompts/`
Управляемые prompt-файлы. Не хранить prompts размазанными по workflow-полям без канонического источника.

### `workflows/`
Отдельные n8n workflow-файлы по фазам и подпроцессам.

### `samples/`
Тестовые payload, мок-данные, примеры inbound/retrieval/lead write.

### `services/`
Только явно оправданные сервисы: ingestion, адаптеры, возможно retrieval API.

### `tests/`
Smoke, integration, acceptance, failure-path checks.

### `ops/`
`env.example`, checklists, runbooks, operational notes.

### `.codex/`
Не часть продукта. Это optional execution-layer для repo-local инструкций, project-specific subagents и config overrides, если глобальных настроек Codex недостаточно.

## Правило границ

Файл должен жить там, где его смысл очевиден.  
Если файл не укладывается в структуру, это повод уточнить архитектуру, а не нарушить границы каталогов.
