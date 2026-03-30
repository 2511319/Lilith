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
  return workflow.nodes.find((node) => node.name === name);
}

test('phase 1 raw inbound sample is rich enough for canonical normalization', () => {
  const sample = readJson('samples/chatwoot/inbound_message.json');

  assert.equal(sample.event, 'message_created');
  assert.equal(sample.message_type, 'incoming');
  assert.equal(typeof sample.created_at, 'string');
  assert.ok(sample.account?.id, 'account.id is required for Chatwoot reply API');
  assert.ok(sample.conversation?.id, 'conversation.id is required for reply routing');
  assert.ok(sample.conversation?.inbox_id, 'conversation.inbox_id is required for normalized contract');
  assert.ok(sample.conversation?.channel, 'conversation.channel is required for normalized contract');
  assert.ok(sample.sender?.id, 'sender.id is required for normalized metadata');
  assert.ok(sample.conversation?.meta?.sender?.type, 'conversation.meta.sender.type is required for sender classification');
  assert.ok(sample.conversation?.messages?.[0]?.processed_message_content, 'processed_message_content should be available for text normalization');
});

test('phase 1 workflow contains webhook, normalization, reply publishing and trace nodes', () => {
  const workflow = readJson('workflows/01_inbound_echo.json');

  assert.ok(getNodeByName(workflow, 'Chatwoot Inbound Webhook'));
  assert.ok(getNodeByName(workflow, 'Allow Customer Inbound Only'));
  assert.ok(getNodeByName(workflow, 'Normalize Inbound Event'));
  assert.ok(getNodeByName(workflow, 'Prepare Phase 3 Input'));
  assert.ok(getNodeByName(workflow, 'Execute Phase 3 LLM Subworkflow'));
  assert.ok(getNodeByName(workflow, 'Prepare Phase 3 Reply'));
  assert.ok(getNodeByName(workflow, 'Prepare Chatwoot Request Context'));
  assert.ok(getNodeByName(workflow, 'Publish Reply to Chatwoot'));
  assert.ok(getNodeByName(workflow, 'Build Reply Trace'));
});
