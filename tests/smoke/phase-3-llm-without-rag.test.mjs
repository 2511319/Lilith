import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), 'utf8'));
}

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function getNode(workflow, name) {
  const node = workflow.nodes.find((entry) => entry.name === name);
  assert.ok(node, `Node "${name}" not found`);
  return node;
}

test('phase 3 prompts are no longer placeholders and keep sales baseline invariants', () => {
  const systemPrompt = readText('prompts/system.sales.ru.txt');
  const decisionPrompt = readText('prompts/decision.sales.json-mode.txt');
  const fallbackPolicy = readText('prompts/no-answer.policy.txt');

  assert.doesNotMatch(systemPrompt, /Phase 0 Placeholder/u);
  assert.doesNotMatch(decisionPrompt, /Phase 0 Placeholder/u);
  assert.doesNotMatch(fallbackPolicy, /Phase 0 Placeholder/u);

  assert.match(systemPrompt, /только на русском языке/u);
  assert.match(systemPrompt, /не выдумывай/u);
  assert.match(decisionPrompt, /только JSON/u);
  assert.match(decisionPrompt, /signals\.has_grounding.*false/u);
  assert.match(fallbackPolicy, /decision = handoff/u);
});

test('phase 3 workflow uses native AI nodes and avoids generic fallback nodes', () => {
  const workflow = readJson('workflows/03_llm_dialog_no_rag.json');
  const nodeTypes = workflow.nodes.map((node) => node.type);

  assert.ok(nodeTypes.includes('n8n-nodes-base.executeWorkflowTrigger'));
  assert.ok(nodeTypes.includes('@n8n/n8n-nodes-langchain.chainLlm'));
  assert.ok(nodeTypes.includes('@n8n/n8n-nodes-langchain.lmChatOpenAi'));
  assert.ok(nodeTypes.includes('@n8n/n8n-nodes-langchain.outputParserStructured'));
  assert.ok(nodeTypes.includes('@n8n/n8n-nodes-langchain.outputParserAutofixing'));
  assert.ok(!nodeTypes.includes('n8n-nodes-base.httpRequest'));
  assert.ok(!nodeTypes.includes('n8n-nodes-base.code'));
  assert.ok(!nodeTypes.includes('n8n-nodes-base.function'));
});

test('phase 3 workflow keeps explicit validation, parser and fallback path', () => {
  const workflow = readJson('workflows/03_llm_dialog_no_rag.json');

  assert.equal(getNode(workflow, 'Triggered by Parent Workflow').type, 'n8n-nodes-base.executeWorkflowTrigger');
  assert.equal(getNode(workflow, 'Build Input Fallback Envelope').type, 'n8n-nodes-base.set');
  assert.equal(getNode(workflow, 'Decision Envelope Present').type, 'n8n-nodes-base.if');
  assert.equal(getNode(workflow, 'Build Fallback Envelope').type, 'n8n-nodes-base.set');

  assert.equal(workflow.connections['Validate LLM Request'].main[0][0].node, 'Prepare LLM Context');
  assert.equal(workflow.connections['Validate LLM Request'].main[1][0].node, 'Build Input Fallback Envelope');
  assert.equal(workflow.connections['Decision Envelope Present'].main[0].length, 0);
  assert.equal(workflow.connections['Decision Envelope Present'].main[1][0].node, 'Build Fallback Envelope');
});
