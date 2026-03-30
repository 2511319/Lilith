# 14. Delivery Plan

## Назначение

Этот документ фиксирует master-level план реализации фаз `1 -> 10`, правила ведения прогресса и обязательные evidence-gates.
Он не заменяет `master-spec.md`, а переводит канонические требования в управляемый execution backlog.

## Статусы фаз

- `done` — deliverables реализованы, проверки пройдены, evidence зафиксирован в checklist.
- `in_progress` — по фазе ведётся реализация или верификация.
- `blocked` — переход дальше невозможен из-за внешнего блокера или `SPEC_GAP`.
- `not_started` — реализация фазы ещё не начата.

## Матрица статусов

| Фаза | Название | Статус | Checklist | Evidence baseline | Следующий gate |
| --- | --- | --- | --- | --- | --- |
| 0 | Bootstrap | done | `ops/checklists/phase-0-bootstrap-checklist.md` | `docs/13-bootstrap-acceptance-matrix.md` | Переход к Фазе 1 |
| 1 | Inbound Echo | done | `ops/checklists/phase-1-inbound-echo-checklist.md` | `samples/chatwoot/*`, smoke trace, live e2e trace | Phase 2 dedup / anti-loop |
| 2 | Dedup / Anti-loop | done | `ops/checklists/phase-2-dedup-anti-loop-checklist.md` | duplicate + suppress traces, dedup table rows, execution evidence | Phase 3 LLM without RAG |
| 3 | LLM Without RAG | done | `ops/checklists/phase-3-llm-without-rag-checklist.md` | integrated ingress->LLM->reply trace, error fallback trace, decision envelope samples | Phase 4 handoff |
| 4 | Handoff | not_started | `ops/checklists/phase-4-handoff-checklist.md` | direct + fallback handoff evidence | Human escalation proof |
| 5 | Snapshot Ingestion | not_started | `ops/checklists/phase-5-snapshot-ingestion-checklist.md` | ingest report, snapshot version | Repeatable knowledge ingest |
| 6 | RAG Baseline | not_started | `ops/checklists/phase-6-rag-baseline-checklist.md` | strong/empty retrieval evidence | Grounded answer proof |
| 7 | Sales State Machine | not_started | `ops/checklists/phase-7-sales-state-machine-checklist.md` | staged conversation traces | Predictable state transitions |
| 8 | Lead Capture | not_started | `ops/checklists/phase-8-lead-capture-checklist.md` | valid + partial capture evidence | Validated lead payload readiness |
| 9 | Lead Write | not_started | `ops/checklists/phase-9-lead-write-checklist.md` | created/duplicate traces | Idempotent write proof |
| 10 | Observability / Pilot | not_started | `ops/checklists/phase-10-observability-pilot-checklist.md` | end-to-end trace, metrics, runbook | Baseline-ready acceptance |

## Правило закрытия фазы

Фаза может перейти в `done` только при одновременном выполнении трёх условий:

1. реализован phase artifact, соответствующий текущему scope;
2. пройдены релевантные проверки и регрессия предыдущих фаз;
3. в phase-checklist зафиксированы evidence, остаточные риски и sign-off.

## Правило обновления прогресса

После каждого phase increment:

1. обновить статус фазы в этом документе;
2. добавить или уточнить ссылки на evidence;
3. обновить соответствующий checklist;
4. если найдено противоречие со спецификацией, зафиксировать `SPEC_GAP` до перехода к следующей фазе.

## Фаза 1 — Inbound Echo

- Цель: доказать рабочий проход `Chatwoot -> n8n -> Chatwoot reply`.
- Входные зависимости: Phase 0 done, `contracts/inbound-message-normalized.schema.json`, Chatwoot sample payload, baseline env variables.
- Deliverables: production-shaped `workflows/01_inbound_echo.json`, нормализация inbound event, публикация простого ответа в Chatwoot.
- Acceptance gate: inbound webhook доходит до n8n, normalized payload формируется стабильно, ответ публикуется обратно в Chatwoot.
- Evidence gate: sample inbound, trace webhook execution, smoke-сценарий happy path.
- Основные риски: иллюстративный sample Chatwoot может не совпасть с реальным upstream payload, несоответствие webhook auth или поля conversation/message, отсутствие raw capture account webhook body.

## Фаза 2 — Dedup / Anti-loop

- Цель: гарантировать `1 inbound -> 1 answer` и отсеять нерелевантные типы сообщений.
- Простыми словами: если одно и то же входящее сообщение приезжает повторно, бот должен промолчать, а не отвечать второй раз.
- Входные зависимости: рабочий inbound echo, `contracts/dedup-record.schema.json`, при необходимости `contracts/conversation-state.schema.json`.
- Deliverables: dedup key strategy, TTL state store, suppress logic для bot/operator/system messages, suppress reason logging.
- Acceptance gate: duplicate event не создаёт второй reply, suppress scenarios корректно останавливаются.
- Evidence gate: duplicate case trace, suppress case trace, запись suppress reason.
- Статус-факт: dedup key реализован как `cw:{account_id}:{conversation_id}:{message_id}`, state store — `n8n` Data Table `lilith_dev_dedup_records` (`IWxUMSumwaGN44Ez`), duplicate и sender suppress доказаны execution traces `180852899`, `180853051`, `180852945`.
- Основные риски: неочевидные типы служебных сообщений Chatwoot вне уже пойманных кейсов, state store cleanup пока не автоматизирован; текущий риск отложенного cleanup — рост таблицы, а не немедленная поломка reply-логики.

## Фаза 3 — LLM Without RAG

- Цель: получить стабильный RU-only sales baseline без knowledge layer.
- Входные зависимости: dedup/guardrails, Phase 3 prompts, `contracts/llm-decision-envelope.schema.json`.
- Deliverables: `workflows/03_llm_dialog_no_rag.json`, prompts baseline, retry/timeout options в `OpenAI Chat Model`, явный fallback behavior, structured decision envelope.
- Acceptance gate: пользователь получает ответ на русском, ошибки LLM не приводят к silent failure.
- Evidence gate: RU-only happy path, error fallback trace, decision envelope validation.
- Статус-факт: реализован sub-workflow `Lilith DEV - 03 LLM Without RAG` (`gViChIh0yTY6zclR`) на штатных AI-нодах `Basic LLM Chain + OpenAI Chat Model + Structured Output Parser + Auto-fixing Output Parser` и встроен в родительский ingress workflow `Lilith DEV - 01 Inbound Echo` (`K3s29zBuhDAK9tnm`) через `Execute Sub-workflow`; integrated live trace `180856882 -> 180856883` с Chatwoot `message_id 234 -> 235` подтверждает runtime-фазу, а `180854905` остаётся evidence controlled fallback.
- Основные риски: качество sales baseline без RAG ограничено до Фазы 6, fallback пока доказан controlled model error вместо реального timeout, gateway credential остаётся внешней зависимостью dev-контура.

## Фаза 4 — Handoff

- Цель: сделать handoff штатной частью контура, а не аварийным сценарием.
- Входные зависимости: LLM decision layer, `contracts/handoff-summary.schema.json`, `docs/05-handoff-policy.md`.
- Deliverables: explicit handoff trigger, fallback handoff trigger, internal note publication, handoff summary generation.
- Acceptance gate: по прямому запросу и по fallback-условию разговор передаётся оператору.
- Evidence gate: user-requested handoff case, low-confidence case, trace публикации internal note.
- Основные риски: handoff trigger пересекается с обычным sales flow, неполный summary для оператора.

## Фаза 5 — Snapshot Ingestion

- Цель: подготовить воспроизводимый knowledge ingestion pipeline.
- Входные зависимости: Qdrant target, ingestion service placeholder, `contracts/knowledge-chunk.schema.json`.
- Deliverables: repeatable snapshot pipeline, chunking policy, embeddings pipeline, Qdrant upsert, snapshot version tracking.
- Acceptance gate: snapshot загружается повторяемо, knowledge chunk contracts соблюдаются.
- Evidence gate: ingest report, snapshot version, representative Qdrant verification.
- Основные риски: дрейф ingestion-логики в скрытый middleware, неповторяемая версия snapshot, слабая трассировка ingestion.

## Фаза 6 — RAG Baseline

- Цель: внедрить retrieval и grounded answer без галлюцинаций при слабом контексте.
- Входные зависимости: ingestion baseline, `contracts/retrieval-result.schema.json`, `docs/06-rag-policy.md`.
- Deliverables: retrieval top-k, retrieval quality flag, grounded context injection в LLM flow, weak/empty fallback.
- Acceptance gate: при наличии данных retrieval даёт usable context, при weak/empty retrieval бот не выдумывает.
- Evidence gate: strong retrieval case, empty retrieval case, fallback trace.
- Основные риски: retrieval quality ниже ожиданий, смешение RAG и non-RAG policy, отсутствие прозрачного quality flag.

## Фаза 7 — Sales State Machine

- Цель: управлять коммерческим диалогом через предсказуемые стадии.
- Входные зависимости: reply baseline, RAG baseline, `contracts/conversation-state.schema.json`, `docs/04-sales-policy.md`.
- Deliverables: state transitions `intro / qualify / propose / cta / lead_capture / handoff / closed`, clarification limit, CTA transition logic.
- Acceptance gate: диалог движется по стадиям, число уточнений ограничено, CTA возникает естественно.
- Evidence gate: staged conversation traces, clarification limit reached case.
- Основные риски: state explosion, конфликт handoff и CTA переходов, утечка internal processing flags в user-facing replies.

## Фаза 8 — Lead Capture

- Цель: собрать и валидировать минимальный lead payload с сохранением partial progress.
- Входные зависимости: sales state machine, `contracts/lead-payload.schema.json`, `docs/07-lead-policy.md`.
- Deliverables: slot filling для `contact`, `name`, `interest`, `description`, минимальная валидация контакта, partial progress persistence.
- Acceptance gate: valid payload собирается без лишних полей, partial progress не теряется.
- Evidence gate: successful contact capture, invalid or partial capture trace, persistence proof.
- Основные риски: смешение processing `status` с каноническим payload, переусложнение валидации контакта, потеря partial state.

## Фаза 9 — Lead Write

- Цель: обеспечить идемпотентную запись в Lead Target API.
- Входные зависимости: valid lead payload flow, `contracts/lead-target-api-response.schema.json`, adapter placeholder.
- Deliverables: idempotent write strategy, duplicate fingerprint, обработка `created / duplicate / failed`, operator note с `lead_id`.
- Acceptance gate: duplicate подавляется корректно, successful write даёт traceable `lead_id`.
- Evidence gate: created case, duplicate case, failed write handling trace.
- Основные риски: неустойчивый fingerprint, неявные ретраи с дублями, рассинхрон operator note и факта записи.

## Фаза 10 — Observability / Pilot

- Цель: сделать контур пригодным к ограниченному пилоту и поддержке.
- Входные зависимости: все предыдущие фазы, `docs/08-observability.md`, runbooks and checklists baseline.
- Deliverables: correlation logs, ключевые метрики, operational checks, pilot acceptance matrix, финальный runbook.
- Acceptance gate: end-to-end trace доступен, метрики покрывают основные узкие места, baseline acceptance закрыт.
- Evidence gate: сквозной сценарий inbound -> reply -> lead or handoff, metrics snapshot, pilot-ready checklist.
- Основные риски: запоздалое добавление observability, отсутствие сквозного correlation id, неполный pilot runbook.

## Кумулятивная регрессия

После завершения каждой новой фазы обязательно подтверждать:

1. Фаза 1 — inbound/outbound связность не сломана.
2. Фаза 2 — duplicate не создаёт второй ответ.
3. Фазы 3–6 — RU-only и grounded behavior сохраняются.
4. Фазы 7–9 — state progression и идемпотентность lead write не деградируют.
5. Фаза 10 — наблюдаемость покрывает весь критический контур.

## Открытые `SPEC_GAP`

1. Naming contract-файлов: `master-spec.md` использует одни варианты имён, а фактический spec-pack — hyphenated варианты.
2. Chatwoot samples в `samples/chatwoot/` являются illustrative и требуют сверки с реальным upstream payload при Фазе 1.
3. Для workflow, публикуемых в `n8n.dbi.ru`, top-level draft нельзя считать доказательством rollout; обязателен контроль `activeVersion` и publish-cycle по `ops/runbooks/n8n-active-version-publish-verification.md`.
4. Для внешних webhook-интеграций raw upstream payload должен быть доказан отдельным capture/replay evidence до фиксации business behavior.

## Кумулятивные риски

1. Дрейф orchestration-логики из n8n в скрытые сервисы или expressions.
2. Попытка перепрыгнуть через guardrails, handoff или observability ради ускорения.
3. Несогласованное изменение контрактов без синхронного обновления tests и workflow.
4. Недостаточный объём evidence, из-за которого фаза выглядит завершённой только формально.
5. Ложное чувство публикации workflow в `n8n`, если после update не проверен `activeVersion`.
6. Повторение недоказанных гипотез по внешней интеграции вместо stop-the-line и capture-first подхода.
