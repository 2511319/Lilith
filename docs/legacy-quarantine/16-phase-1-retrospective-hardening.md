# 16. Phase 1 Retrospective And Hardening

## Цель

Зафиксировать, почему Phase 1 начала "сыпаться" ещё до полноценного завершения, и какие системные меры нужны, чтобы следующие фазы не повторяли тот же паттерн.

## Executive Summary

Phase 1 спотыкалась не из-за одной ошибки.
Сбой был многослойным:

1. raw Chatwoot ingress был принят за достаточно понятный, хотя он не был доказан;
2. illustrative samples и реальный upstream shape разошлись;
3. draft/activeVersion в `n8n` вели себя по-разному;
4. несколько итераций подряд шли по слабым предположениям вместо stop-the-line и capture-first подхода.

## Root Causes

### 1. External integration truth не был зафиксирован как отдельный артефакт

Симптом:
- workflow строился по docs/sample-модели;
- реальные поля `message_type` и `created_at` оказались иного типа.

Корень:
- для Chatwoot не существовало отдельного integration truth doc;
- `samples/chatwoot/` долго воспринимались слишком близко к source of truth.

Последствие:
- логика guard и timestamp mapping была написана под недоказанный payload shape.

### 2. Мы поздно перешли от косвенных признаков к изоляционным экспериментам

Симптом:
- слишком долго обсуждались credential, webhook и UI-привязки;
- точный raw shape был подтверждён только после ручного replay.

Корень:
- не было жёсткого правила "сначала capture/replay, потом интерпретация".

Последствие:
- время тратилось на plausible explanations вместо доказанных.

### 3. `n8n` publish model оказалась operational trap

Симптом:
- draft workflow выглядел обновлённым, а production path вёл себя как старый.

Корень:
- `activeVersion` не проверялся как обязательный слой истины.

Последствие:
- диагностика credential/flow-логики шла по ложной картине состояния.

### 4. Процессный stop-the-line сработал слишком поздно

Симптом:
- повторялись похожие итерации обновления workflow и проверки auth.

Корень:
- не было жёсткого порога для остановки после повторяющихся недоказанных предположений.

Последствие:
- часть времени была потрачена на неэффективные циклы.

## Подтверждённые ошибки Phase 1

1. Guard в [01_inbound_echo.json](/f:/project/Lilith/workflows/01_inbound_echo.json) ожидал `message_type = "incoming"` вместо реального `0`.
2. `received_at` нормализовался через `new Date(created_at)` без учёта unix timestamp.
3. Remote workflow changes считались применёнными по draft, а не по `activeVersion`.
4. Реальный участок `Chatwoot -> n8n` не имел отдельного capture harness до поздней стадии.

## Что уже исправлено

1. Phase 1 workflow теперь принимает `message_type = 0` и `"incoming"`.
2. Нормализация `created_at` учитывает unix timestamp в секундах.
3. Для `n8n` зафиксирован runbook:
   [n8n-active-version-publish-verification.md](/f:/project/Lilith/ops/runbooks/n8n-active-version-publish-verification.md)
4. Состояние Phase 1 и `SPEC_GAP` отражены в:
   [phase-1-inbound-echo-checklist.md](/f:/project/Lilith/ops/checklists/phase-1-inbound-echo-checklist.md)
5. Реальный Chatwoot upstream shape оформлен в:
   [15-chatwoot-real-contract.md](/f:/project/Lilith/docs/15-chatwoot-real-contract.md)

## Hardening Package

### A. Raw capture before behavior

Для любой внешней интеграции сначала нужен capture workflow или equivalent trace harness.
Только после этого разрешено:

- писать normalization;
- писать guardrails;
- писать downstream business behavior.

### B. Two-layer contract discipline

Нужно жёстко разделять:

1. raw upstream contract;
2. normalized runtime contract.

Нельзя использовать normalized contract как доказательство того, что upstream уже понят.

### C. Publish verification as release gate

Для `n8n` любое существенное изменение workflow считается реальным только после:

1. проверки `activeVersion`;
2. publish-cycle `deactivate -> activate`;
3. повторной сверки version ids.

### D. Stop-After-2-Failed-Assumptions

Новое рабочее правило проекта:

Если два раза подряд гипотеза о причине проблемы не подтверждается, нужно:

1. остановить повторение того же типа действий;
2. перечислить уже опровергнутые предположения;
3. назвать один следующий эксперимент, который уменьшит неопределённость;
4. не делать новые "похожие" изменения, пока этот эксперимент не проведён.

Это правило особенно обязательно для:

- auth / credentials;
- внешних webhook/integration flows;
- `n8n` publish/activeVersion поведения;
- payload contract mismatches.

### E. External integration checklist gate

Ни одна фаза, завязанная на внешний ingress/egress, не может считаться `done`, пока нет:

1. raw capture или replay evidence;
2. нормализационного mapping doc;
3. negative case;
4. live path или формально объяснённого blocker.

## Что было не так в спецификации

Не всё в spec-pack было плохим.
Проблема точечная:

- repo хорошо описывал normalized contract и phase-order;
- repo недостаточно жёстко отделял illustrative external samples от доказанного raw upstream contract;
- не было отдельного hardening rule для внешних интеграций.

Это не "фатально плохая спецификация", но это достаточный дефект, чтобы Phase 1 начала буксовать.

## Что считать критичными действиями сейчас

1. Не переходить к Phase 2, пока Phase 1 не переведена хотя бы в состояние "integration understood".
2. Вести Chatwoot ingress через capture-first подход.
3. Любую внешнюю интеграцию документировать как:
   - raw contract
   - normalized mapping
   - replay proof
   - live proof or blocker

## Рекомендация по статусу Phase 1

Phase 1 нельзя считать `done`.
Корректный статус: `blocked`, если ближайшее действие зависит от недоказанного account webhook delivery, или `in_progress`, если capture harness уже развернут и по нему идёт исследование.

На 2026-03-19 я считаю более честным статус `blocked` до запуска capture workflow и получения сырого account webhook payload.
