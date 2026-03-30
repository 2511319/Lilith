# 15. Chatwoot Real Contract

## Назначение

Этот документ фиксирует не "иллюстративный sample", а рабочее понимание сырого Chatwoot payload для Phase 1.
Его задача — разделить:

1. raw upstream event от Chatwoot;
2. normalized inbound contract в `contracts/inbound-message-normalized.schema.json`;
3. спорные или недоказанные места, которые нельзя закрывать фантазией.

## Источники истины для этого документа

1. Наблюдаемый payload из `dev-chatwoot.dbi.ru` по `conversation=4`, `message id=213`.
2. Official Chatwoot docs:
   - https://www.chatwoot.com/hc/user-guide/articles/1677693021-how-to-use-webhooks
   - https://developers.chatwoot.com/api-reference/conversations/conversation-details
3. Runtime mapping в [01_inbound_echo.json](/f:/project/Lilith/workflows/01_inbound_echo.json).

## Главное разделение

- Raw Chatwoot event не является каноническим runtime contract бота.
- Канонический вход бота начинается после нормализации в `inbound-message-normalized`.
- Любые расхождения между raw Chatwoot payload и illustrative samples должны решаться в пользу:
  - реального upstream payload;
  - object-definition в official docs;
  - подтверждённого replay через webhook.

## Подтверждённый raw shape для Phase 1

Наблюдаемый customer message из `dev-chatwoot.dbi.ru`, `conversation=4`, `message id=213`:

```json
{
  "id": 213,
  "content": "Phase 1 live happy path probe 2026-03-19 21:14 MSK",
  "inbox_id": 1,
  "conversation_id": 4,
  "message_type": 0,
  "content_type": "text",
  "status": "sent",
  "private": false,
  "source_id": null,
  "created_at": 1773944059,
  "sender": {
    "id": 5,
    "name": "long-brook-925",
    "type": "contact"
  }
}
```

## Подтверждённые правила интерпретации

### 1. `message_type`

- Для реального inbound customer message в dev-контуре подтверждён `message_type = 0`.
- В текущем normalized contract значение сохраняется уже как semantic marker:
  - `metadata.chatwoot_message_type = "incoming"`
- Следовательно, raw mapping должен уметь интерпретировать как минимум:
  - `0`
  - `"incoming"`

### 2. `created_at`

- В реальном observed payload подтверждён unix-timestamp.
- Для normalized contract поле `received_at` остаётся ISO-8601.
- Следовательно, нормализация должна выполнять преобразование:
  - `unix timestamp seconds -> ISO-8601`

### 3. `sender.type`

- Для customer inbound подтверждён `sender.type = "contact"`.
- Это остаётся главным discriminator для отделения клиентского сообщения от operator/bot/system paths.

### 4. `conversation.id` и `account.id`

- `conversation.id` используется как routing key для reply path.
- `account.id` обязателен для Chatwoot reply API path:
  - `/api/v1/accounts/{account_id}/conversations/{conversation_id}/messages`

## Runtime mapping в Phase 1

| Raw Chatwoot field | Normalized field | Примечание |
| --- | --- | --- |
| `body.account.id` | участвует в `correlation_id` | для Chatwoot reply API |
| `body.conversation.id` | `conversation_id` | routing key |
| `body.conversation.inbox_id` | `inbox_id` | string |
| `body.conversation.channel` | `channel` | `Channel::WebWidget -> web_chat` |
| `body.id` | `message_id` | string |
| `body.conversation.contact_inbox.source_id \|\| body.contact.id` | `external_user_id` | приоритет у inbox-specific source id |
| `body.sender.type = contact` | `sender_type = customer` | semantic normalization |
| `body.content` | `text` | string |
| `body.contact.additional_attributes.browser_language` | `raw_language_hint` | optional |
| `body.created_at` | `received_at` | normalize to ISO-8601 |
| `body.contact.id` | `metadata.chatwoot_contact_id` | string |
| raw `message_type` | `metadata.chatwoot_message_type = incoming` | semantic inbound marker |

## Документально подтверждённые противоречия

На 2026-03-19 official Chatwoot docs для webhook layer содержат внутреннее противоречие:

- illustrative webhook sample в статье про webhooks показывает строковые поля вида:
  - `message_type = "incoming"`
  - `created_at = "..."` в строковой форме
- object-style API descriptions и наблюдаемый runtime payload указывают на:
  - `message_type = integer`
  - `created_at = unix-timestamp`

Практическое правило проекта:

- не строить workflow только по illustrative sample;
- сначала подтверждать raw payload capture или replay;
- только потом кодировать mapping.

## Что считать недоказанным

Пока не доказаны и требуют capture:

- точный shape account-level webhook body, который Chatwoot отправляет в `n8n`;
- наличие или отсутствие envelope вокруг message object;
- точные webhook headers для signature verification в `dev` контуре;
- shape исходящих webhook delivery attempts при bot/admin messages.

## Что отсюда следует для разработки

1. Phase 1 нельзя считать закрытой только по illustrative samples.
2. Любая следующая фаза, зависящая от Chatwoot ingress, должна опираться на raw capture evidence.
3. `samples/chatwoot/*.json` остаются вспомогательными файлами, а не абсолютным source of truth.
