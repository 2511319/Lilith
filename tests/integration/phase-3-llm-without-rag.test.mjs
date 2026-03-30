import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const envelopeSchema = JSON.parse(
  fs.readFileSync(path.join(repoRoot, 'contracts/llm-decision-envelope.schema.json'), 'utf8'),
);

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), 'utf8'));
}

function getNode(workflow, name) {
  const node = workflow.nodes.find((entry) => entry.name === name);
  assert.ok(node, `Node "${name}" not found`);
  return node;
}

function validateDecisionEnvelope(sample) {
  const rootRequired = envelopeSchema.required;
  const signalSchema = envelopeSchema.properties.signals;
  const signalRequired = signalSchema.required;

  assert.deepEqual(Object.keys(sample).sort(), Object.keys(envelopeSchema.properties).sort());

  for (const key of rootRequired) {
    assert.ok(key in sample, `Missing root field ${key}`);
  }

  assert.equal(typeof sample.correlation_id, 'string');
  assert.notEqual(sample.correlation_id, '');
  assert.equal(typeof sample.answer_text, 'string');
  assert.notEqual(sample.answer_text, '');
  assert.ok(envelopeSchema.properties.decision.enum.includes(sample.decision));
  assert.ok(envelopeSchema.properties.next_stage.enum.includes(sample.next_stage));

  assert.deepEqual(Object.keys(sample.signals).sort(), Object.keys(signalSchema.properties).sort());
  for (const key of signalRequired) {
    assert.ok(key in sample.signals, `Missing signals field ${key}`);
  }

  assert.equal(typeof sample.signals.needs_handoff, 'boolean');
  assert.equal(typeof sample.signals.needs_contact, 'boolean');
  assert.equal(typeof sample.signals.has_grounding, 'boolean');
  assert.ok(signalSchema.properties.confidence_band.enum.includes(sample.signals.confidence_band));
}

test('phase 3 workflow keeps model config, retry/timeout policy and parser chain', () => {
  const workflow = readJson('workflows/03_llm_dialog_no_rag.json');
  const chainNode = getNode(workflow, 'Basic LLM Chain');
  const modelNode = getNode(workflow, 'OpenAI Chat Model');
  const parserNode = getNode(workflow, 'Structured Output Parser');
  const fixerNode = getNode(workflow, 'Auto-fixing Output Parser');

  assert.equal(chainNode.onError, 'continueRegularOutput');
  assert.equal(chainNode.parameters.hasOutputParser, true);
  assert.match(chainNode.parameters.text, /Собери decision envelope/u);

  assert.equal(modelNode.parameters.model.value, "={{ $('Normalize LLM Request').first().json.llm_model }}");
  assert.equal(modelNode.parameters.options.timeout, 15000);
  assert.equal(modelNode.parameters.options.maxRetries, 1);

  assert.ok(parserNode.parameters.jsonSchemaExample.includes('"decision": "reply"'));
  assert.match(fixerNode.parameters.options.prompt, /return only valid JSON/u);

  assert.equal(workflow.connections['OpenAI Chat Model'].ai_languageModel[0][0].node, 'Basic LLM Chain');
  assert.equal(workflow.connections['Structured Output Parser'].ai_outputParser[0][0].node, 'Auto-fixing Output Parser');
  assert.equal(workflow.connections['Auto-fixing Output Parser'].ai_outputParser[0][0].node, 'Basic LLM Chain');
});

test('phase 3 samples validate against llm-decision-envelope contract', () => {
  const normalSample = readJson('samples/llm/llm_decision_envelope_normal.json');
  const fallbackSample = readJson('samples/llm/llm_decision_envelope_fallback.json');

  validateDecisionEnvelope(normalSample);
  validateDecisionEnvelope(fallbackSample);

  assert.equal(normalSample.signals.has_grounding, false);
  assert.equal(fallbackSample.decision, 'handoff');
  assert.equal(fallbackSample.next_stage, 'handoff');
  assert.equal(fallbackSample.signals.confidence_band, 'low');
});

test('phase 3 workflow normalization and fallback text are aligned with representative samples', () => {
  const workflow = readJson('workflows/03_llm_dialog_no_rag.json');
  const requestSample = readJson('samples/llm/normalized_inbound_request.json');
  const fallbackSample = readJson('samples/llm/llm_decision_envelope_fallback.json');
  const normalizeNode = getNode(workflow, 'Normalize LLM Request');
  const fallbackNode = getNode(workflow, 'Build Fallback Envelope');
  const inputFallbackNode = getNode(workflow, 'Build Input Fallback Envelope');

  assert.equal(normalizeNode.parameters.assignments.assignments.find((entry) => entry.name === 'raw_language_hint').value,
    "={{ String($json.raw_language_hint || $json.body?.raw_language_hint || $json.body?.normalized_inbound?.raw_language_hint || 'ru') }}");
  assert.equal(requestSample.raw_language_hint, 'ru');

  const fallbackText = fallbackNode.parameters.assignments.assignments.find(
    (entry) => entry.name === 'answer_text',
  ).value;
  const inputFallbackText = inputFallbackNode.parameters.assignments.assignments.find(
    (entry) => entry.name === 'answer_text',
  ).value;

  assert.equal(fallbackText, fallbackSample.answer_text);
  assert.equal(inputFallbackText, fallbackSample.answer_text);
});
