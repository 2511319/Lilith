import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();

function readJson(relativePath) {
  const fullPath = path.join(repoRoot, relativePath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

function getNodeByName(workflow, name) {
  const node = workflow.nodes.find((entry) => entry.name === name);
  assert.ok(node, `Node "${name}" not found`);
  return node;
}

function getAssignmentNames(node) {
  return node.parameters.assignments.assignments.map((assignment) => assignment.name);
}

test('phase 1 workflow acknowledges webhook immediately to keep failure path non-blocking', () => {
  const workflow = readJson('workflows/01_inbound_echo.json');
  const webhookNode = getNodeByName(workflow, 'Chatwoot Inbound Webhook');

  assert.equal(webhookNode.type, 'n8n-nodes-base.webhook');
  assert.equal(webhookNode.parameters.httpMethod, 'POST');
  assert.equal(webhookNode.parameters.path, 'dev/chatwoot/inbound-echo');
  assert.equal(webhookNode.parameters.responseMode, 'onReceived');
});

test('phase 1 workflow suppresses bot or operator loop messages before normalization', () => {
  const workflow = readJson('workflows/01_inbound_echo.json');
  const guardNode = getNodeByName(workflow, 'Allow Customer Inbound Only');

  assert.equal(guardNode.type, 'n8n-nodes-base.if');
  assert.equal(guardNode.parameters.conditions.combinator, 'and');
  assert.equal(guardNode.parameters.conditions.conditions.length, 2);
  assert.equal(
    guardNode.parameters.conditions.conditions[0].leftValue,
    "={{ ['0', 'incoming'].includes(String($json.body.message_type ?? '').toLowerCase()) ? 'incoming' : String($json.body.message_type ?? '').toLowerCase() }}",
  );
  assert.equal(guardNode.parameters.conditions.conditions[0].rightValue, 'incoming');
  assert.equal(
    guardNode.parameters.conditions.conditions[1].leftValue,
    "={{ String($json.body.sender?.type || $json.body.conversation?.meta?.sender?.type || $json.body.conversation?.messages?.[0]?.sender?.type || '').toLowerCase() }}",
  );
  assert.equal(guardNode.parameters.conditions.conditions[1].rightValue, 'contact');
});

test('phase 1 normalization node maps the canonical inbound contract fields', () => {
  const workflow = readJson('workflows/01_inbound_echo.json');
  const normalizeNode = getNodeByName(workflow, 'Normalize Inbound Event');
  const assignmentNames = getAssignmentNames(normalizeNode);

  assert.deepEqual(assignmentNames, [
    'event_type',
    'correlation_id',
    'channel',
    'inbox_id',
    'conversation_id',
    'message_id',
    'external_user_id',
    'sender_type',
    'text',
    'raw_language_hint',
    'received_at',
    'metadata.chatwoot_contact_id',
    'metadata.chatwoot_message_type',
  ]);

  const assignmentMap = Object.fromEntries(
    normalizeNode.parameters.assignments.assignments.map((assignment) => [assignment.name, assignment.value]),
  );

  assert.equal(
    assignmentMap.inbox_id,
    "={{ String($json.body.conversation?.inbox_id || $json.body.inbox?.id || '') }}",
  );
  assert.equal(
    assignmentMap.external_user_id,
    "={{ String($json.body.conversation?.contact_inbox?.source_id || $json.body.sender?.id || $json.body.conversation?.meta?.sender?.id || $json.body.conversation?.messages?.[0]?.sender?.id || '') }}",
  );
  assert.equal(
    assignmentMap.text,
    "={{ String($json.body.conversation?.messages?.[0]?.processed_message_content ?? $json.body.content ?? '') }}",
  );
  assert.equal(
    assignmentMap.raw_language_hint,
    "={{ String($json.body.contact?.additional_attributes?.browser_language || $json.body.conversation?.additional_attributes?.browser_language || 'ru') }}",
  );
  assert.equal(
    assignmentMap['metadata.chatwoot_contact_id'],
    "={{ String($json.body.sender?.id || $json.body.conversation?.meta?.sender?.id || $json.body.conversation?.messages?.[0]?.sender?.id || '') }}",
  );
});

test('phase 1 normalized payload stays aligned with inbound contract schema', () => {
  const workflow = readJson('workflows/01_inbound_echo.json');
  const schema = readJson('contracts/inbound-message-normalized.schema.json');
  const normalizeNode = getNodeByName(workflow, 'Normalize Inbound Event');
  const assignmentNames = getAssignmentNames(normalizeNode);
  const schemaFieldNames = Object.keys(schema.properties);
  const metadataFieldNames = Object.keys(schema.properties.metadata.properties).map(
    (fieldName) => `metadata.${fieldName}`,
  );

  assert.deepEqual(
    assignmentNames,
    schemaFieldNames
      .filter((fieldName) => fieldName !== 'metadata')
      .concat(metadataFieldNames),
  );

  const receivedAtField = normalizeNode.parameters.assignments.assignments.find(
    (assignment) => assignment.name === 'received_at',
  );
  assert.equal(
    receivedAtField.value,
    "={{ typeof $json.body.created_at === 'number' ? new Date(Number($json.body.created_at) * 1000).toISOString() : new Date($json.body.created_at).toISOString() }}",
  );
});

test('phase 1 workflow keeps non-secret dev base url in request context, not in normalized payload', () => {
  const workflow = readJson('workflows/01_inbound_echo.json');
  const contextNode = getNodeByName(workflow, 'Prepare Chatwoot Request Context');
  const baseUrlField = contextNode.parameters.assignments.assignments.find(
    (assignment) => assignment.name === 'chatwoot_base_url',
  );

  assert.ok(baseUrlField);
  assert.equal(baseUrlField.value, 'https://dev-chatwoot.dbi.ru');
});

test('phase 1 reply publication now uses phase 3 sub-workflow output before Chatwoot publication', () => {
  const workflow = readJson('workflows/01_inbound_echo.json');
  const inputNode = getNodeByName(workflow, 'Prepare Phase 3 Input');
  const executeNode = getNodeByName(workflow, 'Execute Phase 3 LLM Subworkflow');
  const replyNode = getNodeByName(workflow, 'Prepare Phase 3 Reply');

  const inputAssignmentMap = Object.fromEntries(
    inputNode.parameters.assignments.assignments.map((assignment) => [assignment.name, assignment.value]),
  );

  assert.equal(inputAssignmentMap.correlation_id, "={{ $('Prepare Dedup Context').item.json.correlation_id }}");
  assert.equal(inputAssignmentMap.text, "={{ $('Prepare Dedup Context').item.json.text }}");
  assert.equal(inputAssignmentMap.channel, "={{ $('Prepare Dedup Context').item.json.channel }}");
  assert.equal(inputAssignmentMap.raw_language_hint, "={{ $('Prepare Dedup Context').item.json.raw_language_hint }}");
  assert.equal(inputAssignmentMap.conversation_id, "={{ $('Prepare Dedup Context').item.json.conversation_id }}");
  assert.equal(executeNode.type, 'n8n-nodes-base.executeWorkflow');
  assert.equal(executeNode.parameters.workflowId.value, 'gViChIh0yTY6zclR');
  assert.equal(executeNode.parameters.mode, 'each');

  const assignmentMap = Object.fromEntries(
    replyNode.parameters.assignments.assignments.map((assignment) => [assignment.name, assignment.value]),
  );

  assert.equal(assignmentMap.reply_content, "={{ String($json.answer_text || '') }}");
  assert.equal(assignmentMap.conversation_id, "={{ $('Prepare Phase 3 Input').item.json.conversation_id }}");
  assert.equal(assignmentMap.reply_decision, "={{ String($json.decision || '') }}");
  assert.equal(assignmentMap.reply_next_stage, "={{ String($json.next_stage || '') }}");
});

test('phase 1 reply publication uses Chatwoot application API and outgoing text payload', () => {
  const workflow = readJson('workflows/01_inbound_echo.json');
  const requestNode = getNodeByName(workflow, 'Publish Reply to Chatwoot');

  assert.equal(requestNode.type, 'n8n-nodes-base.httpRequest');
  assert.equal(requestNode.parameters.method, 'POST');
  assert.match(requestNode.parameters.url, /\/api\/v1\/accounts\//);
  assert.equal(requestNode.parameters.sendBody, true);
  assert.equal(requestNode.parameters.specifyBody, 'json');
  assert.equal(requestNode.parameters.authentication, 'genericCredentialType');
  assert.equal(requestNode.parameters.genericAuthType, 'httpHeaderAuth');
  assert.equal(requestNode.credentials.httpHeaderAuth.id, 'NMnQ6WT7KLRMMKic');
  assert.equal(requestNode.credentials.httpHeaderAuth.name, 'Chatwoot DEV Header Auth 371');
  assert.match(requestNode.parameters.jsonBody, /"message_type":\s*"outgoing"/);
  assert.match(requestNode.parameters.jsonBody, /"private":\s*false/);
  assert.match(requestNode.parameters.jsonBody, /\$json\.reply_content/);
});
