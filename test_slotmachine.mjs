/**
 * Unit tests for slotmachine_main.js
 * Run: node test_slotmachine.mjs
 */
import assert from 'assert';
import fs from 'fs';
import vm from 'vm';

function loadEngine() {
  global.window = global;
  const code = fs.readFileSync('slotmachine_tables.js', 'utf8')
    + fs.readFileSync('slotmachine_main.js', 'utf8');
  vm.runInThisContext(code);
  return global.SlotMain;
}

function loadTables() {
  global.window = global;
  vm.runInThisContext(fs.readFileSync('slotmachine_tables.js', 'utf8'));
  return global.SlotTables;
}

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log(`ok ${name}`);
  } catch (e) {
    failed += 1;
    console.error(`FAIL ${name}`);
    console.error(e.message);
  }
}

async function testAsync(name, fn) {
  try {
    await fn();
    passed += 1;
    console.log(`ok ${name}`);
  } catch (e) {
    failed += 1;
    console.error(`FAIL ${name}`);
    console.error(e.message);
  }
}

const T = loadTables();
const M = loadEngine();

test('compare_draw_table matches first bucket', () => {
  const idx = M.compare_draw_table(T.DRAW_20, 1);
  assert.strictEqual(idx, 0);
});

test('compare_draw_table matches cumulative probabilities', () => {
  const probs = T.DRAW_20[T.PROPABILITY];
  let sum = 0;
  for (let i = 0; i < probs.length; i += 1) {
    sum += probs[i];
    assert.strictEqual(M.compare_draw_table(T.DRAW_20, sum), i);
  }
});

test('compare_picture_with_plan finds 50C x3 on top row', () => {
  const picture = [T.S50C, T.S50C, T.S50C, T.S20C, T.S30C, T.S80C];
  const rows = T.WINNING_ROWS[T.NORMAL];
  const plan = T.NORMAL_PLAN;
  const [idx, combo] = M.compare_picture_with_plan(picture, rows[0], plan);
  assert.notStrictEqual(idx, M.UNDEFINED);
  assert.ok(Array.isArray(combo));
});

test('compare_picture_with_plan returns no hit for mixed row', () => {
  const picture = [T.S20C, T.S30C, T.S80C, T.S50C, T.S20C, T.S30C];
  const rows = T.WINNING_ROWS[T.NORMAL];
  const plan = T.NORMAL_PLAN;
  const [idx] = M.compare_picture_with_plan(picture, rows[0], plan);
  assert.strictEqual(idx, M.UNDEFINED);
});

test('get_cheatrun e forces Risk Left 50C', () => {
  const base = [T.S20C, T.S20C, T.S20C, T.S50C, T.S80C, T.S30C];
  const out = M.get_cheatrun('e', base);
  assert.deepStrictEqual(out.slice(0, 3), [T.S50C, T.S50C, T.S50C]);
});

test('get_cheatrun unknown code keeps random picture', () => {
  const base = [T.S20C, T.S30C, T.S80C, T.S50C, T.S20C, T.S30C];
  assert.deepStrictEqual(M.get_cheatrun('', base), base);
});

test('shouldInteractiveCheatRun classic CLI mode always uses cheatrun', () => {
  M.resetSimulation();
  M.configureGame({ interactive: 1, interactiveCliInput: 1 });
  assert.strictEqual(M.shouldInteractiveCheatRun(''), true);
  assert.strictEqual(M.shouldInteractiveCheatRun('e'), true);
});

test('shouldInteractiveCheatRun fair spins only with cheat input', () => {
  M.resetSimulation();
  M.configureGame({ interactive: 1, interactiveCliInput: 0 });
  assert.strictEqual(M.shouldInteractiveCheatRun(''), false);
  assert.strictEqual(M.shouldInteractiveCheatRun('e'), true);
  assert.strictEqual(M.shouldInteractiveCheatRun('SUPER 3'), true);
});

test('interactiveApplyCheatPictures defaults on', () => {
  M.resetSimulation();
  M.configureGame({ interactive: 1 });
  assert.strictEqual(M.INTERACTIVE_APPLY_CHEAT_PICTURES, 1);
});

test('create_inner_string expands bracket syntax', () => {
  assert.strictEqual(M.create_inner_string('a5[10]1'), 'a55555555551');
});

test('create_macro parses repeat segments', () => {
  assert.strictEqual(M.create_macro('a5[10]1'), 'a55555555551');
});

await testAsync('blind batch simulation runs to completion', async () => {
  M.resetSimulation();
  M.resetRandomCallSequence();
  M.configureGame({
    numGames: 500,
    blind: 1,
    logging: 0,
    interactive: 0,
    advancedLogging: 0,
  });
  M.setUiHooks(() => {}, async () => '');
  await M.main();
  assert.strictEqual(M.num_games, 500);
  assert.ok(M.counter['Sum of all money prizes'] > 0);
  assert.ok(M.num_won > 0);
  assert.ok(M.num_won < M.num_games);
});

await testAsync('interactive empty spin does not force win on every rotor draw', async () => {
  M.resetSimulation();
  M.resetRandomCallSequence();
  M.configureGame({
    numGames: 400,
    logging: 0,
    interactive: 1,
    interactiveCliInput: 1,
    blind: 0,
    advancedLogging: 0,
  });
  M.setUiHooks(() => {}, async () => '');
  await M.main();
  assert.ok(M.num_games >= 350, `expected ~400 rotor games, got ${M.num_games}`);
  assert.ok(M.num_games > M.num_won * 2, 'most rotor spins should not end in immediate WIN state');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
