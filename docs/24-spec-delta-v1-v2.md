# 24. Spec Delta v1 -> v2

## Р РЋРЎвЂљР В°РЎвЂљРЎС“РЎРѓ

Р В Р В°Р В±Р С•РЎвЂЎР С‘Р в„– delta-Р Т‘Р С•Р С”РЎС“Р СР ВµР Р…РЎвЂљ Р СР ВµР В¶Р Т‘РЎС“ Р В°РЎР‚РЎвЂ¦Р С‘Р Р†Р Р…РЎвЂ№Р С `v1` baseline Р С‘ Р Т‘Р ВµР в„–РЎРѓРЎвЂљР Р†РЎС“РЎР‹РЎвЂ°Р С‘Р С `v2` Р С”Р В°Р Р…Р С•Р Р…Р С•Р С.
Р СњРЎС“Р В¶Р ВµР Р…, РЎвЂЎРЎвЂљР С•Р В±РЎвЂ№ Р С—Р С•Р Р…Р С‘Р СР В°РЎвЂљРЎРЉ, РЎвЂЎРЎвЂљР С• Р С‘Р СР ВµР Р…Р Р…Р С• Р В±РЎвЂ№Р В»Р С• Р С—Р ВµРЎР‚Р ВµР С—Р С‘РЎРѓР В°Р Р…Р С•, РЎвЂЎРЎвЂљР С• Р С—Р ВµРЎР‚Р ВµР Р…Р ВµРЎРѓР ВµР Р…Р С• Р С‘ РЎвЂЎРЎвЂљР С• РЎРѓР С•РЎвЂ¦РЎР‚Р В°Р Р…РЎРЏР ВµРЎвЂљРЎРѓРЎРЏ Р В±Р ВµР В· Р В»Р С•Р СР С”Р С‘ baseline evidence.

## Executive Summary

`v2` Р Р…Р Вµ РЎРЏР Р†Р В»РЎРЏР ВµРЎвЂљРЎРѓРЎРЏ Р С”Р С•РЎРѓР СР ВµРЎвЂљР С‘РЎвЂЎР ВµРЎРѓР С”Р С•Р в„– Р С—РЎР‚Р В°Р Р†Р С”Р С•Р в„– `v1`.
Р В­РЎвЂљР С• controlled rewrite РЎРѓ РЎРѓР С•РЎвЂ¦РЎР‚Р В°Р Р…Р ВµР Р…Р С‘Р ВµР С Р Р†Р Р…Р ВµРЎв‚¬Р Р…Р ВµР С–Р С• deterministic shell Р С‘ Р С—Р ВµРЎР‚Р ВµР Р…Р С•РЎРѓР С•Р С AI-РЎРЏР Т‘РЎР‚Р В° Р Р† `agent-first` Р СР С•Р Т‘Р ВµР В»РЎРЉ.

Р вЂњР В»Р В°Р Р†Р Р…РЎвЂ№Р в„– РЎРѓР СРЎвЂ№РЎРѓР В» Р С—Р ВµРЎР‚Р ВµРЎвЂ¦Р С•Р Т‘Р В°:

- РЎРѓР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ Р Т‘Р С•Р С”Р В°Р В·Р В°Р Р…Р Р…РЎвЂ№Р в„– ingress shell Р С‘Р В· `v1`;
- РЎС“Р В±РЎР‚Р В°РЎвЂљРЎРЉ РЎС“Р В·Р С”Р С‘Р в„– `LLM as bounded text step` Р С”Р В°Р С” РЎвЂ Р ВµР Р…РЎвЂљРЎР‚Р В°Р В»РЎРЉР Р…РЎС“РЎР‹ Р СР С•Р Т‘Р ВµР В»РЎРЉ Р СРЎвЂ№РЎв‚¬Р В»Р ВµР Р…Р С‘РЎРЏ;
- Р Р†Р Р†Р ВµРЎРѓРЎвЂљР С‘ `Agent Core` РЎРѓ memory, retrieval tools Р С‘ decision gate;
- Р Р…Р Вµ Р С•РЎвЂљР Т‘Р В°Р Р†Р В°РЎвЂљРЎРЉ Р В°Р С–Р ВµР Р…РЎвЂљРЎС“ ownership Р Р…Р В°Р Т‘ Р Р†Р Р…Р ВµРЎв‚¬Р Р…Р С‘Р СР С‘ side effects.

## Delta Matrix

| Р С›Р В±Р В»Р В°РЎРѓРЎвЂљРЎРЉ | v1 | v2 | Р В Р ВµРЎв‚¬Р ВµР Р…Р С‘Р Вµ |
|---|---|---|---|
| Product framing | LLM/RAG sales bot | Agentic sales assistant system | Р СџР ВµРЎР‚Р ВµР С—Р С‘РЎРѓР В°РЎвЂљРЎРЉ |
| Core AI model | `LLM -> decision envelope` | `AI Agent -> agent decision envelope` | Р СџР ВµРЎР‚Р ВµР С—Р С‘РЎРѓР В°РЎвЂљРЎРЉ |
| Safety shell | Р Р‡Р Р†Р Р…РЎвЂ№Р в„– ingress/dedup/handoff/write shell | Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…РЎРЏР ВµРЎвЂљРЎРѓРЎРЏ | Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ Р С‘ Р С—Р ВµРЎР‚Р ВµР С‘РЎРѓР С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљРЎРЉ |
| Memory | Р СњР Вµ first-class, state-centric | First-class capability | Р вЂќР С•Р В±Р В°Р Р†Р С‘РЎвЂљРЎРЉ Р Р…Р С•Р Р†РЎвЂ№Р в„– РЎРѓР В»Р С•Р в„– |
| Retrieval | Р С›РЎвЂљР Т‘Р ВµР В»РЎРЉР Р…РЎвЂ№Р в„– deterministic RAG step | Bounded tool capability Р В°Р С–Р ВµР Р…РЎвЂљР В° | Р СџР ВµРЎР‚Р ВµР С—Р С‘РЎРѓР В°РЎвЂљРЎРЉ |
| Handoff | Р Р‡Р Р†Р Р…Р В°РЎРЏ РЎвЂћР В°Р В·Р В° Р С—Р С•РЎРѓР В»Р Вµ LLM | Explicit gate Р С—Р С•Р Р†Р ВµРЎР‚РЎвЂ¦ agent recommendation | Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ Р С—РЎР‚Р С‘Р Р…РЎвЂ Р С‘Р С—, Р С—Р ВµРЎР‚Р ВµР С—Р С‘РЎРѓР В°РЎвЂљРЎРЉ РЎР‚Р ВµР В°Р В»Р С‘Р В·Р В°РЎвЂ Р С‘РЎР‹ |
| Lead write | Р Р‡Р Р†Р Р…РЎвЂ№Р в„– deterministic write | Р Р‡Р Р†Р Р…РЎвЂ№Р в„– deterministic write gateway | Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ Р С—РЎР‚Р С‘Р Р…РЎвЂ Р С‘Р С—, Р В°Р Т‘Р В°Р С—РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ Р С”Р С•Р Р…РЎвЂљРЎР‚Р В°Р С”РЎвЂљ |
| Observability | Correlation + phase traces | Correlation + agent/tool/memory/approval traces | Р В Р В°РЎРѓРЎв‚¬Р С‘РЎР‚Р С‘РЎвЂљРЎРЉ |
| Phase map | `WF-01..WF-10` linear deterministic build-up | `WF-00..WF-10` controlled agentic build-up | Р СџР ВµРЎР‚Р ВµР С—Р С‘РЎРѓР В°РЎвЂљРЎРЉ |
| Acceptance philosophy | Р СџРЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р В° pipeline layers | Р СџРЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р В° product + safety + observability + migration compatibility | Р СџР ВµРЎР‚Р ВµР С—Р С‘РЎРѓР В°РЎвЂљРЎРЉ |

## Р В§РЎвЂљР С• Р СР С•Р В¶Р Р…Р С• РЎРѓР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ Р В±Р ВµР В· Р В»Р С•Р СР С”Р С‘ baseline

### Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ Р С”Р В°Р С” Р ВµРЎРѓРЎвЂљРЎРЉ Р С‘Р В»Р С‘ Р С—Р С•РЎвЂЎРЎвЂљР С‘ Р С”Р В°Р С” Р ВµРЎРѓРЎвЂљРЎРЉ

- Chatwoot Р С”Р В°Р С” Р ВµР Т‘Р С‘Р Р…РЎвЂ№Р в„– Р С”Р В°Р Р…Р В°Р В»Р С•Р Р†РЎвЂ№Р в„– РЎвЂћР В°РЎРѓР В°Р Т‘.
- n8n Р С”Р В°Р С” РЎРѓР В»Р С•Р в„– Р С•РЎР‚Р С”Р ВµРЎРѓРЎвЂљРЎР‚Р В°РЎвЂ Р С‘Р С‘.
- Р вЂ”Р В°Р С—РЎР‚Р ВµРЎвЂљ `Code / Function / Function Item`.
- Dedup / anti-loop Р С”Р В°Р С” Р Р†Р Р…Р ВµРЎв‚¬Р Р…Р С‘Р в„– deterministic safety shell.
- Handoff Р С”Р В°Р С” first-class feature.
- Lead write Р С”Р В°Р С” explicit idempotent gateway.
- Evidence-first delivery Р С‘ acceptance discipline.
- Р В Р ВµР В°Р В»РЎРЉР Р…РЎвЂ№Р в„– Chatwoot upstream contract Р С‘Р В· [15-chatwoot-real-contract.md](F:\project\Lilith\docs\15-chatwoot-real-contract.md).

### Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ, Р Р…Р С• Р С—Р ВµРЎР‚Р ВµР С—Р С‘РЎРѓР В°РЎвЂљРЎРЉ РЎвЂћР С•РЎР‚Р СРЎС“Р В»Р С‘РЎР‚Р С•Р Р†Р С”РЎС“

- Sales policy: Р С‘Р В· deterministic scripted flow Р Р† governed agent behavior.
- RAG policy: Р С‘Р В· Р С•РЎвЂљР Т‘Р ВµР В»РЎРЉР Р…Р С•Р С–Р С• РЎРЊРЎвЂљР В°Р С—Р В° Р Р† bounded retrieval-tool strategy.
- Observability: Р С‘Р В· phase trace Р Р† agent-aware trace.
- Acceptance criteria: Р С‘Р В· pipeline acceptance Р Р† system acceptance.

## Р В§РЎвЂљР С• Р Р…РЎС“Р В¶Р Р…Р С• Р С—Р ВµРЎР‚Р ВµР С—Р С‘РЎРѓР В°РЎвЂљРЎРЉ РЎвЂћРЎС“Р Р…Р Т‘Р В°Р СР ВµР Р…РЎвЂљР В°Р В»РЎРЉР Р…Р С•

### Р С’РЎР‚РЎвЂ¦Р С‘РЎвЂљР ВµР С”РЎвЂљРЎС“РЎР‚Р Р…РЎвЂ№Р в„– РЎРѓР В»Р С•Р в„–

- [02-architecture.md](F:\project\Lilith\docs\02-architecture.md)
- [03-workflow-phases.md](F:\project\Lilith\docs\03-workflow-phases.md)
- [11-contracts-overview.md](F:\project\Lilith\docs\11-contracts-overview.md)
- [09-acceptance-criteria.md](F:\project\Lilith\docs\09-acceptance-criteria.md)

### Р СџР С•Р В»Р С‘РЎвЂљР С‘Р С”Р С‘

- [04-sales-policy.md](F:\project\Lilith\docs\04-sales-policy.md)
- [05-handoff-policy.md](F:\project\Lilith\docs\05-handoff-policy.md)
- [06-rag-policy.md](F:\project\Lilith\docs\06-rag-policy.md)
- [07-lead-policy.md](F:\project\Lilith\docs\07-lead-policy.md)
- [08-observability.md](F:\project\Lilith\docs\08-observability.md)

## Contract Delta

| V1 contract | V2 status | Р В Р ВµРЎв‚¬Р ВµР Р…Р С‘Р Вµ |
|---|---|---|
| `inbound-message-normalized` | `keep` | Р С›РЎРѓРЎвЂљР В°РЎвЂРЎвЂљРЎРѓРЎРЏ ingress-shell Р С”Р С•Р Р…РЎвЂљРЎР‚Р В°Р С”РЎвЂљР С•Р С |
| `dedup-record` | `keep` | Р С›РЎРѓРЎвЂљР В°РЎвЂРЎвЂљРЎРѓРЎРЏ outer safety contract |
| `conversation-state` | `split/rewrite` | Р РЋР В»Р С‘РЎв‚¬Р С”Р С•Р С v1-centric; РЎР‚Р В°Р В·Р Т‘Р ВµР В»Р С‘РЎвЂљРЎРЉ Р Р…Р В° governance state Р С‘ memory-facing records |
| `knowledge-chunk` | `keep` | Р С›РЎРѓРЎвЂљР В°РЎвЂРЎвЂљРЎРѓРЎРЏ knowledge ingestion contract |
| `retrieval-result` | `adapt` | Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ РЎРѓР СРЎвЂ№РЎРѓР В», Р Р…Р С• Р С—Р С•Р Т‘ retrieval tool path Р С‘ quality signal |
| `llm-decision-envelope` | `replace` | Р вЂ”Р В°Р СР ВµР Р…Р С‘РЎвЂљРЎРЉ Р Р…Р В° `agent-decision-envelope` |
| `lead-payload` | `adapt` | Р ВРЎРѓР С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљРЎРЉ Р С”Р В°Р С” РЎРЏР Т‘РЎР‚Р С• payload Р Р†Р Р…РЎС“РЎвЂљРЎР‚Р С‘ `lead-write-request` Р С‘Р В»Р С‘ РЎРѓР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ Р С”Р В°Р С” nested payload contract |
| `lead-target-api-response` | `adapt/rename` | Р СџР ВµРЎР‚Р ВµР в„–РЎвЂљР С‘ Р С” `lead-write-result` |
| `handoff-summary` | `adapt/rename` | Р СџР ВµРЎР‚Р ВµР в„–РЎвЂљР С‘ Р С” `handoff-summary-v2` |

## Proposed v2 Contract Set

### Р СњР С•Р Р†РЎвЂ№Р Вµ Р С•Р В±РЎРЏР В·Р В°РЎвЂљР ВµР В»РЎРЉР Р…РЎвЂ№Р Вµ

- `agent-input-envelope`
- `agent-decision-envelope`
- `agent-tool-trace`
- `memory-turn-record`
- `approval-outcome`
- `handoff-summary-v2`
- `lead-write-request`
- `lead-write-result`

### Р СџР ВµРЎР‚Р ВµР Р…Р С•РЎРѓР С‘Р СРЎвЂ№Р Вµ Р С‘Р В· v1

- `inbound-message-normalized`
- `dedup-record`
- `knowledge-chunk`
- `retrieval-result` РЎРѓ Р В°Р Т‘Р В°Р С—РЎвЂљР В°РЎвЂ Р С‘Р ВµР в„–

## Acceptance Delta

| Р СћР ВµР С”РЎС“РЎвЂ°Р С‘Р в„– acceptance Р В±Р В»Р С•Р С” | Р РЋРЎвЂљР В°РЎвЂљРЎС“РЎРѓ Р Р† v2 | Р вЂќР ВµР в„–РЎРѓРЎвЂљР Р†Р С‘Р Вµ |
|---|---|---|
| Integration contour | `keep-with-rewrite` | Р СџР ВµРЎР‚Р ВµР С—Р С‘РЎРѓР В°РЎвЂљРЎРЉ Р С”Р В°Р С” `ingress shell + agent core + decision gate` |
| Guardrails | `keep` | Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ Р С—Р С•РЎвЂЎРЎвЂљР С‘ Р В±Р ВµР В· Р С‘Р В·Р СР ВµР Р…Р ВµР Р…Р С‘Р в„– |
| LLM without RAG | `replace` | Р вЂ”Р В°Р СР ВµР Р…Р С‘РЎвЂљРЎРЉ Р Р…Р В° `Agent Core Baseline` |
| RAG | `rewrite` | Р В Р В°Р В·Р Т‘Р ВµР В»Р С‘РЎвЂљРЎРЉ Р Р…Р В° `Retrieval Tools` Р С‘ `Grounded Agent Answers` |
| Sales flow | `rewrite` | Р СџР ВµРЎР‚Р ВµРЎвЂћР С•РЎР‚Р СРЎС“Р В»Р С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ Р С”Р В°Р С” `Sales Governance Layer` |
| Handoff | `keep-with-rewrite` | Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ РЎРЏР Р†Р Р…Р С•РЎРѓРЎвЂљРЎРЉ, Р Т‘Р С•Р В±Р В°Р Р†Р С‘РЎвЂљРЎРЉ `agent recommendation + explicit gate` |
| Lead capture and write | `split/rewrite` | Р В Р В°Р В·Р Т‘Р ВµР В»Р С‘РЎвЂљРЎРЉ Р Р…Р В° `Agent-Assisted Lead Capture` Р С‘ `Lead Write Gateway` |
| Architectural discipline | `expand` | Р вЂќР С•Р В±Р В°Р Р†Р С‘РЎвЂљРЎРЉ agent/tool/memory/approval observability |

## Р В§РЎвЂљР С• Р С—Р ВµРЎР‚Р ВµР С—Р С‘РЎРѓРЎвЂ№Р Р†Р В°РЎвЂљРЎРЉ Р Р† Р С—Р ВµРЎР‚Р Р†РЎС“РЎР‹ Р С•РЎвЂЎР ВµРЎР‚Р ВµР Т‘РЎРЉ

1. [09-acceptance-criteria.md](F:\project\Lilith\docs\09-acceptance-criteria.md)
2. [11-contracts-overview.md](F:\project\Lilith\docs\11-contracts-overview.md)
3. [02-architecture.md](F:\project\Lilith\docs\02-architecture.md)
4. [03-workflow-phases.md](F:\project\Lilith\docs\03-workflow-phases.md)
5. Р СџР С•Р В»Р С‘РЎвЂљР С‘Р С”Р С‘ [04-sales-policy.md](F:\project\Lilith\docs\04-sales-policy.md) ... [08-observability.md](F:\project\Lilith\docs\08-observability.md)

## Р В§РЎвЂљР С• Р Р…Р Вµ РЎвЂљРЎР‚Р С•Р С–Р В°Р ВµР С Р Т‘Р С• РЎС“РЎвЂљР Р†Р ВµРЎР‚Р В¶Р Т‘Р ВµР Р…Р С‘РЎРЏ v2

- live v1 baseline workflows;
- v1 evidence Р С‘ delivery history;
- v1 checklists Р С”Р В°Р С” Р Т‘Р С•Р С”Р В°Р В·Р В°Р Р…Р Р…РЎвЂ№Р в„– baseline;
- historical bootstrap docs.

## Р СџРЎР‚Р В°Р С”РЎвЂљР С‘РЎвЂЎР ВµРЎРѓР С”Р С‘Р в„– Р Р†РЎвЂ№Р Р†Р С•Р Т‘

`v2` Р Р…Р Вµ РЎвЂљРЎР‚Р ВµР В±РЎС“Р ВµРЎвЂљ Р В»Р С•Р СР В°РЎвЂљРЎРЉ Р Т‘Р С•Р С”Р В°Р В·Р В°Р Р…Р Р…РЎвЂ№Р в„– baseline ingress shell.
Р С›Р Р… РЎвЂљРЎР‚Р ВµР В±РЎС“Р ВµРЎвЂљ:

- Р В·Р В°Р СР ВµР Р…Р С‘РЎвЂљРЎРЉ AI-РЎРѓР В»Р С•Р в„–;
- РЎР‚Р В°РЎРѓРЎв‚¬Р С‘РЎР‚Р С‘РЎвЂљРЎРЉ observability;
- Р С—Р ВµРЎР‚Р ВµР С—Р С‘РЎРѓР В°РЎвЂљРЎРЉ РЎвЂћР В°Р В·Р С•Р Р†РЎС“РЎР‹ Р С”Р В°РЎР‚РЎвЂљРЎС“;
- Р Р†Р Р†Р ВµРЎРѓРЎвЂљР С‘ migration-aware contract layer;
- Р С—Р ВµРЎР‚Р ВµР С•Р С—РЎР‚Р ВµР Т‘Р ВµР В»Р С‘РЎвЂљРЎРЉ acceptance Р Р…Р Вµ Р С”Р В°Р С” Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”РЎС“ РЎС“Р В·Р С”Р С•Р С–Р С• pipeline, Р В° Р С”Р В°Р С” Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”РЎС“ РЎС“Р С—РЎР‚Р В°Р Р†Р В»РЎРЏР ВµР СР С•Р в„– agentic РЎРѓР С‘РЎРѓРЎвЂљР ВµР СРЎвЂ№.
