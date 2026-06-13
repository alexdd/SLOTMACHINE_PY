// Copyright (c) Alex Duesel — www.tekturcms.de 2026
// slotmachine_ui.js - Browser UI for slotmachine_main.js
(function () {
'use strict';

function getEngine() {
  if (!window.SlotMain) {
    throw new Error('slotmachine_main.js failed to load (syntax error?)');
  }
  return window.SlotMain;
}

function getTables() {
  if (!window.SlotTables) {
    throw new Error('slotmachine_tables.js failed to load');
  }
  return window.SlotTables;
}

const {
  RISK_L,
  RISK_R,
  RISK_LEFT,
  RISK_RIGHT,
  MONEY,
  JP,
  TURBO,
  SUPER,
  FOUR_ROW,
  EXTRA_POINT,
  SYMBOLS,
  PRIZE,
  S7,
  S1BAR,
  S2BAR,
  S3BAR,
} = getTables();
const SYMBOL_ASCII = {
  [S7]: '  7  ',
  [S1BAR]: ' BAR ',
  [S2BAR]: ' BAR ',
  [S3BAR]: ' BAR ',
  JACK: ' JK! ',
  '20C': ' 20c ',
  '30C': ' 30c ',
  '50C': ' 50c ',
  '80C': ' 80c ',
  '160C': ' 160 ',
};

function symbolAscii(sym) {
  return SYMBOL_ASCII[sym] || String(sym).slice(0, 5).padEnd(5);
}

function getWinningPositions() {
  const engine = getEngine();
  if (!engine.winning_combinations?.length) return [];
  const nextLine = engine.naechste_linie;
  if (nextLine?.length >= 3) return nextLine;
  const primary = engine.winning_line;
  return primary?.length >= 3 ? primary : [];
}

function asciiCell(sym, highlight) {
  const text = symbolAscii(sym);
  if (!highlight) return text;
  return `<span class="ascii-cell ascii-cell--win">${text}</span>`;
}

function svgText(x, y, text, size, fill = '#d1d5db', weight = 'bold') {
  return `<text x="${x}" y="${y}" text-anchor="middle" fill="${fill}" font-size="${size}" font-weight="${weight}" font-family="Georgia, serif" stroke="none">${text}</text>`;
}

function createSymbolSvg(sym) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 80 80');
  svg.setAttribute('class', 'reel-symbol');
  svg.dataset.symbol = sym;

  const bg = document.createElementNS(ns, 'rect');
  bg.setAttribute('x', '2');
  bg.setAttribute('y', '2');
  bg.setAttribute('width', '76');
  bg.setAttribute('height', '76');
  bg.setAttribute('rx', '8');
  bg.setAttribute('fill', '#121721');
  bg.setAttribute('stroke', '#2ecc71');
  bg.setAttribute('stroke-width', '2');
  svg.appendChild(bg);

  const g = document.createElementNS(ns, 'g');
  let inner = '';

  if (sym === S7 || sym === '7') {
    inner = svgText(40, 52, '7', 42, '#60a5fa');
  } else if (sym === S1BAR) {
    inner = `
      <rect x="10" y="30" width="60" height="20" rx="3" fill="#2b3e5d" stroke="#94a3b8"/>
      ${svgText(40, 45, 'BAR', 14, '#d1d5db')}
    `;
  } else if (sym === S2BAR) {
    inner = `
      <rect x="10" y="24" width="60" height="14" rx="2" fill="#2b3e5d" stroke="#94a3b8"/>
      ${svgText(40, 34, 'BAR', 10, '#d1d5db')}
      <rect x="10" y="42" width="60" height="14" rx="2" fill="#2b3e5d" stroke="#94a3b8"/>
      ${svgText(40, 52, 'BAR', 10, '#d1d5db')}
    `;
  } else if (sym === S3BAR) {
    inner = `
      <rect x="10" y="18" width="60" height="12" rx="2" fill="#2b3e5d" stroke="#94a3b8"/>
      ${svgText(40, 27, 'BAR', 9, '#d1d5db')}
      <rect x="10" y="34" width="60" height="12" rx="2" fill="#2b3e5d" stroke="#94a3b8"/>
      ${svgText(40, 43, 'BAR', 9, '#d1d5db')}
      <rect x="10" y="50" width="60" height="12" rx="2" fill="#2b3e5d" stroke="#94a3b8"/>
      ${svgText(40, 59, 'BAR', 9, '#d1d5db')}
    `;
  } else if (sym === 'JACK') {
    inner = `
      <path d="M28 22 C28 14 52 14 52 22 C52 30 40 34 40 42" stroke="#2ecc71" fill="none" stroke-width="2"/>
      <circle cx="40" cy="52" r="6" fill="#2ecc71"/>
      <path d="M34 58 L46 58" stroke="#2ecc71" stroke-width="2"/>
    `;
  } else if (sym === '20C') {
    inner = svgText(40, 48, '20', 22);
  } else if (sym === '30C') {
    inner = svgText(40, 48, '30', 22);
  } else if (sym === '50C') {
    inner = svgText(40, 48, '50', 22);
  } else if (sym === '80C') {
    inner = svgText(40, 48, '80', 22);
  } else if (sym === '160C') {
    inner = svgText(40, 46, '160', 18);
  } else {
    inner = svgText(40, 48, sym, 14);
  }

  g.innerHTML = inner;
  svg.appendChild(g);
  return svg;
}

let logEl;
let asciiEl;
let svgGridEl;
let promptEl;
let counterEl;
let cheatInput;
let spinBtn;
let rollersControls;
let riskLadderPanel;
let ladderLeftEl;
let ladderRightEl;
let riskStatusEl;
let riskActionsEl;
let helpToggle;
let helpPanel;
let autoControls;
let autoNumGamesInput;
let autoMacroInput;
let autoLoggingCheckbox;
let autoStartBtn;
let autoStopBtn;
let autoStatusEl;
let restartRow;
let restartBtn;
let resolveInput = null;
let pendingInputState = null;
let pendingInputIndex = null;
let gameRunning = false;
let autoModeActive = false;
let gameFinished = false;

function setRestartVisible(visible) {
  if (restartRow) restartRow.hidden = !visible;
}

function setAutoStatus(text) {
  if (!autoStatusEl) return;
  if (text) {
    autoStatusEl.textContent = text;
    autoStatusEl.hidden = false;
  } else {
    autoStatusEl.textContent = '';
    autoStatusEl.hidden = true;
  }
}

function updateAutoControls() {
  const autoRunning = gameRunning && autoModeActive;
  const waiting = isWaitingForInput();

  if (autoStartBtn) autoStartBtn.disabled = autoRunning;
  if (autoStopBtn) autoStopBtn.disabled = !autoRunning;
  if (autoNumGamesInput) autoNumGamesInput.disabled = autoRunning;
  if (autoLoggingCheckbox) autoLoggingCheckbox.disabled = autoRunning;
  if (autoMacroInput) {
    const macroSelected = document.querySelector('input[name="auto-mode"]:checked')?.value === 'macro';
    autoMacroInput.disabled = autoRunning || !macroSelected;
  }
  document.querySelectorAll('input[name="auto-mode"]').forEach((el) => {
    el.disabled = autoRunning;
  });

  if (rollersControls) {
    rollersControls.classList.toggle('control-section--active', !autoModeActive);
  }

  const canSpin = waiting && isRollersState(getActiveState());
  if (spinBtn) {
    spinBtn.disabled = autoModeActive || !canSpin;
    spinBtn.classList.toggle('spin-btn--ready', !autoModeActive && canSpin);
    spinBtn.hidden = false;
  }
  if (cheatInput) cheatInput.disabled = autoModeActive || !canSpin;
}

function readAutoMode() {
  return document.querySelector('input[name="auto-mode"]:checked')?.value || 'normal';
}

function validateAutoOptions(mode, macroCode) {
  if (mode === 'macro') {
    if (!macroCode) {
      throw new Error('Macro code missing (-m)');
    }
    const letters = '[]abcdefghijklmnopqrstuvwxyz0123456789X';
    for (const ch of macroCode) {
      if (!letters.includes(ch)) {
        throw new Error(`Invalid macro character: ${ch}`);
      }
    }
  }
}

function buildAutoConfigure(mode, numGames, logging, macroCode) {
  const engine = getEngine();
  engine.resetSimulation();
  const opts = {
    interactive: 0,
    logging: logging ? 1 : 0,
    blind: 0,
    total: 0,
    receiving40: 0,
    macro: 0,
    numGames,
  };

  if (mode === 'blind') opts.blind = 1;
  else if (mode === 'total') opts.total = 1;
  else if (mode === 'receiving40') opts.receiving40 = 1;
  else if (mode === 'macro') {
    opts.macro = 1;
    opts.logging = 1;
    opts.macroList = engine.create_macro(macroCode);
  }

  engine.configureGame(opts);
}

async function waitForGameLoopEnd() {
  while (gameRunning) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

async function runGameLoop({ interactive, introLog, readyPrompt, auto }) {
  if (gameRunning) return;
  gameRunning = true;
  gameFinished = false;
  autoModeActive = auto;
  setRestartVisible(false);
  updateAutoControls();

  try {
    getEngine().setUiHooks(uiPrint, uiWaitInput);
    if (interactive) {
      getEngine().enableInteractiveMode();
    }
    updateDisplay();
    if (introLog) appendLog(`${introLog}\n`);
    if (readyPrompt && promptEl) promptEl.textContent = readyPrompt;
    if (auto) setAutoStatus(`Auto run: ${getEngine().NUM_GAMES} games…`);
    await getEngine().main();
  } catch (e) {
    if (e.message !== 'GAME_EXIT') {
      appendLog(`Game error: ${e.message}`);
      console.error(e);
    }
  }

  appendLog('\n*************************');
  appendLog('*  RESULT  *');
  appendLog('*************************\n');
  getEngine().print_stats();
  gameRunning = false;
  autoModeActive = false;
  gameFinished = true;

  if (promptEl) {
    promptEl.textContent = interactive
      ? 'Game over — use “Restart interactive” or start auto'
      : 'Auto run finished — use “Restart interactive” or start auto again';
  }
  setAutoStatus('Finished. Restart interactive or configure auto again.');
  setRestartVisible(true);
  updateControls();
}

async function onRestartClick() {
  if (gameRunning) return;
  getEngine().resetSimulation();
  resolveInput = null;
  pendingInputState = null;
  pendingInputIndex = null;
  appendLog('\n--- Interactive restart ---\n');
  await startInteractiveGame();
}

async function startInteractiveGame() {
  await runGameLoop({
    interactive: true,
    introLog: 'Interactive mode — Spin for reels, risk buttons on the ladder.',
    readyPrompt: 'Ready — press Spin (optional cheat)',
    auto: false,
  });
}

async function onAutoStartClick() {
  try {
    const mode = readAutoMode();
    const numGames = parseInt(autoNumGamesInput?.value || '1000', 10);
    const logging = autoLoggingCheckbox?.checked;
    const macroCode = autoMacroInput?.value.trim() || '';

    if (!Number.isFinite(numGames) || numGames < 1) {
      throw new Error('Game count must be ≥ 1');
    }

    validateAutoOptions(mode, macroCode);

    if (gameRunning && !autoModeActive && resolveInput) {
      submitInput('q');
      setAutoStatus('Ending interactive game…');
      await waitForGameLoopEnd();
    } else if (gameRunning) {
      return;
    }

    buildAutoConfigure(mode, numGames, logging, macroCode);
    const modeLabel = {
      normal: 'Normal',
      blind: 'Blind',
      total: 'Total Risk',
      receiving40: 'Accept 40TS',
      macro: 'Macro',
    }[mode];

    await runGameLoop({
      interactive: false,
      introLog: `Auto mode (${modeLabel}) — ${numGames} games`,
      readyPrompt: `Auto run (${modeLabel}) — ${numGames} games`,
      auto: true,
    });
  } catch (err) {
    setAutoStatus(`Error: ${err.message}`);
    console.error(err);
  }
}

function onAutoStopClick() {
  if (!gameRunning || !autoModeActive) return;
  getEngine().requestStop();
  setAutoStatus('Stop requested — ending run…');
  if (autoStopBtn) autoStopBtn.disabled = true;
}

function appendLog(msg) {
  if (!logEl) return;
  logEl.textContent += `${msg}\n`;
  logEl.scrollTop = logEl.scrollHeight;
}

function uiPrint(msg) {
  appendLog(String(msg));
  updateDisplay();
}

function isWaitingForInput() {
  return resolveInput !== null;
}

function isRollersState(state) {
  return state === getEngine().ROLLERS;
}

function isRiskState(state) {
  return state === RISK_L || state === RISK_R;
}

function getActiveState() {
  if (isWaitingForInput() && pendingInputState != null) {
    return pendingInputState;
  }
  return getEngine().getState();
}

function getActiveIndex() {
  if (isWaitingForInput() && pendingInputIndex != null && pendingInputIndex !== getEngine().UNDEFINED) {
    return pendingInputIndex;
  }
  const idx = getEngine().getIndex();
  return idx === getEngine().UNDEFINED ? -1 : idx;
}

function formatRungLabel(symbol, prize) {
  if (symbol.includes('DRAW') || symbol.includes('Draw')) {
    return symbol.replace('DRAW', 'Draw ');
  }
  if (String(symbol).endsWith('C')) {
    return `${prize}C`;
  }
  if (String(symbol).endsWith('S') || String(symbol).endsWith('T')) {
    return `${prize}${String(symbol).slice(-1)}`;
  }
  return String(symbol);
}

function renderLadderSide(container, table, sideLabel, isActiveSide, currentIndex) {
  if (!container) return;
  const symbols = table[SYMBOLS];
  const prizes = table[PRIZE];
  container.innerHTML = '';
  container.classList.toggle('ladder-active', isActiveSide);

  for (let i = symbols.length - 1; i >= 0; i -= 1) {
    const rung = document.createElement('div');
    rung.className = 'ladder-rung';
    rung.dataset.step = String(i);

    if (isActiveSide) {
      if (i === currentIndex) rung.classList.add('ladder-rung-current');
      else if (i < currentIndex) rung.classList.add('ladder-rung-done');
    }

    const label = formatRungLabel(symbols[i], prizes[i]);
    rung.innerHTML = `
      <span class="rung-step">${i + 1}</span>
      <span class="rung-label">${label}</span>
    `;
    container.appendChild(rung);
  }

  const title = container.parentElement?.querySelector('.ladder-title');
  if (title) {
    title.classList.toggle('ladder-title-active', isActiveSide);
    title.textContent = isActiveSide ? `${sideLabel} ◀ active` : sideLabel;
  }
}

function renderRiskLadder() {
  const state = getActiveState();
  const gameState = getEngine().getState();
  const idx = getActiveIndex();
  const waiting = isWaitingForInput();
  const activeRisk = isRiskState(state) ? state : (isRiskState(gameState) ? gameState : null);
  const inRiskWait = waiting && isRiskState(state);

  renderLadderSide(ladderLeftEl, RISK_LEFT, 'Risk Left', activeRisk === RISK_L, idx);
  renderLadderSide(ladderRightEl, RISK_RIGHT, 'Risk Right', activeRisk === RISK_R, idx);

  if (riskLadderPanel) {
    riskLadderPanel.classList.toggle('risk-ladder-panel--active', inRiskWait || isRiskState(gameState));
    riskLadderPanel.classList.toggle('risk-ladder-panel--waiting', inRiskWait);
  }

  if (riskStatusEl) {
    if (inRiskWait) {
      const side = state === RISK_L ? 'Left' : 'Right';
      riskStatusEl.textContent = `Risk ${side} — step ${idx + 1} / 13 — choose action:`;
    } else if (isRiskState(gameState)) {
      riskStatusEl.textContent = 'Risk in progress…';
    } else {
      riskStatusEl.textContent = 'Ladder ready (appears after coin win)';
    }
  }

  if (riskActionsEl) {
    riskActionsEl.classList.toggle('risk-actions--visible', inRiskWait);
  }
}

function updateControls() {
  const state = getActiveState();
  const waiting = isWaitingForInput();
  const risk = isRiskState(state);

  const riskReady = !autoModeActive && waiting && risk;
  document.querySelectorAll('.risk-btn').forEach((btn) => {
    btn.disabled = !riskReady;
    btn.classList.toggle('risk-btn--ready', riskReady);
  });

  renderRiskLadder();
  updateAutoControls();
}

async function uiWaitInput(prompt, state, index) {
  pendingInputState = state;
  pendingInputIndex = index;
  if (promptEl) {
    promptEl.textContent = prompt.replace(/\n/g, ' ');
  }
  updateDisplay();
  return new Promise((resolve) => {
    resolveInput = resolve;
    updateControls();
    if (isRollersState(state) && cheatInput) {
      cheatInput.focus();
    }
  });
}

function submitInput(value) {
  if (!resolveInput) return;
  const fn = resolveInput;
  resolveInput = null;
  pendingInputState = null;
  pendingInputIndex = null;
  updateControls();
  fn(value);
}

function renderAsciiReels() {
  if (!asciiEl) return;
  const picture = getEngine().picture;
  const game_mode = getEngine().game_mode;
  const state = getActiveState();
  const idx = getActiveIndex();
  const winSet = new Set(getWinningPositions());
  // Cell interior = 7 chars (space + 5-char symbol + space); borders must match.
  asciiEl.innerHTML =
    `┌───────┬───────┬───────┐\n` +
    `│ ${asciiCell(picture[0], winSet.has(0))} │ ${asciiCell(picture[1], winSet.has(1))} │ ${asciiCell(picture[2], winSet.has(2))} │\n` +
    `├───────┼───────┼───────┤\n` +
    `│ ${asciiCell(picture[3], winSet.has(3))} │ ${asciiCell(picture[4], winSet.has(4))} │ ${asciiCell(picture[5], winSet.has(5))} │\n` +
    `└───────┴───────┴───────┘\n\n` +
    `State: ${state}\n` +
    `Mode: ${game_mode}\n` +
    (idx >= 0 ? `Index: ${idx}\n` : '');
}

function renderSvgReels() {
  if (!svgGridEl) return;
  const picture = getEngine().picture;
  const winSet = new Set(getWinningPositions());
  svgGridEl.innerHTML = '';
  for (let i = 0; i < 6; i += 1) {
    const cell = document.createElement('div');
    cell.className = 'reel-cell';
    if (winSet.has(i)) cell.classList.add('reel-cell--win');
    cell.appendChild(createSymbolSvg(picture[i]));
    svgGridEl.appendChild(cell);
  }
}

function renderCounters() {
  if (!counterEl) return;
  const counter = getEngine().counter;
  const carry = getEngine().carry;
  const lines = [
    `Money: ${counter[MONEY] ?? 0}`,
    `Jackpot Pts: ${counter[JP] ?? 0}`,
    `Turbo: ${counter[TURBO] ?? 0}`,
    `Super: ${counter[SUPER] ?? 0}`,
    `Four-Row: ${counter[FOUR_ROW] ?? 0}`,
    `Extra: ${counter[EXTRA_POINT] ?? 0}`,
  ];
  const carryParts = Object.entries(carry)
    .filter(([, v]) => v > 0)
    .map(([k, v]) => `${k}: ${v}`);
  if (carryParts.length) {
    lines.push(`Carry: ${carryParts.join(', ')}`);
  }
  counterEl.textContent = lines.join('\n');
}

function updateDisplay() {
  renderAsciiReels();
  renderSvgReels();
  renderCounters();
  updateControls();
}

function onSpinClick() {
  if (!isWaitingForInput() || !isRollersState(getActiveState())) return;
  const raw = cheatInput ? cheatInput.value.trim() : '';
  if (raw === 'q') {
    submitInput('q');
  } else if (/^(SUPER|TURBO|EXTRA|JACKS|MONEY)\s/i.test(raw)) {
    submitInput(raw);
  } else {
    submitInput(raw.length === 1 ? raw.toLowerCase() : raw);
  }
  if (cheatInput) cheatInput.value = '';
}

function init() {
  try {
    logEl = document.getElementById('game-log');
    asciiEl = document.getElementById('ascii-reels');
    svgGridEl = document.getElementById('svg-reels');
    promptEl = document.getElementById('prompt-line');
    counterEl = document.getElementById('counter-display');
    cheatInput = document.getElementById('cheat-input');
    spinBtn = document.getElementById('spin-btn');
    rollersControls = document.getElementById('rollers-controls');
    riskLadderPanel = document.getElementById('risk-ladder-panel');
    ladderLeftEl = document.getElementById('ladder-left');
    ladderRightEl = document.getElementById('ladder-right');
    riskStatusEl = document.getElementById('risk-status');
    riskActionsEl = document.getElementById('risk-actions');
    helpToggle = document.getElementById('help-toggle');
    helpPanel = document.getElementById('help-panel');
    autoControls = document.getElementById('auto-controls');
    autoNumGamesInput = document.getElementById('auto-num-games');
    autoMacroInput = document.getElementById('auto-macro-input');
    autoLoggingCheckbox = document.getElementById('auto-logging');
    autoStartBtn = document.getElementById('auto-start-btn');
    autoStopBtn = document.getElementById('auto-stop-btn');
    autoStatusEl = document.getElementById('auto-status');
    restartRow = document.getElementById('restart-row');
    restartBtn = document.getElementById('restart-btn');

    if (!logEl || !asciiEl || !svgGridEl) {
      throw new Error('DOM elements missing');
    }

    spinBtn.addEventListener('click', onSpinClick);

    if (cheatInput) {
      cheatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onSpinClick();
        }
      });
    }

    document.querySelectorAll('.risk-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!isWaitingForInput() || !isRiskState(getActiveState())) return;
        submitInput(btn.dataset.input ?? '');
      });
    });

    if (helpToggle && helpPanel) {
      helpToggle.addEventListener('click', () => {
        const open = helpPanel.hidden;
        helpPanel.hidden = !open;
        helpToggle.setAttribute('aria-expanded', String(open));
        helpToggle.textContent = open ? 'Hide help' : 'Show help';
      });
    }

    document.querySelectorAll('input[name="auto-mode"]').forEach((radio) => {
      radio.addEventListener('change', updateAutoControls);
    });

    if (autoStartBtn) autoStartBtn.addEventListener('click', onAutoStartClick);
    if (autoStopBtn) autoStopBtn.addEventListener('click', onAutoStopClick);
    if (restartBtn) restartBtn.addEventListener('click', onRestartClick);

    setAutoStatus('');
    updateAutoControls();
    renderRiskLadder();
    updateDisplay();
    appendLog('Slot Machine ready.\n');
    startInteractiveGame();
  } catch (err) {
    console.error(err);
    if (promptEl) promptEl.textContent = `Error: ${err.message}`;
    if (asciiEl) asciiEl.textContent = `Startup error:\n${err.message}\n\nCheck console (F12).`;
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

})();