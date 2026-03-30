# Phase 2 Dedup / Anti-loop Checklist

## Цель фазы

Обеспечить `1 inbound -> 1 answer`, подавить duplicate delivery и не пускать bot/operator/system messages в reply-контур.

## Простое объяснение

- Dedup-слой нужен, чтобы один и тот же входящий webhook не породил два одинаковых ответа пользователю.
- Продуктовый смысл простой: если Chatwoot или сеть повторно доставят одно и то же сообщение, бот не должен отвечать повторно и выглядеть сломанным или навязчивым.

## Канонические документы и контракты

- `master-spec.md`
- `docs/02-architecture.md`
- `docs/03-workflow-phases.md`
- `docs/08-observability.md`
- `docs/09-acceptance-criteria.md`
- `contracts/dedup-record.schema.json`

## Implementation tasks

- [x] Зафиксирован устойчивый dedup key: `cw:{account_id}:{conversation_id}:{message_id}`.
- [x] Выбран TTL state store без внешнего middleware: `n8n` Data Table `lilith_dev_dedup_records` (`id=IWxUMSumwaGN44Ez`).
- [x] Реализован dedup lookup в live workflow [01_inbound_echo.json](F:\project\Lilith\workflows\01_inbound_echo.json) через `If Dedup Record Exists` и `If Dedup Record Does Not Exist`.
- [x] Реализована запись dedup-record со статусами `processed` и `suppressed`.
- [x] Реализован sender guard для `non_incoming_message` и `non_customer_sender`.
- [x] Логирование `suppress_reason` вынесено в trace-ветки, а не в persisted dedup-record.
- [x] Phase 1 reply flow сохранён: обработанный inbound по-прежнему идёт в `Prepare Echo Reply -> Publish Reply to Chatwoot`.

## Test and validation tasks

- [x] Локальные структурные тесты Phase 1 + Phase 2 проходят: `14/14 pass`.
- [x] Duplicate delivery case проверен прямым `POST` одного и того же payload дважды в `https://n8n.dbi.ru/webhook/dev/chatwoot/inbound-echo`.
- [x] Подтверждено отсутствие второго ответа в Chatwoot: `replyDelta = 1` для duplicate test `message_id=3001`.
- [x] Sender suppress case проверен прямым `POST` payload с `message_type=outgoing` и `sender.type=user`.
- [x] Подтверждено отсутствие ответа в sender suppress case: `replyDelta = 0`, dedup rows не созданы.
- [x] Проверена корректность persisted `dedup-record` через `n8n` Data Table rows API.

## Evidence links

- [x] Duplicate processed trace: execution `180852899`
  - `reply_message_id = 226`
  - `dedup_key = cw:1:4:3001`
- [x] Duplicate suppress trace: execution `180853051`
  - `suppress_reason = duplicate_delivery`
  - `dedup_key = cw:1:4:3003`
- [x] Sender suppress trace: execution `180852945`
  - `suppress_reason = non_incoming_message`
  - `message_type_raw = outgoing`
  - `sender_type_raw = user`
- [x] Representative dedup records in Data Table `IWxUMSumwaGN44Ez`
  - row `id=3`: `cw:1:4:3003`, `status=processed`
  - row `id=4`: `cw:1:4:3003`, `status=suppressed`

## Blockers / assumptions / `SPEC_GAP`

- Blockers: отсутствуют.
- Assumptions: TTL baseline для Phase 2 зафиксирован как `24h` через `expires_at`; автоматическая очистка пока не внедрялась.
- `SPEC_GAP`: отдельный dedicated `WF-02` как самостоятельный runtime-workflow пока не выделен; guardrail-слой реализован внутри live inbound workflow для минимального изменения работающего контура.

## Sign-off

- Статус: `done`
- Exit criteria: duplicate подавлен, sender suppress доказан, `suppress_reason` логируется, evidence приложен.
- Остаточные риски:
  - TTL cleanup policy ещё не автоматизирована.
  - В dev table остаются и `processed`, и `suppressed` rows на один `dedup_key`; для текущего baseline это допустимо, но cleanup/retention нужно добить позже.

## Почему retention оставлен на потом

- Сейчас `expires_at` уже пишется, но нет отдельного job/процесса, который регулярно чистит просроченные rows.
- Риск не в поломке логики ответа, а в росте таблицы и постепенном накоплении технического мусора.
- Для dev-контура это не критично прямо сейчас: слой уже корректно подавляет дубли и не ломает пользовательский ответ.
- Оптимально вернуться к cleanup позже отдельным маленьким инкрементом, когда появится понятная operational policy: как часто чистить, что считать safe retention window и кто отвечает за эту housekeeping-задачу.
