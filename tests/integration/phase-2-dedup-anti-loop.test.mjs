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

function getConnectionTargets(workflow, sourceName) {
  return (workflow.connections[sourceName]?.main?.[0] ?? []).map((entry) => entry.node);
}

test('phase 2 workflow adds persistent dedup lookup before reply preparation', () => {
  const workflow = readJson('workflows/01_inbound_echo.json');

  assert.deepEqual(getConnectionTargets(workflow, 'Normalize Inbound Event'), ['Prepare Dedup Context']);
  assert.deepEqual(
    getConnectionTargets(workflow, 'Prepare Dedup Context').sort(),
    ['If Dedup Record Does Not Exist', 'If Dedup Record Exists'].sort(),
  );
  assert.deepEqual(getConnectionTargets(workflow, 'Insert Processed Dedup Record'), ['Prepare Phase 3 Input']);
  assert.deepEqual(getConnectionTargets(workflow, 'Prepare Phase 3 Input'), ['Execute Phase 3 LLM Subworkflow']);
});

test('phase 2 dedup lookup uses stable Chatwoot message fingerprint and shared data table', () => {
  const workflow = readJson('workflows/01_inbound_echo.json');
  const dedupContextNode = getNodeByName(workflow, 'Prepare Dedup Context');
  const existsNode = getNodeByName(workflow, 'If Dedup Record Exists');
  const notExistsNode = getNodeByName(workflow, 'If Dedup Record Does Not Exist');

  const dedupKeyField = dedupContextNode.parameters.assignments.assignments.find(
    (assignment) => assignment.name === 'dedup_key',
  );
  const dedupExpiresAtField = dedupContextNode.parameters.assignments.assignments.find(
    (assignment) => assignment.name === 'dedup_expires_at',
  );

  assert.equal(
    dedupKeyField.value,
    "={{ 'cw:' + String($('Chatwoot Inbound Webhook').item.json.body.account.id) + ':' + $json.conversation_id + ':' + $json.message_id }}",
  );
  assert.equal(
    dedupExpiresAtField.value,
    "={{ new Date(new Date($json.received_at).getTime() + 86400000).toISOString() }}",
  );

  for (const node of [existsNode, notExistsNode]) {
    assert.equal(node.type, 'n8n-nodes-base.dataTable');
    assert.equal(node.parameters.dataTableId.value, 'IWxUMSumwaGN44Ez');
    assert.equal(node.parameters.filters.conditions.length, 1);
    assert.equal(node.parameters.filters.conditions[0].keyName, 'dedup_key');
    assert.equal(node.parameters.filters.conditions[0].keyValue, '={{ $json.dedup_key }}');
  }

  assert.equal(existsNode.parameters.operation, 'rowExists');
  assert.equal(notExistsNode.parameters.operation, 'rowNotExists');
});

test('phase 2 stores dedup-record contract fields for processed and suppressed duplicate deliveries', () => {
  const workflow = readJson('workflows/01_inbound_echo.json');
  const schema = readJson('contracts/dedup-record.schema.json');
  const processedNode = getNodeByName(workflow, 'Insert Processed Dedup Record');
  const suppressedNode = getNodeByName(workflow, 'Insert Duplicate Suppress Record');
  const expectedKeys = Object.keys(schema.properties);

  for (const node of [processedNode, suppressedNode]) {
    assert.equal(node.type, 'n8n-nodes-base.dataTable');
    assert.deepEqual(Object.keys(node.parameters.columns.value), expectedKeys);
    assert.equal(node.parameters.columns.mappingMode, 'defineBelow');
    assert.equal(node.parameters.columns.attemptToConvertTypes, false);
    assert.equal(node.parameters.columns.convertFieldsToString, false);
  }

  assert.equal(processedNode.parameters.columns.value.status, '={{ $json.dedup_record_status }}');
  assert.equal(suppressedNode.parameters.columns.value.status, '={{ $json.dedup_record_status }}');
});

test('phase 2 logs suppress traces for duplicate and sender-guard exits', () => {
  const workflow = readJson('workflows/01_inbound_echo.json');
  const senderSuppressNode = getNodeByName(workflow, 'Build Sender Suppress Trace');
  const duplicateSuppressNode = getNodeByName(workflow, 'Build Duplicate Suppress Trace');

  assert.deepEqual(
    senderSuppressNode.parameters.assignments.assignments.map((assignment) => assignment.name),
    [
      'correlation_id',
      'conversation_id',
      'inbound_message_id',
      'suppress_reason',
      'suppress_source',
      'message_type_raw',
      'sender_type_raw',
    ],
  );

  assert.deepEqual(
    duplicateSuppressNode.parameters.assignments.assignments.map((assignment) => assignment.name),
    [
      'correlation_id',
      'conversation_id',
      'inbound_message_id',
      'suppress_reason',
      'suppress_source',
      'dedup_key',
    ],
  );

  assert.equal(
    workflow.connections['Allow Customer Inbound Only'].main[1][0].node,
    'Build Sender Suppress Trace',
  );
  assert.equal(
    duplicateSuppressNode.parameters.assignments.assignments.find((assignment) => assignment.name === 'suppress_reason').value,
    'duplicate_delivery',
  );
});
