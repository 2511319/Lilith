# 21. Decision Card РІР‚вЂќ AI Root Node for Lilith v2.0

## Decision Card

**Decision ID:** `DC-20260320-ai-root-node-v2`
**Р С™Р С•Р Р…РЎвЂљР ВµР С”РЎРѓРЎвЂљ / РЎвЂћР В°Р В·Р В°:** `master-spec v2.0 / AI layer redesign`
**Р вЂ”Р В°Р Т‘Р В°РЎвЂЎР В°:** Р Р†РЎвЂ№Р В±РЎР‚Р В°РЎвЂљРЎРЉ Р С”Р С•РЎР‚Р Р…Р ВµР Р†РЎС“РЎР‹ AI-РЎРѓРЎС“РЎвЂ°Р Р…Р С•РЎРѓРЎвЂљРЎРЉ Р Т‘Р В»РЎРЏ Lilith v2.0 Р С—Р С•Р Т‘ agent-first Р Р…Р В°Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘Р Вµ
**Р В§РЎвЂљР С• Р Р†РЎвЂ№Р В±Р С‘РЎР‚Р В°Р ВµР С:** `Basic LLM Chain vs AI Agent vs OpenAI App Node`
**Р С™Р В°Р Р…Р Т‘Р С‘Р Т‘Р В°РЎвЂљРЎвЂ№:** `Basic LLM Chain`, `AI Agent`, `OpenAI App Node`
**Р ВРЎРѓРЎвЂљР С•РЎвЂЎР Р…Р С‘Р С” Р С‘РЎРѓРЎвЂљР С‘Р Р…РЎвЂ№:** РЎвЂљР ВµР С”РЎС“РЎвЂ°Р С‘Р в„– `master-spec.md`, [17-architecture-direction-adr.md](F:\project\Lilith\docs\17-architecture-direction-adr.md), [18-agent-first-revision-plan.md](F:\project\Lilith\docs\18-agent-first-revision-plan.md), [19-node-selection-principle.md](F:\project\Lilith\docs\19-node-selection-principle.md)
**Р вЂќР В°РЎвЂљР В°:** `2026-03-20`
**Mode:** `Full`

## 1. Product Role

| Р СџР С•Р В»Р Вµ | Р вЂ”Р Р…Р В°РЎвЂЎР ВµР Р…Р С‘Р Вµ |
|---|---|
| Product role | Р С”Р С•РЎР‚Р Р…Р ВµР Р†Р С•Р в„– AI reasoning/orchestration РЎРѓР В»Р С•Р в„– Р С—РЎР‚Р С•Р Т‘РЎС“Р С”РЎвЂљР В° |
| Owner of responsibility | bounded AI-module Р Р†Р Р…РЎС“РЎвЂљРЎР‚Р С‘ n8n |
| External boundary affected | reasoning, memory, retrieval, handoff recommendation, tool-use |
| Criticality | `high` |
| Assumptions / SPEC_GAP | Р С—РЎР‚Р ВµР Т‘Р С—Р С•Р В»Р В°Р С–Р В°Р ВµРЎвЂљРЎРѓРЎРЏ Р С—Р ВµРЎР‚Р ВµРЎвЂ¦Р С•Р Т‘ Lilith Р С” `agent-first`; ingress, dedup, lead write Р С‘ explicit gates Р С•РЎРѓРЎвЂљР В°РЎР‹РЎвЂљРЎРѓРЎРЏ Р Р†Р Р…Р Вµ AI ownership |
| Evidence / docs used | n8n AI Agent docs, n8n RAG docs, n8n memory docs, n8n release notes, OpenAI agents guide, Anthropic Building Effective Agents |

## 2. Candidate Comparison

Р С›РЎвЂ Р ВµР Р…Р С”Р В° Р С—Р С• РЎв‚¬Р С”Р В°Р В»Р Вµ:
- `0` РІР‚вЂќ Р С”Р С•Р Р…РЎвЂћР В»Р С‘Р С”РЎвЂљРЎС“Р ВµРЎвЂљ / Р Р…Р ВµР С—РЎР‚Р С‘Р ВµР СР В»Р ВµР СР С•
- `1` РІР‚вЂќ РЎРѓР В»Р В°Р В±Р С• / РЎвЂ¦РЎР‚РЎС“Р С—Р С”Р С•
- `2` РІР‚вЂќ Р С—РЎР‚Р С‘Р ВµР СР В»Р ВµР СР С•
- `3` РІР‚вЂќ РЎвЂ¦Р С•РЎР‚Р С•РЎв‚¬Р С• / РЎвЂ Р ВµР В»Р ВµР Р†Р С•Р Вµ РЎРѓР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘Р Вµ

### Full mode

| Р С™РЎР‚Р С‘РЎвЂљР ВµРЎР‚Р С‘Р в„– | Р вЂ™Р ВµРЎРѓ | Basic LLM Chain | AI Agent | OpenAI App Node |
|---|---:|---:|---:|---:|
| Boundary safety | 1.30 | 3 | 2 | 3 |
| Semantic fit | 1.20 | 1 | 3 | 1 |
| Solution coherence | 1.05 | 1 | 3 | 1 |
| Observability | 1.05 | 3 | 2 | 2 |
| Maintainability | 1.05 | 1 | 2 | 2 |
| Production viability | 1.05 | 3 | 3 | 3 |
| Platform-native support | 0.85 | 2 | 3 | 3 |
| Future fit | 0.85 | 0 | 3 | 1 |
| Contract/test fit | 0.85 | 3 | 2 | 2 |
| Overengineering risk | 0.65 | 3 | 2 | 3 |
| Migration cost | 0.65 | 2 | 1 | 2 |

## 3. Node Fit Score

Р В¤Р С•РЎР‚Р СРЎС“Р В»Р В°:

`Node Fit Score = sum(score_i * weight_i) / sum(3 * weight_i)`

Р РЋРЎС“Р СР СР В° Р Р†Р ВµРЎРѓР С•Р Р†: `10.55`
Р СњР С•РЎР‚Р СР В°Р В»Р С‘Р В·Р В°РЎвЂљР С•РЎР‚: `31.65`

| Р С™Р В°Р Р…Р Т‘Р С‘Р Т‘Р В°РЎвЂљ | Weighted sum | Node Fit Score | Hard-stop passed | Р С™Р С•Р СР СР ВµР Р…РЎвЂљР В°РЎР‚Р С‘Р в„– |
|---|---:|---:|---|---|
| Basic LLM Chain | 21.00 | 0.664 | `yes` | РЎвЂ¦Р С•РЎР‚Р С•РЎв‚¬Р С• Р С—Р С•Р Т‘РЎвЂ¦Р С•Р Т‘Р С‘РЎвЂљ Р Т‘Р В»РЎРЏ bounded LLM-step, Р Р…Р С• Р С—Р В»Р С•РЎвЂ¦Р С• РЎРѓР С•Р Р†Р С—Р В°Р Т‘Р В°Р ВµРЎвЂљ РЎРѓ target-role v2.0 |
| AI Agent | 25.45 | 0.804 | `yes` | Р В»РЎС“РЎвЂЎРЎв‚¬Р С‘Р в„– fit Р Т‘Р В»РЎРЏ agent-first reasoning layer, Р Р…Р С• РЎвЂљРЎР‚Р ВµР В±РЎС“Р ВµРЎвЂљ Р Р†Р Р…Р ВµРЎв‚¬Р Р…Р С‘РЎвЂ¦ deterministic gates |
| OpenAI App Node | 21.85 | 0.690 | `yes` | РЎвЂ¦Р С•РЎР‚Р С•РЎв‚¬Р С‘Р в„– Р С—РЎР‚Р С‘Р С”Р В»Р В°Р Т‘Р Р…Р С•Р в„– model-call path, Р Р…Р С• РЎРѓР В»Р В°Р В± Р С”Р В°Р С” Р С”Р С•РЎР‚Р Р…Р ВµР Р†Р С•Р в„– product AI layer |

## 4. Spacecraft Index

`Spacecraft Index = solution_power / max(task_complexity, 1)`

| Р С™Р В°Р Р…Р Т‘Р С‘Р Т‘Р В°РЎвЂљ | task_complexity | solution_power | Spacecraft Index | Р С›РЎвЂ Р ВµР Р…Р С”Р В° |
|---|---:|---:|---:|---|
| Basic LLM Chain | 3 | 1 | 0.33 | Р Р…Р Вµ Р С—Р ВµРЎР‚Р ВµРЎР‚Р В°Р В·Р Т‘РЎС“РЎвЂљР С•, Р Р…Р С• Р СР С•Р В¶Р ВµРЎвЂљ Р В±РЎвЂ№РЎвЂљРЎРЉ РЎРѓР В»Р С‘РЎв‚¬Р С”Р С•Р С РЎРѓР В»Р В°Р В±РЎвЂ№Р С |
| AI Agent | 3 | 2 | 0.67 | Р Р…Р С•РЎР‚Р СР В°Р В»РЎРЉР Р…РЎвЂ№Р в„– РЎС“РЎР‚Р С•Р Р†Р ВµР Р…РЎРЉ РЎРѓР С‘Р В»РЎвЂ№ Р Т‘Р В»РЎРЏ РЎРѓР С‘РЎРѓРЎвЂљР ВµР СР Р…Р С•Р в„– Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ |
| OpenAI App Node | 3 | 1 | 0.33 | Р Р…Р Вµ Р С—Р ВµРЎР‚Р ВµРЎР‚Р В°Р В·Р Т‘РЎС“РЎвЂљР С•, Р Р…Р С• Р Р…Р Вµ Р С—Р С•Р С”РЎР‚РЎвЂ№Р Р†Р В°Р ВµРЎвЂљ РЎвЂ Р ВµР В»Р ВµР Р†РЎС“РЎР‹ РЎР‚Р С•Р В»РЎРЉ |

## 5. Decision

| Р СџР С•Р В»Р Вµ | Р вЂ”Р Р…Р В°РЎвЂЎР ВµР Р…Р С‘Р Вµ |
|---|---|
| Winner | `AI Agent` |
| Why this candidate won | Р В»РЎС“РЎвЂЎРЎв‚¬Р Вµ Р Р†РЎРѓР ВµР С–Р С• РЎРѓР С•Р С•РЎвЂљР Р†Р ВµРЎвЂљРЎРѓРЎвЂљР Р†РЎС“Р ВµРЎвЂљ РЎвЂ Р ВµР В»Р ВµР Р†Р С•Р в„– РЎР‚Р С•Р В»Р С‘ Lilith v2.0 Р С”Р В°Р С” memory-aware, retrieval-aware, tool-using agentic sales assistant |
| Why others lost | `Basic LLM Chain` РЎвЂ¦Р С•РЎР‚Р С•РЎв‚¬ Р С”Р В°Р С” bounded step, Р Р…Р С• РЎРѓР В»Р В°Р В± Р С”Р В°Р С” Р Т‘Р С•Р В»Р С–Р С•РЎРѓРЎР‚Р С•РЎвЂЎР Р…Р С•Р Вµ AI-РЎРЏР Т‘РЎР‚Р С•; `OpenAI App Node` РЎвЂ¦Р С•РЎР‚Р С•РЎв‚¬ Р С”Р В°Р С” model-call abstraction, Р Р…Р С• Р Р…Р Вµ Р С”Р В°Р С” orchestration root |
| Residual risks | Р С—Р С•РЎвЂљР ВµРЎР‚РЎРЏ Р С—РЎР‚Р С•Р В·РЎР‚Р В°РЎвЂЎР Р…Р С•РЎРѓРЎвЂљР С‘, tool-risk, Р Р…Р ВµР С•Р В±РЎвЂ¦Р С•Р Т‘Р С‘Р СР С•РЎРѓРЎвЂљРЎРЉ Р Р†Р Р…Р ВµРЎв‚¬Р Р…Р С‘РЎвЂ¦ handoff/write gates, РЎР‚Р С•РЎРѓРЎвЂљ РЎвЂљРЎР‚Р ВµР В±Р С•Р Р†Р В°Р Р…Р С‘Р в„– Р С” observability |
| Follow-up needed | `yes` |
| Review level | `spec-change` |

## 6. Hard-Stop Checklist

| Р СџРЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р В° | Р РЋРЎвЂљР В°РЎвЂљРЎС“РЎРѓ |
|---|---|
| Boundary safety >= 2 | `pass` |
| Observability >= 2 | `pass` |
| Production viability >= 2 | `pass` |
| Р СњР ВµРЎвЂљ РЎРѓР С”РЎР‚РЎвЂ№РЎвЂљР С•Р С–Р С• ownership drift | `pass only if external deterministic shell preserved` |
| Р СњР ВµРЎвЂљ Р Р…Р ВµР С—РЎР‚Р С‘Р ВµР СР В»Р ВµР СР С•Р С–Р С• overengineering | `pass` |

## Verdict

Р вЂќР В»РЎРЏ **РЎвЂљР ВµР С”РЎС“РЎвЂ°Р ВµР С–Р С• v1 baseline** `AI Agent` Р Р…Р Вµ Р С•Р В±РЎРЏР В·Р В°Р Р… Р В±РЎвЂ№РЎвЂљРЎРЉ Р С—Р С•Р В±Р ВµР Т‘Р С‘РЎвЂљР ВµР В»Р ВµР С.
Р вЂќР В»РЎРЏ **Lilith v2.0 Р С—РЎР‚Р С‘ РЎРЏР Р†Р Р…Р С•Р С Р Р†РЎвЂ№Р В±Р С•РЎР‚Р Вµ agent-first Р С”РЎС“РЎР‚РЎРѓР В°** Р С—Р С•Р В±Р ВµР Т‘Р С‘РЎвЂљР ВµР В»Р ВµР С РЎРѓРЎвЂљР В°Р Р…Р С•Р Р†Р С‘РЎвЂљРЎРѓРЎРЏ Р С‘Р СР ВµР Р…Р Р…Р С• `AI Agent`, Р Р…Р С• РЎвЂљР С•Р В»РЎРЉР С”Р С• Р С”Р В°Р С”:

- Р С”Р С•РЎР‚Р ВµР Р…РЎРЉ AI-layer;
- Р Р…Р Вµ Р Р†Р В»Р В°Р Т‘Р ВµР В»Р ВµРЎвЂ  ingress shell;
- Р Р…Р Вµ Р Р†Р В»Р В°Р Т‘Р ВµР В»Р ВµРЎвЂ  dedup;
- Р Р…Р Вµ Р Р†Р В»Р В°Р Т‘Р ВµР В»Р ВµРЎвЂ  explicit handoff gate;
- Р Р…Р Вµ Р Р†Р В»Р В°Р Т‘Р ВµР В»Р ВµРЎвЂ  idempotent lead write.
