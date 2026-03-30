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

test('phase 2 workflow contains dedup gate, record writes and suppress trace nodes', () => {
  const workflow = readJson('workflows/01_inbound_echo.json');

  assert.ok(getNodeByName(workflow, 'Prepare Dedup Context'));
  assert.ok(getNodeByName(workflow, 'If Dedup Record Exists'));
  assert.ok(getNodeByName(workflow, 'If Dedup Record Does Not Exist'));
  assert.ok(getNodeByName(workflow, 'Insert Processed Dedup Record'));
  assert.ok(getNodeByName(workflow, 'Prepare Phase 3 Input'));
  assert.ok(getNodeByName(workflow, 'Insert Duplicate Suppress Record'));
  assert.ok(getNodeByName(workflow, 'Build Sender Suppress Trace'));
  assert.ok(getNodeByName(workflow, 'Build Duplicate Suppress Trace'));
});

test('phase 2 keeps the phase 1 reply path intact after processed dedup write', () => {
  const workflow = readJson('workflows/01_inbound_echo.json');

  assert.equal(
    workflow.connections['Insert Processed Dedup Record'].main[0][0].node,
    'Prepare Phase 3 Input',
  );
  assert.equal(
    workflow.connections['Prepare Phase 3 Input'].main[0][0].node,
    'Execute Phase 3 LLM Subworkflow',
  );
  assert.equal(
    workflow.connections['Publish Reply to Chatwoot'].main[0][0].node,
    'Build Reply Trace',
  );
});
