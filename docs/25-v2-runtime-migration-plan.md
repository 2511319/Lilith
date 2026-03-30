# 25. V2 Runtime Migration Plan

## Р РЋРЎвЂљР В°РЎвЂљРЎС“РЎРѓ

Planning artifact Р Т‘Р В»РЎРЏ controlled migration Р С•РЎвЂљ `v1 baseline` Р С” `v2 agent-first runtime`.

Р В­РЎвЂљР С•РЎвЂљ Р Т‘Р С•Р С”РЎС“Р СР ВµР Р…РЎвЂљ Р Р…Р Вµ Р В·Р В°Р СР ВµР Р…РЎРЏР ВµРЎвЂљ [master-spec.md](F:\project\Lilith\master-spec.md), Р В° РЎвЂћР С‘Р С”РЎРѓР С‘РЎР‚РЎС“Р ВµРЎвЂљ Р В±Р ВµР В·Р С•Р С—Р В°РЎРѓР Р…РЎвЂ№Р в„– Р С—Р С•РЎР‚РЎРЏР Т‘Р С•Р С” Р С—Р ВµРЎР‚Р ВµРЎвЂ¦Р С•Р Т‘Р В° Р С” Р Р…Р С•Р Р†Р С•Р СРЎС“ Р С”Р В°Р Р…Р С•Р Р…РЎС“ Р В±Р ВµР В· РЎР‚Р В°Р В·РЎР‚РЎС“РЎв‚¬Р ВµР Р…Р С‘РЎРЏ РЎС“Р В¶Р Вµ РЎР‚Р В°Р В±Р С•РЎвЂљР В°РЎР‹РЎвЂ°Р ВµР С–Р С• `v1`.

## Р В¦Р ВµР В»РЎРЉ

Р вЂ”Р В°Р С—РЎС“РЎРѓРЎвЂљР С‘РЎвЂљРЎРЉ `v2`-Р В»Р С‘Р Р…Р ВµР в„–Р С”РЎС“ runtime Р С”Р В°Р С” additive branch of execution:

- Р Р…Р Вµ Р В»Р С•Р СР В°РЎРЏ РЎвЂљР ВµР С”РЎС“РЎвЂ°Р С‘Р Вµ `v1` workflow-РЎвЂћР В°Р в„–Р В»РЎвЂ№;
- Р Р…Р Вµ Р С—Р ВµРЎР‚Р ВµРЎвЂљР С‘РЎР‚Р В°РЎРЏ РЎРѓРЎС“РЎвЂ°Р ВµРЎРѓРЎвЂљР Р†РЎС“РЎР‹РЎвЂ°Р С‘Р Вµ workflow Р Р…Р В° РЎС“Р Т‘Р В°Р В»РЎвЂР Р…Р Р…Р С•Р С `n8n` Р С‘Р Р…РЎРѓРЎвЂљР В°Р Р…РЎРѓР Вµ;
- Р Р…Р Вµ РЎРѓР СР ВµРЎв‚¬Р С‘Р Р†Р В°РЎРЏ `v1` evidence Р С‘ `v2` evidence;
- РЎРѓР С•РЎвЂ¦РЎР‚Р В°Р Р…РЎРЏРЎРЏ Р Р†Р С•Р В·Р СР С•Р В¶Р Р…Р С•РЎРѓРЎвЂљРЎРЉ Р С•РЎвЂљР С”Р В°РЎвЂљР В° Р Р…Р В° Р В»РЎР‹Р В±Р С•Р в„– РЎРѓРЎвЂљР В°Р Т‘Р С‘Р С‘.

## Р ВРЎРѓРЎвЂ¦Р С•Р Т‘Р Р…Р С•Р Вµ РЎРѓР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘Р Вµ

### Р В§РЎвЂљР С• РЎРѓРЎвЂЎР С‘РЎвЂљР В°Р ВµРЎвЂљРЎРѓРЎРЏ Р В·Р В°Р СР С•РЎР‚Р С•Р В¶Р ВµР Р…Р Р…РЎвЂ№Р С baseline

Р вЂєР С•Р С”Р В°Р В»РЎРЉР Р…РЎвЂ№Р Вµ `v1` workflow:

- [00_chatwoot_webhook_capture.json](F:\project\Lilith\workflows\00_chatwoot_webhook_capture.json)
- [01_inbound_echo.json](F:\project\Lilith\workflows\01_inbound_echo.json)
- [02_dedup_guardrails.json](F:\project\Lilith\workflows\02_dedup_guardrails.json)
- [03_llm_dialog_no_rag.json](F:\project\Lilith\workflows\03_llm_dialog_no_rag.json)
- [04_handoff.json](F:\project\Lilith\workflows\04_handoff.json)
- [05_site_snapshot_ingestion.json](F:\project\Lilith\workflows\05_site_snapshot_ingestion.json)
- [06_rag_answer.json](F:\project\Lilith\workflows\06_rag_answer.json)
- [07_sales_state_machine.json](F:\project\Lilith\workflows\07_sales_state_machine.json)
- [08_lead_capture.json](F:\project\Lilith\workflows\08_lead_capture.json)
- [09_lead_write.json](F:\project\Lilith\workflows\09_lead_write.json)
- [10_observability.json](F:\project\Lilith\workflows\10_observability.json)

Р РЋРЎС“РЎвЂ°Р ВµРЎРѓРЎвЂљР Р†РЎС“РЎР‹РЎвЂ°Р С‘Р Вµ `phase-*` checklist РЎРѓРЎвЂЎР С‘РЎвЂљР В°РЎР‹РЎвЂљРЎРѓРЎРЏ `v1 baseline evidence set`.

### Р В§РЎвЂљР С• РЎРѓРЎвЂљРЎР‚Р С•Р С‘РЎвЂљРЎРѓРЎРЏ Р В·Р В°Р Р…Р С•Р Р†Р С•

Р СњР С•Р Р†Р В°РЎРЏ `v2` phase map:

- `WF-00 Baseline Freeze`
- `WF-01 Ingress Safety Shell`
- `WF-02 Agent Core Baseline`
- `WF-03 Memory Backbone`
- `WF-04 Handoff Gate`
- `WF-05 Retrieval Tools`
- `WF-06 Grounded Agent Answers`
- `WF-07 Sales Governance Layer`
- `WF-08 Agent-Assisted Lead Capture`
- `WF-09 Lead Write Gateway`
- `WF-10 Observability, Evals, Pilot`

Р ВРЎРѓРЎвЂљР С•РЎвЂЎР Р…Р С‘Р С” Р С‘РЎРѓРЎвЂљР С‘Р Р…РЎвЂ№: [03-workflow-phases.md](F:\project\Lilith\docs\03-workflow-phases.md)

## Naming Р С‘ versioning policy

### Р вЂєР С•Р С”Р В°Р В»РЎРЉР Р…РЎвЂ№Р Вµ РЎвЂћР В°Р в„–Р В»РЎвЂ№

`v1` РЎвЂћР В°Р в„–Р В»РЎвЂ№ Р Р…Р Вµ Р С—Р ВµРЎР‚Р ВµР С‘Р СР ВµР Р…Р С•Р Р†РЎвЂ№Р Р†Р В°РЎР‹РЎвЂљРЎРѓРЎРЏ Р С‘ Р Р…Р Вµ РЎС“Р Т‘Р В°Р В»РЎРЏРЎР‹РЎвЂљРЎРѓРЎРЏ.

Р СњР С•Р Р†РЎвЂ№Р Вµ `v2` runtime workflow РЎРѓР С•Р В·Р Т‘Р В°РЎР‹РЎвЂљРЎРѓРЎРЏ Р С•РЎвЂљР Т‘Р ВµР В»РЎРЉР Р…Р С• Р Р† [workflows](F:\project\Lilith\workflows) РЎРѓ Р С—РЎР‚Р ВµРЎвЂћР С‘Р С”РЎРѓР С•Р С:

- `v2_00_baseline_freeze.json`
- `v2_01_ingress_safety_shell.json`
- `v2_02_agent_core_baseline.json`
- ...

Р СњР С•Р Р†РЎвЂ№Р Вµ `v2` checklist РЎРѓР С•Р В·Р Т‘Р В°РЎР‹РЎвЂљРЎРѓРЎРЏ Р С•РЎвЂљР Т‘Р ВµР В»РЎРЉР Р…Р С• Р Р† [ops/checklists](F:\project\Lilith\ops\checklists) РЎРѓ Р С—РЎР‚Р ВµРЎвЂћР С‘Р С”РЎРѓР С•Р С:

- `v2-wf-00-baseline-freeze-checklist.md`
- `v2-wf-01-ingress-safety-shell-checklist.md`
- `v2-wf-02-agent-core-baseline-checklist.md`
- ...

### Р Р€Р Т‘Р В°Р В»РЎвЂР Р…Р Р…РЎвЂ№Р в„– n8n

Р РЋРЎС“РЎвЂ°Р ВµРЎРѓРЎвЂљР Р†РЎС“РЎР‹РЎвЂ°Р С‘Р Вµ `v1` workflow Р Р…Р В° Р С‘Р Р…РЎРѓРЎвЂљР В°Р Р…РЎРѓР Вµ Р Р…Р Вµ Р С•Р В±Р Р…Р С•Р Р†Р В»РЎРЏРЎР‹РЎвЂљРЎРѓРЎРЏ Р С‘ Р Р…Р Вµ Р С—Р ВµРЎР‚Р ВµР С‘Р СР ВµР Р…Р С•Р Р†РЎвЂ№Р Р†Р В°РЎР‹РЎвЂљРЎРѓРЎРЏ.

Р СњР С•Р Р†РЎвЂ№Р Вµ workflow Р С—РЎС“Р В±Р В»Р С‘Р С”РЎС“РЎР‹РЎвЂљРЎРѓРЎРЏ Р С”Р В°Р С” Р С•РЎвЂљР Т‘Р ВµР В»РЎРЉР Р…РЎвЂ№Р Вµ РЎРѓРЎС“РЎвЂ°Р Р…Р С•РЎРѓРЎвЂљР С‘ РЎРѓ Р С‘Р СР ВµР Р…Р В°Р СР С‘ Р Р†Р С‘Р Т‘Р В°:

- `Lilith DEV V2 - 00 Baseline Freeze`
- `Lilith DEV V2 - 01 Ingress Safety Shell`
- `Lilith DEV V2 - 02 Agent Core Baseline`

### Endpoint policy

`v1` webhook endpoints Р Р…Р Вµ РЎвЂљРЎР‚Р С•Р С–Р В°РЎР‹РЎвЂљРЎРѓРЎРЏ.

Р вЂќР В»РЎРЏ `v2` Р С‘РЎРѓР С—Р С•Р В»РЎРЉР В·РЎС“РЎР‹РЎвЂљРЎРѓРЎРЏ Р Р…Р С•Р Р†РЎвЂ№Р Вµ path-Р С—РЎР‚Р ВµРЎвЂћР С‘Р С”РЎРѓРЎвЂ№:

- `/webhook/dev/v2/...`
- `/webhook-test/dev/v2/...` Р С—РЎР‚Р С‘ Р Р…Р В°Р В»Р С‘РЎвЂЎР С‘Р С‘ test-path РЎРѓРЎвЂ Р ВµР Р…Р В°РЎР‚Р С‘РЎРЏ

Р вЂ”Р В°Р С—РЎР‚Р ВµРЎвЂ°Р ВµР Р…Р С• Р С—Р ВµРЎР‚Р ВµР С‘РЎРѓР С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљРЎРЉ `v1` paths Р С—Р С•Р Т‘ Р Р…Р С•Р Р†РЎвЂ№Р в„– runtime.

## Contract compatibility rule

### Р В§РЎвЂљР С• Р СР С•Р В¶Р Р…Р С• Р С—Р ВµРЎР‚Р ВµР С‘РЎРѓР С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљРЎРЉ

Р вЂР ВµР В· Р В»Р С•Р СР С”Р С‘ baseline Р Т‘Р С•Р С—РЎС“РЎРѓР С”Р В°Р ВµРЎвЂљРЎРѓРЎРЏ reuse:

- `inbound-message-normalized`
- `dedup-record`
- representative Chatwoot raw samples
- correlation / trace discipline

### Р В§РЎвЂљР С• Р Т‘Р С•Р В»Р В¶Р Р…Р С• Р С—Р С•РЎРЏР Р†Р С‘РЎвЂљРЎРЉРЎРѓРЎРЏ Р С•РЎвЂљР Т‘Р ВµР В»РЎРЉР Р…Р С•

Р вЂќР В»РЎРЏ `v2` Р Т‘Р С•Р В»Р В¶Р Р…РЎвЂ№ Р В±РЎвЂ№РЎвЂљРЎРЉ Р Р†Р Р†Р ВµР Т‘Р ВµР Р…РЎвЂ№ Р С•РЎвЂљР Т‘Р ВµР В»РЎРЉР Р…РЎвЂ№Р Вµ contract artifacts:

- `agent-input-envelope`
- `agent-decision-envelope`
- `agent-tool-trace`
- `memory-turn-record`
- `approval-outcome`
- `lead-write-request`
- `lead-write-result`

`v1` `llm-decision-envelope` Р Р…Р Вµ Р Т‘Р С•Р В»Р В¶Р ВµР Р… silently Р СРЎС“РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ Р Р† `v2`-Р В°Р С–Р ВµР Р…РЎвЂљР Р…РЎвЂ№Р в„– Р С”Р С•Р Р…РЎвЂљРЎР‚Р В°Р С”РЎвЂљ.

## Phase sequencing

### Wave 1

1. `WF-00 Baseline Freeze`
2. `WF-01 Ingress Safety Shell`
3. `WF-02 Agent Core Baseline`

Wave 1 РІР‚вЂќ Р СР С‘Р Р…Р С‘Р СР В°Р В»РЎРЉР Р…Р С• Р Т‘Р С•РЎРѓРЎвЂљР В°РЎвЂљР С•РЎвЂЎР Р…РЎвЂ№Р в„– `v2` runtime skeleton.

### Wave 2

4. `WF-03 Memory Backbone`
5. `WF-04 Handoff Gate`
6. `WF-05 Retrieval Tools`
7. `WF-06 Grounded Agent Answers`

### Wave 3

8. `WF-07 Sales Governance Layer`
9. `WF-08 Agent-Assisted Lead Capture`
10. `WF-09 Lead Write Gateway`
11. `WF-10 Observability, Evals, Pilot`

## Р В Р ВµР В°Р В»Р С‘Р В·Р В°РЎвЂ Р С‘Р С•Р Р…Р Р…РЎвЂ№Р в„– Р С—Р С•РЎР‚РЎРЏР Т‘Р С•Р С” Р Т‘Р В»РЎРЏ Р С—Р ВµРЎР‚Р Р†Р С•Р в„– Р Р†Р С•Р В»Р Р…РЎвЂ№

### WF-00 Baseline Freeze

Р В¦Р ВµР В»РЎРЉ:

- РЎРЏР Р†Р Р…Р С• Р В·Р В°РЎвЂћР С‘Р С”РЎРѓР С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ, РЎвЂЎРЎвЂљР С• `v1` runtime Р В·Р В°Р СР С•РЎР‚Р С•Р В¶Р ВµР Р…;
- РЎРѓР С•Р В±РЎР‚Р В°РЎвЂљРЎРЉ inventory РЎС“Р Т‘Р В°Р В»РЎвЂР Р…Р Р…РЎвЂ№РЎвЂ¦ `v1` workflow ids, names, paths Р С‘ credentials bindings;
- Р С•РЎвЂљР Т‘Р ВµР В»Р С‘РЎвЂљРЎРЉ `v1 evidence` Р С•РЎвЂљ Р В±РЎС“Р Т‘РЎС“РЎвЂ°Р ВµР С–Р С• `v2 evidence`.

Р С’РЎР‚РЎвЂљР ВµРЎвЂћР В°Р С”РЎвЂљРЎвЂ№:

- `v2-wf-00-baseline-freeze-checklist.md`
- `v1 runtime inventory`
- `v2 rollout inventory`

### WF-01 Ingress Safety Shell

Р В¦Р ВµР В»РЎРЉ:

- Р С—Р ВµРЎР‚Р ВµРЎРѓР С•Р В±РЎР‚Р В°РЎвЂљРЎРЉ `Chatwoot -> ingress -> dedup -> suppress -> normalized handoff to agent core`
- Р Р…Р Вµ Р Р†Р Р…Р ВµР Т‘РЎР‚РЎРЏРЎРЏ Р ВµРЎвЂ°РЎвЂ memory/retrieval/handoff publication/lead write

Р С’РЎР‚РЎвЂљР ВµРЎвЂћР В°Р С”РЎвЂљРЎвЂ№:

- `v2_01_ingress_safety_shell.json`
- `v2` Chatwoot representative payload set
- tests Р Р…Р В° dedup / anti-loop / ingress normalization

### WF-02 Agent Core Baseline

Р В¦Р ВµР В»РЎРЉ:

- Р С—Р С•Р Т‘Р С”Р В»РЎР‹РЎвЂЎР С‘РЎвЂљРЎРЉ `AI Agent` Р С”Р В°Р С” bounded reasoning core;
- Р С•РЎвЂљР Т‘Р ВµР В»Р С‘РЎвЂљРЎРЉ agent-owned decision Р С•РЎвЂљ workflow-owned external actions;
- Р Р†Р ВµРЎР‚Р Р…РЎС“РЎвЂљРЎРЉ agent decision Р Р† explicit decision gate.

Р С’РЎР‚РЎвЂљР ВµРЎвЂћР В°Р С”РЎвЂљРЎвЂ№:

- `v2_02_agent_core_baseline.json`
- first `agent-decision-envelope` evidence
- controlled fallback evidence

## Р В Р С‘РЎРѓР С”Р С‘

### Risk 1 РІР‚вЂќ РЎРѓР СР ВµРЎв‚¬Р ВµР Р…Р С‘Р Вµ v1 Р С‘ v2 runtime

Р РЋР С‘Р СР С—РЎвЂљР С•Р С:

- Р С•Р Т‘Р С‘Р Р… Р С‘ РЎвЂљР С•РЎвЂљ Р В¶Р Вµ webhook path;
- Р С•Р Т‘Р С‘Р Р… Р С‘ РЎвЂљР С•РЎвЂљ Р В¶Р Вµ remote workflow Р С•Р В±Р Р…Р С•Р Р†Р В»РЎРЏР ВµРЎвЂљРЎРѓРЎРЏ Р С—Р С•Р Т‘ Р Р…Р С•Р Р†РЎС“РЎР‹ Р В»Р С•Р С–Р С‘Р С”РЎС“;
- evidence Р С—Р ВµРЎР‚Р ВµРЎРѓРЎвЂљР В°РЎвЂРЎвЂљ Р В±РЎвЂ№РЎвЂљРЎРЉ Р С‘Р Р…РЎвЂљР ВµРЎР‚Р С—РЎР‚Р ВµРЎвЂљР С‘РЎР‚РЎС“Р ВµР СРЎвЂ№Р С.

Mitigation:

- Р С•РЎвЂљР Т‘Р ВµР В»РЎРЉР Р…РЎвЂ№Р Вµ РЎвЂћР В°Р в„–Р В»РЎвЂ№;
- Р С•РЎвЂљР Т‘Р ВµР В»РЎРЉР Р…РЎвЂ№Р Вµ remote workflow names;
- Р С•РЎвЂљР Т‘Р ВµР В»РЎРЉР Р…РЎвЂ№Р Вµ webhook paths;
- Р С•РЎвЂљР Т‘Р ВµР В»РЎРЉР Р…РЎвЂ№Р Вµ checklist/evidence sets.

### Risk 2 РІР‚вЂќ silent contract drift

Р РЋР С‘Р СР С—РЎвЂљР С•Р С:

- `v1` contracts Р Р…Р В°РЎвЂЎР С‘Р Р…Р В°РЎР‹РЎвЂљ Р С—РЎР‚Р В°Р Р†Р С‘РЎвЂљРЎРЉРЎРѓРЎРЏ Р С—Р С•Р Т‘ `v2` Р В±Р ВµР В· РЎРЏР Р†Р Р…Р С•Р С–Р С• split.

Mitigation:

- `keep / adapt / replace / split` Р С—Р С•Р В»Р С‘РЎвЂљР С‘Р С”Р В° Р С‘Р В· [11-contracts-overview.md](F:\project\Lilith\docs\11-contracts-overview.md);
- Р В»РЎР‹Р В±РЎвЂ№Р Вµ Р Р…Р С•Р Р†РЎвЂ№Р Вµ `agent-*` contracts РЎРѓР С•Р В·Р Т‘Р В°РЎР‹РЎвЂљРЎРѓРЎРЏ Р С•РЎвЂљР Т‘Р ВµР В»РЎРЉР Р…Р С•.

### Risk 3 РІР‚вЂќ agent Р В·Р В°РЎвЂ¦Р Р†Р В°РЎвЂљР С‘РЎвЂљ ownership Р Р…Р В°Р Т‘ Р Р†Р Р…Р ВµРЎв‚¬Р Р…Р С‘Р СР С‘ Р Т‘Р ВµР в„–РЎРѓРЎвЂљР Р†Р С‘РЎРЏР СР С‘

Р РЋР С‘Р СР С—РЎвЂљР С•Р С:

- handoff, lead write Р С‘Р В»Р С‘ inbound safety Р Р…Р В°РЎвЂЎР С‘Р Р…Р В°РЎР‹РЎвЂљ Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…РЎРЏРЎвЂљРЎРЉРЎРѓРЎРЏ РІР‚СљР С—Р С• РЎР‚Р ВµРЎв‚¬Р ВµР Р…Р С‘РЎР‹ Р В°Р С–Р ВµР Р…РЎвЂљР В°РІР‚Сњ, Р В° Р Р…Р Вµ Р С—Р С• explicit workflow gate.

Mitigation:

- Р В¶РЎвЂРЎРѓРЎвЂљР С”Р В°РЎРЏ boundary policy Р С‘Р В· [02-architecture.md](F:\project\Lilith\docs\02-architecture.md);
- decision card check Р С—РЎР‚Р С‘ Р Р†РЎвЂ№Р В±Р С•РЎР‚Р Вµ РЎРѓР С—Р С•РЎР‚Р Р…РЎвЂ№РЎвЂ¦ РЎРѓРЎС“РЎвЂ°Р Р…Р С•РЎРѓРЎвЂљР ВµР в„–.

### Risk 4 РІР‚вЂќ migration Р В±Р ВµР В· rollback

Р РЋР С‘Р СР С—РЎвЂљР С•Р С:

- Р Р…Р С•Р Р†РЎвЂ№Р Вµ workflow Р Р†РЎвЂ№Р С”Р В°РЎвЂљРЎвЂ№Р Р†Р В°РЎР‹РЎвЂљРЎРѓРЎРЏ, Р Р…Р С• Р Р…Р ВµР В»РЎРЉР В·РЎРЏ Р В±РЎвЂ№РЎРѓРЎвЂљРЎР‚Р С• Р Р†Р ВµРЎР‚Р Р…РЎС“РЎвЂљРЎРЉ РЎвЂљРЎР‚Р В°РЎвЂћР С‘Р С” Р Р† `v1`.

Mitigation:

- `v1` paths Р С‘ remote workflows Р Р…Р Вµ РЎвЂљРЎР‚Р С•Р С–Р В°РЎР‹РЎвЂљРЎРѓРЎРЏ;
- `v2` Р Р†Р С”Р В»РЎР‹РЎвЂЎР В°Р ВµРЎвЂљРЎРѓРЎРЏ РЎвЂљР С•Р В»РЎРЉР С”Р С• Р С—Р С•РЎРѓР В»Р Вµ Р С•РЎвЂљР Т‘Р ВµР В»РЎРЉР Р…Р С•Р С–Р С• endpoint switch.

## Test strategy

### WF-00

- inventory completeness check;
- path uniqueness check;
- remote workflow naming uniqueness check.

### WF-01

- sample payload replay;
- dedup / anti-loop regression;
- live Chatwoot ingress smoke Р С—Р С• `v2` path;
- correlation trace presence.

### WF-02

- agent response smoke;
- explicit decision envelope validation;
- fallback trace validation;
- non-reply branch safety validation.

## Rollout

1. Freeze and inventory `v1`.
2. Build local `v2` files.
3. Deploy remote `v2` workflows as additive set.
4. Validate `v2` with dedicated endpoints and isolated traces.
5. Р СћР С•Р В»РЎРЉР С”Р С• Р С—Р С•РЎРѓР В»Р Вµ РЎРЊРЎвЂљР С•Р С–Р С• РЎР‚Р ВµРЎв‚¬Р В°РЎвЂљРЎРЉ, Р В±РЎС“Р Т‘Р ВµРЎвЂљ Р В»Р С‘ Р С”Р В°Р С”Р С•Р в„–-РЎвЂљР С• РЎвЂљРЎР‚Р В°РЎвЂћР С‘Р С” Р С—Р ВµРЎР‚Р ВµР С”Р В»РЎР‹РЎвЂЎРЎвЂР Р… Р Р…Р В° `v2`.

## Rollback

Р вЂўРЎРѓР В»Р С‘ Р В»РЎР‹Р В±Р В°РЎРЏ Р С‘Р В· Р С—Р ВµРЎР‚Р Р†РЎвЂ№РЎвЂ¦ `v2` РЎвЂћР В°Р В· Р Р…Р Вµ Р С—Р С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р В¶Р Т‘Р В°Р ВµРЎвЂљРЎРѓРЎРЏ:

- `v1` Р С•РЎРѓРЎвЂљР В°РЎвЂРЎвЂљРЎРѓРЎРЏ Р ВµР Т‘Р С‘Р Р…РЎРѓРЎвЂљР Р†Р ВµР Р…Р Р…РЎвЂ№Р С РЎР‚Р В°Р В±Р С•РЎвЂЎР С‘Р С path;
- `v2` workflow Р Т‘Р ВµР В°Р С”РЎвЂљР С‘Р Р†Р С‘РЎР‚РЎС“Р ВµРЎвЂљРЎРѓРЎРЏ Р С‘Р В»Р С‘ Р С•РЎРѓРЎвЂљР В°РЎвЂРЎвЂљРЎРѓРЎРЏ isolated;
- webhook endpoints Р Р†Р С•Р В·Р Р†РЎР‚Р В°РЎвЂ°Р В°РЎР‹РЎвЂљРЎРѓРЎРЏ Р С” `v1`, Р ВµРЎРѓР В»Р С‘ Р В±РЎвЂ№Р В» switch;
- evidence РЎвЂћР С‘Р С”РЎРѓР С‘РЎР‚РЎС“Р ВµРЎвЂљРЎРѓРЎРЏ Р С”Р В°Р С” failed migration attempt, Р В° Р Р…Р Вµ РЎРѓР СР ВµРЎв‚¬Р С‘Р Р†Р В°Р ВµРЎвЂљРЎРѓРЎРЏ РЎРѓ baseline.

## Acceptance criteria Р Т‘Р В»РЎРЏ РЎРѓРЎвЂљР В°РЎР‚РЎвЂљР В° runtime migration

Р СџР ВµРЎР‚Р ВµРЎвЂ¦Р С•Р Т‘ Р С•РЎвЂљ spec work Р С” runtime migration Р СР С•Р В¶Р Р…Р С• РЎРѓРЎвЂЎР С‘РЎвЂљР В°РЎвЂљРЎРЉ Р С”Р С•РЎР‚РЎР‚Р ВµР С”РЎвЂљР Р…РЎвЂ№Р С, Р ВµРЎРѓР В»Р С‘:

1. Р Р€ `v1` Р ВµРЎРѓРЎвЂљРЎРЉ Р В·Р В°Р СР С•РЎР‚Р С•Р В¶Р ВµР Р…Р Р…РЎвЂ№Р в„– inventory.
2. Naming/versioning policy Р В·Р В°РЎвЂћР С‘Р С”РЎРѓР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р В° Р С‘ РЎРѓР С•Р В±Р В»РЎР‹Р Т‘Р В°Р ВµРЎвЂљРЎРѓРЎРЏ.
3. `v2` workflow paths Р Р…Р Вµ Р С”Р С•Р Р…РЎвЂћР В»Р С‘Р С”РЎвЂљРЎС“РЎР‹РЎвЂљ РЎРѓ `v1`.
4. `v2` contract layer Р Р†Р Р†Р С•Р Т‘Р С‘РЎвЂљРЎРѓРЎРЏ additively.
5. Р вЂќР В»РЎРЏ Р С”Р В°Р В¶Р Т‘Р С•Р в„– Р С—Р ВµРЎР‚Р Р†Р С•Р в„– `v2` РЎвЂћР В°Р В·РЎвЂ№ Р В·Р В°РЎР‚Р В°Р Р…Р ВµР Вµ Р С‘Р В·Р Р†Р ВµРЎРѓРЎвЂљР Р…РЎвЂ№ rollback Р С‘ evidence rules.
