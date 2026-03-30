# n8n Active Version Publish Verification

## Назначение

Этот runbook фиксирует рабочее правило для всех дальнейших изменений workflow в `n8n.dbi.ru`.
Проблема, уже воспроизведённая на Phase 1: draft workflow может отличаться от `activeVersion`, а production webhook живёт именно по `activeVersion`.

## Симптом

- В UI или в top-level workflow видно уже новое состояние нод.
- Production webhook ведёт себя так, будто изменение не применилось.
- Credential, path или параметры запроса выглядят корректно в draft, но не проявляются в живом execution.

## Подтверждённый корень проблемы

- Простого `n8n_update_full_workflow` недостаточно как доказательства публикации.
- Реальный рабочий слой — `activeVersion`.
- Пока не выполнен publish-cycle, `activeVersion` может отставать от draft.

## Обязательное правило проверки

После каждого существенного обновления workflow:

1. Прочитать workflow через `n8n_get_workflow(mode=full)`.
2. Проверить не только top-level `nodes`, но и `activeVersion.nodes`.
3. Если `versionId != activeVersionId`, считать обновление непубликованным.
4. Выполнить `deactivateWorkflow -> activateWorkflow`.
5. Повторно проверить, что `activeVersionId == versionId`.
6. Только после этого считать удалённый workflow реально обновлённым.

## Что нельзя делать

- Нельзя считать изменение применённым только по UI draft-state.
- Нельзя повторять одинаковые пуши в workflow, не сверяя `activeVersion`.
- Нельзя диагностировать credential/auth баг, пока не доказано, что нужный credential реально попал в `activeVersion`.

## Phase 1 evidence

- Workflow: `53AmH4jR4eQYOjWy`
- До publish-cycle `activeVersion` не содержал актуальную credential-привязку.
- После `deactivate -> activate` `activeVersionId` стал равен `versionId`.
- После этого credential `Chatwoot DEV Header Auth 371` подтвердился в `activeVersion`.

## Короткая ретроспектива

- Ранний сигнал, который был пропущен: поведение production webhook не совпадало с draft workflow.
- Правильная реакция на такой сигнал: остановить повторные апдейты, проверить `activeVersion`, затем только продолжать отладку интеграции.
