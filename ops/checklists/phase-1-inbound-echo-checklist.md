# Phase 1 Inbound Echo Checklist

## Цель фазы

Доказать рабочий технический проход `Chatwoot -> n8n -> Chatwoot reply` и зафиксировать нормализованный inbound как baseline для следующих фаз.

## Канонические документы и контракты

- `master-spec.md`
- `docs/02-architecture.md`
- `docs/03-workflow-phases.md`
- `docs/09-acceptance-criteria.md`
- `contracts/inbound-message-normalized.schema.json`
- `samples/chatwoot/README.md`
- `docs/15-chatwoot-real-contract.md`

## Implementation tasks

- [x] Подтвердить реальный Chatwoot webhook shape по live payload, а не только по illustrative sample.
- [x] Перевести `workflows/01_inbound_echo.json` из placeholder в рабочий inbound flow.
- [x] Нормализовать inbound event к `inbound-message-normalized`.
- [x] Настроить публикацию простого reply обратно в Chatwoot.
- [x] Зафиксировать correlation fields, нужные для следующих фаз.
- [x] Вынести `chatwoot_base_url` из normalized payload.
- [x] Пересоздать dev workflows прямым `n8n` API без MCP workflow mutation.

## Test and validation tasks

- [x] Проверить полный happy path `inbound -> normalize -> reply`.
- [x] Сверить normalized payload с `inbound-message-normalized.schema.json`.
- [x] Подготовить smoke-проверку для входящего сообщения и ответа.
- [x] Убедиться, что workflow не содержит запрещённых `Code/Function`-нод.
- [x] Снять сырой payload account-level Chatwoot webhook через capture workflow `00_chatwoot_webhook_capture`.
- [x] Подтвердить прямым probe, что `capture` и `inbound` webhook endpoint отвечают `200`.
- [x] Подтвердить live e2e через widget.

## Evidence links

- [x] `samples/chatwoot/inbound_message.json` обновлён до representative raw account webhook sample.
- [x] Dev capture webhook: `https://n8n.dbi.ru/webhook/dev/chatwoot/capture-raw`
- [x] Dev inbound webhook: `https://n8n.dbi.ru/webhook/dev/chatwoot/inbound-echo`
- [x] Active dev capture workflow: `g1WI2GecMVc3vPhn`
- [x] Active dev inbound workflow: `K3s29zBuhDAK9tnm`
- [x] Manual replay evidence: ручной `POST` в inbound endpoint создал Chatwoot reply `message id=222`.
- [x] Live e2e evidence: widget inbound `message id=224` породил Chatwoot reply `message id=225`.
- [x] Local validation: `node --test tests\\smoke\\phase-1-inbound-echo.test.mjs tests\\integration\\phase-1-inbound-echo.test.mjs` -> `8/8 pass`

## Blockers / assumptions / `SPEC_GAP`

- Blockers: none for Phase 1 sign-off.
- Assumptions: `conversation.id` используется как канонический `conversation_id`, а `contact_inbox.source_id` как приоритетный `external_user_id`.
- Assumptions: direct `n8n` API deploy с этой машины должен отправлять workflow JSON как явный `UTF-8`.
- `SPEC_GAP`: в Chatwoot docs есть противоречие между illustrative sample и object-definition по `message_type` и `created_at`; для реализации опираться нужно на live payload и capture evidence.

## Sign-off

- Статус: `done`
- Exit criteria: inbound webhook принят, normalized event собран, reply опубликован, evidence приложен.
- Остаточные риски: webhook signature verification ещё не доказана на реальном окружении; для следующей фазы нужно сохранить дисциплину direct API deploy with explicit UTF-8 or перейти на `pwsh 7`.
