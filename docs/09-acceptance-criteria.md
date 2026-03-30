# 09. Acceptance Criteria

## Статус

Acceptance-layer для действующего `v2` канона.
Архивный `v1 baseline` не переоценивается ретроактивно, а используется как reference baseline для migration compatibility.

## Принцип

`v2` считается принятой не тогда, когда агент отвечает "умнее", а тогда, когда одновременно доказаны:

- продуктовая полезность;
- прозрачность оркестрации;
- наблюдаемость agent/tool/memory поведения;
- управляемость handoff и lead write;
- совместимость миграции без разрушения доказанного ingress shell.

## 1. Ingress Safety Shell

- Chatwoot webhook стабильно доходит до `n8n`.
- normalization воспроизводимо приводит raw ingress к runtime-contract.
- dedup/anti-loop сохраняют гарантию `1 inbound -> 1 external reply`.
- bot/operator/system/non-customer messages не попадают в customer-facing контур.
- suppress reason логируется и трассируется по `correlation_id`.
- переход на `v2` не деградирует доказанный `v1` ingress shell.

## 2. Agent Core Baseline

- agent получает bounded input envelope, а не сырой произвольный payload.
- agent выдаёт структурированный `agent-decision-envelope`.
- на normal-case agent формирует непустой пользовательский ответ на русском языке.
- agent не публикует внешние side effects напрямую.
- controlled fallback не приводит к silent failure.
- trace содержит как минимум `agent_start`, `agent_decision`, `safe_fallback` при ошибке.

## 3. Memory Capability

- conversational memory работает воспроизводимо в рамках диалога.
- memory read/write события наблюдаемы и трассируются.
- memory provider признан пригодным для выбранного production mode.
- память не становится скрытым источником истины вне observability.
- при недоступности памяти система переходит в контролируемое degraded behavior.

## 4. Retrieval Tools and Grounding

- retrieval вызывается как bounded capability, а не как неявная магия.
- tool invocation и tool result отражены в trace.
- retrieval result имеет явный quality signal.
- grounded answer path подтверждён evidence.
- weak/empty retrieval не приводит к выдумыванию фактов.
- при слабом контексте система уходит в safe limitation или handoff path.

## 5. Sales Governance

- agent не разрушает внешний sales-governance слой.
- стадия диалога остаётся явной и доступной для аудита.
- число бессмысленных уточнений ограничено.
- CTA остаётся уместным и контролируемым.
- sales progression можно объяснить по trace, а не только по тексту ответа.

## 6. Handoff Gate

- handoff возможен по прямому запросу пользователя.
- handoff возможен по fallback/uncertainty/unsafe conditions.
- agent может рекомендовать handoff, но не завершает его молча без gate.
- workflow публикует user-facing handoff response.
- оператор получает пригодный summary и причину передачи.
- после handoff бот не продолжает скрытое владение кейсом.

## 7. Lead Capture and Lead Write Gateway

- conversational lead capture собирает валидный draft без потери partial progress.
- lead truth не принадлежит агенту без внешней валидации.
- lead write проходит через explicit idempotent gateway.
- duplicate-safe поведение доказано.
- успешный write создаёт traceable external result.
- failed write не маскируется под success.

## 8. Observability and Evals

- correlation trace проходит через весь внешний контур и agent layer.
- trace покрывает:
  - ingress
  - dedup
  - agent_start
  - memory_read / memory_write
  - retrieval_tool
  - tool_result
  - approval outcome, если применимо
  - decision_gate
  - reply / handoff / lead write
  - completion
- есть evidence не только happy path, но и fallback path.
- pilot support path воспроизводим по логам и trace.

## 9. Migration Compatibility

- `v2` не ломает доказанный `v1` baseline до момента controlled cutover.
- сохраняется работоспособность ingress shell, даже если agent layer временно деградирует.
- есть migration table для контрактов `v1 -> v2`.
- legacy evidence не объявляется недействительным без явной причины.
- новые acceptance-критерии не подменяют silently старые, а расширяют их под новую архитектуру.

## 10. Architectural Discipline

- в workflow нет запрещённых `Code`, `Function`, `Function Item` или аналогов.
- критичная логика не спрятана в длинных expressions и нечитабельных inline-конфигурациях.
- agent не владеет destructive/high-impact side effects без explicit gate.
- внешние действия по-прежнему находятся в workflow-owned boundary.
- структура репозитория и contract layer соответствуют текущему `v2` канону, а не случайному набору временных решений.

## Минимальный Evidence Pack для принятия v2

- live trace для ingress shell;
- live trace для agent normal-case;
- fallback trace;
- memory trace;
- retrieval trace;
- handoff trace;
- lead write trace;
- contract migration matrix;
- отсутствие запрещённых нод;
- acceptance checklist с привязкой к конкретным workflow и sample payload.
