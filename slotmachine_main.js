// Copyright (c) Alex Duesel — www.tekturcms.de 2026

const {
  S20C,
  S40C,
  S80C,
  S160,
  S2S,
  S4S,
  S8S,
  S8T,
  S20T,
  S40T,
  S80T,
  S1EX40T,
  S30C,
  S50C,
  S100C,
  S160C,
  S200C,
  S3S,
  S6S,
  S12S,
  S12T,
  S25T,
  S50T,
  S100T,
  S1EX50T,
  S1BAR,
  S2BAR,
  S3BAR,
  S7,
  S1EX,
  S2EX,
  S5EX,
  JACK,
  START4S,
  START6S,
  START8S,
  START12S,
  START8T,
  START12T,
  START20T,
  START40T,
  START25T,
  START50T,
  DRAW20,
  DRAW30,
  DRAW200,
  DRAW300,
  DRAW2S,
  DRAW3S,
  FAIL40,
  FAIL50,
  WHEEL40,
  WHEEL60,
  WHEEL80,
  DRAW3BAR,
  DRAWGOLD,
  DRAW3X7,
  RISK_L,
  RISK_R,
  SYMBOLS,
  PROPABILITY,
  JACKPOT,
  TABLE,
  ROUTE,
  NEXT_STATE,
  PRIZE,
  PRIZE_TYPE,
  MONEY,
  NOPE,
  NORMAL,
  SUPER,
  TURBO,
  FOUR_ROW,
  NEXT_ROW,
  WIN,
  EXTRA_POINT,
  JP,
  JOKER,
  EXTRA_PLUS,
  EXTRA_PLUS_LEFT,
  EXTRA_PLUS_RIGHT,
  TOP_LEFT,
  TOP_CENTER,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_CENTER,
  BOTTOM_RIGHT,
  CYLINDER,
  DRAW_20,
  DRAW_30,
  DRAW_200,
  DRAW_300,
  DRAWS2S,
  DRAWS3S,
  DRAW_FAIL_40,
  DRAW_FAIL_50,
  WHEEL_40,
  WHEEL_60,
  WHEEL_80,
  WHEEL_START4S,
  WHEEL_START6S,
  WHEEL_START8S,
  WHEEL_START12S,
  WHEEL_START8T,
  WHEEL_START12T,
  WHEEL_START20T,
  WHEEL_START25T,
  WHEEL_START40T,
  WHEEL_START50T,
  DRAWS3BAR,
  DRAW_GOLD,
  DRAW_TRIPEL7,
  RISK_LEFT,
  RISK_RIGHT,
  NORMAL_PLAN,
  SUPER_PLAN,
  TURBO_PLAN,
  WINNING_ROWS
} = window.SlotTables;

// slotmachine_main.js - Port of slotmachine_main.py (Alex Duesel, GPL-3.0)

// constants and variables

let NUM_GAMES = 3400000;
const DEPOSIT = 20;
const EXTRAGAME_BOUNDS = 4;
const FOUR_ROW_MODE_BOUNDS = 100;
let INTERACTIVE = 0;
let LOGGING = 0;
let MACRO = 0;
let BLIND = 0;
let TOTAL = 0;
let TEST = 0;
let RECEIVING_40 = 0;
let ADVANCED_LOGGING = 1;
let TEXT_MODE = 0;
const RISK_FINISHED = 12;
const UNDEFINED = -1;
const COLUMN_WIN_COMBINATIONS = 0;
const COLUMN_NEXT_STATE = 1;
const COLUMN_MONEY = 2;
const COLUMN_SUPER = 3;
const COLUMN_TURBO = 4;
const COLUMN_FOUR_ROW = 5;
const COLUMN_EXTRA = 6;
const COLUMN_JACKPOT = 7;
const COLUMN_RANK = 8;
const COLUMN_SYMBOL = 9;
const DEFAULT = 255;
const ROLLERS = 'Normal Rotor-Game';
const MONEY_TOTAL = "Sum of all money prizes";
const SUPER_TOTAL = "Sum of all Super Games:";
const TURBO_TOTAL = "Sum of all Turbo Games:";
const FOUR_ROW_TOTAL = "Sum of all Four-Row Games:";
const EXTRA_TOTAL = "Sum of all Extra Points:";
const JPTOTAL = "Sum of all Jackpot Points:";
const POWER_RUN_COUNTER = "Power Run Counter";
const POWER_RUN_HITS = "Power Run Hits";
const TURBO_RUN = "Turbo Run";
const SUPER_RUN = "Super Run";
const NO_HITS = 'Fail!';
const LOG = 'Logging procedure';
const END_OF_GAME = 'Game Over!';
const ROWS = 'Winning Rows';
const PROCESS = "Key Handling";

const counter = {};
const stats = {};
const carry = {};

counter[EXTRA_POINT] = 0;
counter[TURBO] = 0;
counter[FOUR_ROW] = 0;
counter[SUPER] = 0;
counter[JP] = 1;
counter[MONEY] = 2000;
counter[MONEY_TOTAL] = 0;
counter[EXTRA_TOTAL] = 0;
counter[TURBO_TOTAL] = 0;
counter[FOUR_ROW_TOTAL] = 0;
counter[SUPER_TOTAL] = 0;
counter[JPTOTAL] = 0;
counter[POWER_RUN_COUNTER] = 0;
counter[POWER_RUN_HITS] = 0;
counter[EXTRA_PLUS_LEFT] = 0;
counter[EXTRA_PLUS_RIGHT] = 0;
counter[TURBO_RUN] = 0;
counter[SUPER_RUN] = 0;
counter[NO_HITS] = 0;
carry[MONEY] = 0;
carry[SUPER] = 0;
carry[TURBO] = 0;
carry[FOUR_ROW] = 0;
carry[EXTRA_POINT] = 0;
carry[JP] = 0;

let game_mode = NORMAL;
let winning_combinations = [];
let winning_combinations_stack = [];
let extra_double_jump = 0;
let in_run = 0;
let free_flg = 0;
let four_row_flg = 0;
let risk_accept_flg = 0;
let risk_start_flg = 0;
let num_games = 0;
let num_won = 0;
let num_risk_steps = 0;
let num_wheel = 0;
let num_draws = 0;
let num_jackpot = 0;
let risk_fail_flg = 0;
let risk_win_flg = 0;
let cheatrun = 0;
let cheatcode = 0;
let macro_list = [];
let picture = [S20C, S20C, S20C, S20C, S20C, S20C];
let next_combination = [];
let winning_line = [];
let restart_flg = 0;
let naechste_linie = [];

let currentState = ROLLERS;
let currentIndex = UNDEFINED;
let stopRequested = 0;

const INITIAL_COUNTER = {
  [EXTRA_POINT]: 0,
  [TURBO]: 0,
  [FOUR_ROW]: 0,
  [SUPER]: 0,
  [JP]: 1,
  [MONEY]: 2000,
  [MONEY_TOTAL]: 0,
  [EXTRA_TOTAL]: 0,
  [TURBO_TOTAL]: 0,
  [FOUR_ROW_TOTAL]: 0,
  [SUPER_TOTAL]: 0,
  [JPTOTAL]: 0,
  [POWER_RUN_COUNTER]: 0,
  [POWER_RUN_HITS]: 0,
  [EXTRA_PLUS_LEFT]: 0,
  [EXTRA_PLUS_RIGHT]: 0,
  [TURBO_RUN]: 0,
  [SUPER_RUN]: 0,
  [NO_HITS]: 0,
};

function resetSimulation() {
  stopRequested = 0;
  INTERACTIVE = 0;
  LOGGING = 0;
  MACRO = 0;
  BLIND = 0;
  TOTAL = 0;
  RECEIVING_40 = 0;
  TEST = 0;
  NUM_GAMES = 3400000;
  macro_list = '';
  game_mode = NORMAL;
  winning_combinations = [];
  winning_combinations_stack = [];
  extra_double_jump = 0;
  in_run = 0;
  free_flg = 0;
  four_row_flg = 0;
  risk_accept_flg = 0;
  risk_start_flg = 0;
  num_games = 0;
  num_won = 0;
  num_risk_steps = 0;
  num_wheel = 0;
  num_draws = 0;
  num_jackpot = 0;
  risk_fail_flg = 0;
  risk_win_flg = 0;
  cheatrun = 0;
  cheatcode = 0;
  picture = [S20C, S20C, S20C, S20C, S20C, S20C];
  next_combination = [];
  winning_line = [];
  restart_flg = 0;
  naechste_linie = [];
  currentState = ROLLERS;
  currentIndex = UNDEFINED;

  for (const key of Object.keys(INITIAL_COUNTER)) {
    counter[key] = INITIAL_COUNTER[key];
  }
  for (const z of Object.keys(carry)) {
    carry[z] = 0;
  }
  for (const name of Object.keys(stats)) {
    for (const symbol of Object.keys(stats[name])) {
      stats[name][symbol] = 0;
    }
  }
}

function requestStop() {
  stopRequested = 1;
}

let uiPrint = (msg) => { console.log(msg); };
let uiWaitInput = async (prompt, state, index) => '';

function setUiHooks(uiPrintFn, uiWaitInputFn) {
  uiPrint = uiPrintFn;
  uiWaitInput = uiWaitInputFn;
}

function getState() {
  return currentState;
}

function getIndex() {
  return currentIndex;
}

function enableInteractiveMode() {
  INTERACTIVE = 1;
  LOGGING = 1;
}

function configureGame(opts = {}) {
  if (opts.numGames != null) NUM_GAMES = opts.numGames;
  if (opts.interactive != null) INTERACTIVE = opts.interactive;
  if (opts.logging != null) LOGGING = opts.logging;
  if (opts.blind != null) BLIND = opts.blind;
  if (opts.macro != null) MACRO = opts.macro;
  if (opts.total != null) TOTAL = opts.total;
  if (opts.receiving40 != null) RECEIVING_40 = opts.receiving40;
  if (opts.test != null) TEST = opts.test;
  if (opts.advancedLogging != null) ADVANCED_LOGGING = opts.advancedLogging;
  if (opts.macroList != null) macro_list = opts.macroList;
}

function randint(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function combinationInList(combo, list) {
  return list.some((c) => c.length === combo.length && c.every((v, i) => v === combo[i]));
}

function exitGame(msg) {
  uiPrint(msg);
  throw new Error('GAME_EXIT');
}

function get_turbo_plan() {
  return SUPER_PLAN;
}

function get_normal_plan() {
  return NORMAL_PLAN;
}

function get_turbol_plan() {
  if (game_mode === SUPER && counter[SUPER] <= 19) {
    return TURBO_PLAN;
  }
  return SUPER_PLAN;
}

const BONUS_SCHEME = {
  [NORMAL]: get_normal_plan,
  [TURBO]: get_turbo_plan,
  [SUPER]: get_turbol_plan,
  [FOUR_ROW]: get_normal_plan,
};

// cheatcodes

function get_cheatrun(cheatcode, pictureIn) {
  if (cheatcode === 'a') return [S30C, S30C, S30C, S50C, S80C, S20C];
  if (cheatcode === 'b') return [S20C, S20C, S20C, S50C, S80C, S30C];
  if (cheatcode === 'c') return [JACK, JACK, JACK, S50C, S80C, S30C];
  if (cheatcode === 'd') return [S50C, S80C, S30C, S50C, S80C, S30C];
  if (cheatcode === 'e') return [S50C, S50C, S50C, S50C, S80C, S30C];
  if (cheatcode === 'f') return [S160C, S160C, S160C, S50C, S80C, S30C];
  if (cheatcode === 'g') return [S50C, S80C, S160C, S50C, S80C, S30C];
  if (cheatcode === 'h') return [S50C, S80C, JACK, S50C, S80C, S160];
  if (cheatcode === 'i') return [S50C, S80C, S3BAR, S80C, S50C, S1BAR];
  if (cheatcode === 'j') return [JACK, JACK, JACK, S80C, S50C, S1BAR];
  if (cheatcode === 'k') return [S50C, S80C, S7, S80C, S50C, S30C];
  if (cheatcode === 'l') return [S50C, S80C, S7, S50C, S80C, S30C];
  if (cheatcode === 'm') return [S80C, S50C, S80C, S50C, S80C, S30C];
  if (cheatcode === 'n') return [S50C, S80C, S30C, S160C, S160C, S160C];
  if (cheatcode === 'o') return [S2BAR, S2BAR, S2BAR, S160C, S160C, S160C];
  if (cheatcode === 'p') return [S7, S7, S7, S160C, S160C, S160C];
  return pictureIn;
}

// rule base

function pre_rules(game_state, index) {
  if (counter[FOUR_ROW] >= FOUR_ROW_MODE_BOUNDS || four_row_flg) {
    game_mode = FOUR_ROW;
    four_row_flg = 1;
  }
  if (counter[TURBO] > 0) {
    game_mode = TURBO;
    counter[SUPER] = 0;
  } else if (counter[SUPER] > 0) {
    game_mode = SUPER;
  } else if (!four_row_flg) {
    game_mode = NORMAL;
  }

  if (winning_combinations.length > 0) {
    counter[NO_HITS] = 0;
    free_flg = 0;
  }

  if (game_state === WIN && game_mode === TURBO && carry[SUPER] > 0) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Change Super-Games 1:1 into Turbo-Games");
    carry[TURBO] = carry[SUPER];
    carry[SUPER] = 0;
  }

  if (game_state === WIN && (carry[TURBO] > 0 || carry[SUPER] > 0)
      && !in_run && counter[TURBO] === 0 && counter[SUPER] === 0) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Success-Run started!");
    in_run = 1;
    counter[POWER_RUN_HITS] = 0;
    counter[SUPER_RUN] = 0;
    counter[TURBO_RUN] = 0;
  }

  if (in_run && game_mode === SUPER && carry[TURBO] > 0
     && game_state === WIN) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Restart Success-Run!");
    counter[POWER_RUN_COUNTER] = 0;
    in_run = 1;
    counter[POWER_RUN_HITS] = 0;
    counter[SUPER_RUN] = 0;
    counter[TURBO_RUN] = 0;
  }

  if (game_state === WIN && in_run) {
    if (carry[TURBO] > 0) {
      counter[TURBO_RUN] += carry[TURBO];
    } else if (carry[SUPER] > 0) {
      counter[SUPER_RUN] += carry[SUPER];
    }
  }

  if (counter[MONEY] > 20 && game_state === ROLLERS && !free_flg) {
    counter[MONEY] -= DEPOSIT;
  }

  if (counter[NO_HITS] >= 100) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Free Games running!");
    free_flg = 1;
  }

  if (counter[FOUR_ROW] > 0 && game_state === ROLLERS && game_mode === FOUR_ROW) {
    counter[FOUR_ROW] -= 1;
    if (counter[FOUR_ROW] === 0) {
      four_row_flg = 0;
    }
  }

  if (counter[SUPER] > 0 && game_state === ROLLERS && game_mode === SUPER) {
    counter[SUPER] -= 1;
    if (in_run && counter[SUPER] === 0) {
      in_run = 0;
      if (counter[POWER_RUN_COUNTER] > 0) {
        counter[POWER_RUN_COUNTER] = 0;
      }
    }
  }

  if (counter[TURBO] > 0 && game_state === ROLLERS && game_mode === TURBO) {
    counter[TURBO] -= 1;
    if (in_run && counter[TURBO] === 0) {
      in_run = 0;
      if (counter[POWER_RUN_COUNTER] > 0) {
        counter[POWER_RUN_COUNTER] = 0;
      }
    }
  }

  if (counter[SUPER] > 0 && game_mode === SUPER && in_run) {
    counter[POWER_RUN_COUNTER] = counter[POWER_RUN_HITS] - Math.ceil(counter[SUPER_RUN] * 0.5);
  }

  if (counter[TURBO] > 0 && game_mode === TURBO && in_run) {
    counter[POWER_RUN_COUNTER] = counter[POWER_RUN_HITS] - Math.ceil(counter[TURBO_RUN] * 0.75);
  }

  if (game_mode === TURBO && counter[POWER_RUN_COUNTER] < 0 && counter[TURBO] === 0) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Won another Turbo-Game for free");
    counter[TURBO] = 1;
  }

  if (game_mode === SUPER && counter[POWER_RUN_COUNTER] < 0 && counter[SUPER] === 0) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Won another Super-Game for free");
    counter[SUPER] = 1;
  }

  if (counter[JP] === 7 && combinationInList([S50C, S50C, S50C], winning_combinations)) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Jackpot-Win a Wheel of Fortune 60 draw!");
    counter[JP] = 1;
    counter[EXTRA_POINT] += 3;
    counter[EXTRA_TOTAL] += 3;
    winning_combinations = [];
    return WHEEL60;
  } else if (counter[JP] === 8 && combinationInList([S160C, S160C, S160C], winning_combinations)) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Jackpot-Win a Wheel of Fortune 80 draw!");
    counter[JP] = 1;
    counter[EXTRA_POINT] += 4;
    counter[EXTRA_TOTAL] += 4;
    winning_combinations = [];
    return WHEEL80;
  }

  if ((game_state === RISK_L || game_state === RISK_R) && BLIND) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: BLIND -> No risk line!");
    if (carry[SUPER] > 0 && counter[TURBO] > 0) {
      if (LOGGING || INTERACTIVE) uiPrint("Rule: Change Super-Games 1:1 into Turbo-Games");
      carry[TURBO] = carry[SUPER];
      carry[SUPER] = 0;
    }
    return WIN;
  }

  if ((counter[TURBO] > 200 || counter[SUPER] > 200)
     && (game_state === RISK_L || game_state === RISK_R)) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Special > 150 -> No risk!");
    if (carry[SUPER] > 0) {
      if (LOGGING || INTERACTIVE) uiPrint("Rule: Change Super-Games 1:1 into Turbo-Games");
      carry[TURBO] = carry[SUPER];
      carry[SUPER] = 0;
    }
    return WIN;
  }

  if (index === 4 && game_state === RISK_R) {
    return DRAW200;
  } else if (index === 4 && game_state === RISK_L) {
    return DRAW300;
  } else if (counter[EXTRA_POINT] > 0 && game_state === RISK_L && index === 5) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Double-Jump!");
    extra_double_jump = 1;
  } else if (counter[EXTRA_POINT] > 0 && game_state === RISK_R && index === 5) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Double-Jump!");
    extra_double_jump = 1;
  } else if (counter[EXTRA_POINT] > 0 && game_state === RISK_L && index === 7) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Double-Jump!");
    extra_double_jump = 1;
  } else if (counter[EXTRA_POINT] > 0 && game_state === RISK_R && index === 7) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Double-Jump!");
    extra_double_jump = 1;
  } else if (counter[EXTRA_POINT] > 0 && game_state === RISK_L && index === 9) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Double-Jump!");
    extra_double_jump = 1;
  } else if (counter[EXTRA_POINT] > 0 && game_state === RISK_R && index === 9) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Double-Jump!");
    extra_double_jump = 1;
  }

  if (risk_start_flg && game_state === RISK_L && index === 6) {
    risk_start_flg = 0;
    return START6S;
  }
  if (risk_start_flg && game_state === RISK_L && index === 7) {
    risk_start_flg = 0;
    return START12S;
  }
  if (risk_start_flg && game_state === RISK_L && index === 8) {
    risk_start_flg = 0;
    return START12T;
  }
  if (risk_start_flg && game_state === RISK_L && index === 9) {
    risk_start_flg = 0;
    return START25T;
  }
  if (risk_start_flg && game_state === RISK_L && index === 10) {
    risk_start_flg = 0;
    return START50T;
  }
  if (risk_start_flg && game_state === RISK_R && index === 6) {
    risk_start_flg = 0;
    return START4S;
  }
  if (risk_start_flg && game_state === RISK_R && index === 7) {
    risk_start_flg = 0;
    return START8S;
  }
  if (risk_start_flg && game_state === RISK_R && index === 8) {
    risk_start_flg = 0;
    return START8T;
  }
  if (risk_start_flg && game_state === RISK_R && index === 9) {
    risk_start_flg = 0;
    return START20T;
  }
  if (risk_start_flg && game_state === RISK_R && index === 10) {
    risk_start_flg = 0;
    return START40T;
  }

  if (counter[FOUR_ROW] >= FOUR_ROW_MODE_BOUNDS || four_row_flg) {
    game_mode = FOUR_ROW;
    four_row_flg = 1;
  }
  if (counter[TURBO] > 0) {
    game_mode = TURBO;
    counter[SUPER] = 0;
  } else if (counter[SUPER] > 0) {
    game_mode = SUPER;
  } else if (!four_row_flg) {
    game_mode = NORMAL;
  }

  return game_state;
}

function post_rules(game_state, next_state, index) {
  if (risk_accept_flg && game_state === RISK_R && next_state === WIN && index === 10) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Win Jackpot Points!");
    counter[JP] += 1;
    counter[JPTOTAL] += 1;
  }

  if ((game_state === RISK_L || game_state === RISK_R) && next_state === ROLLERS &&
      winning_combinations_stack.length > 0 &&
      (game_mode === NORMAL || game_mode === FOUR_ROW)) {
    return NEXT_ROW;
  }

  if (game_state === DRAW3BAR && carry[TURBO] === 150 && next_state === WIN) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Win Jackpot Points!");
    counter[JP] += 1;
    counter[JPTOTAL] += 1;
  }

  if (game_state === ROLLERS && winning_combinations.length === 0) {
    counter[NO_HITS] += 1;
  }

  if ((game_state === RISK_L || game_state === RISK_R || game_state.startsWith("START") ||
      game_state.startsWith("FAIL")) &&
      next_state === WIN && carry[TURBO] === 150) {
    if (LOGGING || INTERACTIVE) uiPrint("Rule: Split into 50 TURBO games  + 1EXTRA Point");
    carry[TURBO] = 50;
    carry[EXTRA_POINT] = 1;
  }

  return next_state;
}

function compare_picture_with_plan(pictureIn, winning_lines, winning_plan) {
  let i = 0;
  for (const row of winning_plan) {
    let found = 1;
    let j = 0;
    for (const symbol of row[COLUMN_WIN_COMBINATIONS]) {
      if (pictureIn[winning_lines[j]] !== symbol &&
         symbol !== JOKER) {
        found = 0;
        i += 1;
        break;
      }
      j += 1;
    }
    if (found) {
      return [i, row[COLUMN_WIN_COMBINATIONS]];
    }
  }
  return [UNDEFINED, UNDEFINED];
}

function compare_draw_table(drawtable, rand_value) {
  let prob = 0;
  let index = 0;
  for (const wert of drawtable[PROPABILITY]) {
    prob += wert;
    if (prob >= rand_value) {
      break;
    }
    index += 1;
  }
  if (index < drawtable[PROPABILITY].length) {
    return index;
  }
  uiPrint("ERROR! No match in table found");
  exitGame("ERROR! No match in table found");
}

function put_into_account(xtable, index, plan_row = null) {
  if (plan_row == null) {
    const prize = xtable[PRIZE][index];
    const typ = xtable[PRIZE_TYPE][index];
    carry[typ] = prize;
    if (prize > 0) {
      const symbol = xtable[SYMBOLS][index];
      carry[symbol] = 1;
    }
  } else {
    carry[MONEY] = plan_row[COLUMN_MONEY];
    carry[SUPER] = plan_row[COLUMN_SUPER];
    carry[TURBO] = plan_row[COLUMN_TURBO];
    counter[FOUR_ROW] += plan_row[COLUMN_FOUR_ROW];
    counter[FOUR_ROW_TOTAL] += plan_row[COLUMN_FOUR_ROW];
    counter[EXTRA_POINT] += plan_row[COLUMN_EXTRA];
    counter[EXTRA_TOTAL] += plan_row[COLUMN_EXTRA];
    counter[JP] += plan_row[COLUMN_JACKPOT];
    counter[JPTOTAL] += plan_row[COLUMN_JACKPOT];
  }
}

function win_route(statedict, name, index) {
  for (const z of Object.keys(carry)) {
    if (counter[z] === undefined) {
      counter[z] = 0;
    }
    counter[z] += carry[z];
  }
  counter[MONEY_TOTAL] += carry[MONEY];
  counter[SUPER_TOTAL] += carry[SUPER];
  counter[TURBO_TOTAL] += carry[TURBO];
  counter[FOUR_ROW_TOTAL] += carry[FOUR_ROW];
  counter[EXTRA_TOTAL] += carry[EXTRA_POINT];
  counter[JPTOTAL] += carry[JP];
  return [ROLLERS, DEFAULT];
}

function draw_process(statedict, name, index) {
  const rand_value = randint(1, 1000);
  index = compare_draw_table(statedict[name][TABLE], rand_value);
  if (index !== UNDEFINED) {
    if ((MACRO || TEST) && (name === DRAW200 || name === DRAW300
                || name === DRAW20 || name === DRAW30)) {
      index = 0;
    }
    put_into_account(statedict[name][TABLE], index);
    return [statedict[name][TABLE][NEXT_STATE][index], index];
  }
  uiPrint("ERROR! no matchin value found");
  exitGame("ERROR! no matchin value found");
}

function risk_process(statedict, name, index) {
  if (risk_accept_flg) {
    put_into_account(statedict[name][TABLE], index);
    return [WIN, index];
  }
  index += 1;
  if ((randint(0, 1) || risk_win_flg) &&
      !risk_fail_flg) {
    put_into_account(statedict[name][TABLE], index);
    if (index >= RISK_FINISHED) {
      return [WIN, DEFAULT];
    }
    return [name, index];
  }
  if (game_mode === NORMAL && index >= 9 && index <= 12) {
    counter[FOUR_ROW] += 1;
    counter[FOUR_ROW_TOTAL] += 1;
  }
  if (index >= RISK_FINISHED) {
    if (name === RISK_L) {
      return [FAIL50, DEFAULT];
    }
    return [FAIL40, DEFAULT];
  }
  return [ROLLERS, DEFAULT];
}

function extra_risk_process(statedict, name, index) {
  if (risk_accept_flg) {
    put_into_account(statedict[name][TABLE], index);
    return [WIN, index];
  }
  index += 2;
  if ((randint(1, 100) > 30 || risk_win_flg) &&
      !risk_fail_flg) {
    put_into_account(statedict[name][TABLE], index);
    if (index >= RISK_FINISHED - 1) {
      counter[EXTRA_POINT] -= 1;
      return [WIN, DEFAULT];
    }
    return [name, index];
  }
  if (game_mode === NORMAL && index >= 9 && index <= 12) {
    counter[FOUR_ROW] += 1;
    counter[FOUR_ROW_TOTAL] += 1;
  }
  return [ROLLERS, DEFAULT];
}

function extra_plus_risk_process(statedict, name, index) {
  if (risk_accept_flg) {
    put_into_account(statedict[name][TABLE], index);
    return [WIN, index];
  }
  index += 1;
  if ((randint(1, 100) > 30 || risk_win_flg) &&
      !risk_fail_flg) {
    put_into_account(statedict[name][TABLE], index);
    if (name === RISK_L) {
      if (index === counter[EXTRA_PLUS_LEFT]) {
        counter[EXTRA_PLUS_LEFT] -= 1;
      }
    } else if (index === counter[EXTRA_PLUS_RIGHT]) {
      counter[EXTRA_PLUS_RIGHT] -= 1;
    }
    return [name, index];
  }
  return [ROLLERS, DEFAULT];
}

function risk_dispatch_process(statedict, name, index) {
  if (counter[EXTRA_PLUS_LEFT] && name === RISK_L &&
     index < counter[EXTRA_PLUS_LEFT]) {
    if ((LOGGING || INTERACTIVE) && ADVANCED_LOGGING) {
      uiPrint("70% Risk Chance!");
    }
    return extra_plus_risk_process(statedict, name, index);
  } else if (counter[EXTRA_PLUS_RIGHT] && name === RISK_R &&
     index < counter[EXTRA_PLUS_RIGHT]) {
    if ((LOGGING || INTERACTIVE) && ADVANCED_LOGGING) {
      uiPrint("70% Risk Chance!");
    }
    return extra_plus_risk_process(statedict, name, index);
  } else if (extra_double_jump) {
    extra_double_jump = 0;
    if ((LOGGING || INTERACTIVE) && ADVANCED_LOGGING) {
      uiPrint("70% Risk Chance!");
    }
    return extra_risk_process(statedict, name, index);
  }
  if ((LOGGING || INTERACTIVE) && ADVANCED_LOGGING) {
    uiPrint("50% Risk Chance!");
  }
  return risk_process(statedict, name, index);
}

function normal_process(statedict, name, index) {
  const rotorpos = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < rotorpos.length; i++) {
    rotorpos[i] = randint(0, CYLINDER[i % 3].length - 1);
  }
  picture = [
    CYLINDER[0][rotorpos[0]], CYLINDER[1][rotorpos[1]], CYLINDER[2][rotorpos[2]],
    CYLINDER[0][rotorpos[3]], CYLINDER[1][rotorpos[4]], CYLINDER[2][rotorpos[5]],
  ];
  if (cheatrun) {
    picture = get_cheatrun(cheatcode, picture);
    rotorpos[0] = CYLINDER[0].indexOf(picture[0]);
    rotorpos[1] = CYLINDER[1].indexOf(picture[1]);
    rotorpos[2] = CYLINDER[2].indexOf(picture[2]);
    rotorpos[3] = CYLINDER[0].indexOf(picture[3]);
    rotorpos[4] = CYLINDER[1].indexOf(picture[4]);
    rotorpos[5] = CYLINDER[2].indexOf(picture[5]);
  }
  const winsymbole = [S1BAR, S2BAR, S3BAR, S7, JACK];
  if (!winsymbole.includes(picture[TOP_LEFT]) &&
     !winsymbole.includes(picture[BOTTOM_LEFT]) && !cheatrun) {
    const n1 = randint(0, CYLINDER[0].length - 1);
    const n2 = randint(0, CYLINDER[0].length - 1);
    picture[TOP_LEFT] = CYLINDER[0][n1];
    picture[BOTTOM_LEFT] = CYLINDER[0][n2];
    restart_flg = 1;
  }
  cheatrun = 0;
  const winning_plan = statedict[name][TABLE][game_mode]();
  const wiin_rows = statedict[name][ROWS][game_mode];
  let max_rang = UNDEFINED;
  winning_combinations = [];
  winning_combinations_stack = [];
  naechste_linie = [];
  let idx = 0;
  for (const row of wiin_rows) {
    const [i, kombi] = compare_picture_with_plan(picture, row, winning_plan);
    let rang = UNDEFINED;
    if (i !== UNDEFINED) {
      rang = winning_plan[i][COLUMN_RANK];
      winning_combinations_stack.push([rang, i, row]);
      winning_combinations.push(kombi);
    }
    if (rang > max_rang) {
      max_rang = rang;
      winning_line = row;
      idx = i;
    }
  }
  if (winning_combinations.length > 0) {
    if (in_run) {
      counter[POWER_RUN_HITS] += 1;
    }
    if (counter[POWER_RUN_COUNTER] < 0) {
      counter[POWER_RUN_COUNTER] += 1;
    } else if (counter[POWER_RUN_COUNTER] === 0) {
      in_run = 0;
      counter[POWER_RUN_HITS] = 0;
      counter[SUPER_RUN] = 0;
      counter[TURBO_RUN] = 0;
    }
    winning_combinations_stack.sort();
    winning_combinations_stack.reverse();
  }
  if (max_rang !== UNDEFINED) {
    winning_combinations_stack = winning_combinations_stack.slice(1);
    put_into_account(statedict[name][TABLE], idx, winning_plan[idx]);
    return [winning_plan[idx][COLUMN_NEXT_STATE], idx];
  }
  return [ROLLERS, DEFAULT];
}

function jackpot_route(statedict, name, index) {
  counter[JP] = 1;
  counter[EXTRA_POINT] += 2;
  counter[EXTRA_TOTAL] += 2;
  return [WHEEL40, DEFAULT];
}

function extra_plus_process(statedict, name, index) {
  if (counter[EXTRA_PLUS_LEFT] < EXTRAGAME_BOUNDS ||
     counter[EXTRA_PLUS_RIGHT] < EXTRAGAME_BOUNDS) {
    if (counter[EXTRA_PLUS_LEFT] > counter[EXTRA_PLUS_RIGHT]) {
      counter[EXTRA_PLUS_RIGHT] += 1;
    } else {
      counter[EXTRA_PLUS_LEFT] += 1;
    }
  }
  carry[MONEY] = 10;
  return [WIN, DEFAULT];
}

function next_row_process(statedict, name, index) {
  if (winning_combinations_stack.length > 0) {
    const idx = winning_combinations_stack[0][1];
    naechste_linie = winning_combinations_stack[0][2];
    winning_combinations_stack = winning_combinations_stack.slice(1);
    const winning_plan = statedict[name][TABLE][game_mode]();
    next_combination = winning_plan[idx][COLUMN_WIN_COMBINATIONS];
    put_into_account(statedict[name][TABLE], idx, winning_plan[idx]);
    return [winning_plan[idx][COLUMN_NEXT_STATE], idx];
  }
  uiPrint("ERROR: There is no next winning row!!!");
  exitGame("ERROR: There is no next winning row!!!");
}

// logging

function print_head() {
  uiPrint("---------------------------------------------------");
  uiPrint("Counters:");
  const c = [JP, TURBO, SUPER, FOUR_ROW, MONEY, EXTRA_POINT, EXTRA_PLUS_LEFT, EXTRA_PLUS_RIGHT, POWER_RUN_COUNTER];
  for (const z of Object.keys(counter)) {
    if (counter[z] !== 0 && c.includes(z)) {
      uiPrint(`${z} ${counter[z]}`);
    }
  }
  uiPrint("---------------------------------------------------");
}

function print_bottom() {
  for (const z of Object.keys(carry)) {
    if (carry[z] > 0) {
      uiPrint(`${z} ${carry[z]}`);
    }
  }
}

function log_normal(frame_nr, statedict, name, index) {
  num_games += 1;
  if (LOGGING || INTERACTIVE) {
    uiPrint("#############################################################");
    uiPrint(`Game No.: ${String(frame_nr)} is a ${name}`);
    uiPrint(`Mode: ${game_mode}`);
    if (ADVANCED_LOGGING) {
      uiPrint("Rotor Picture:");
      uiPrint(String(picture.slice(0, 3)));
      uiPrint(String(picture.slice(3)));
    }
    if (winning_combinations.length > 0) {
      uiPrint("Winning combinations:");
    }
    for (const prize of winning_combinations) {
      uiPrint(String(prize));
    }
    print_head();
    print_bottom();
  }
}

function log_draw(frame_nr, statedict, name, index) {
  num_draws += 1;
  stats[name][statedict[name][TABLE][SYMBOLS][index]] += 1;
  if (LOGGING || INTERACTIVE) {
    uiPrint(`Game No. ${String(frame_nr)} features a ${name}:`);
    print_bottom();
  }
}

function log_wheel(frame_nr, statedict, name, index) {
  num_wheel += 1;
  stats[name][statedict[name][TABLE][SYMBOLS][index]] += 1;
  if (LOGGING || INTERACTIVE) {
    uiPrint(`Game No.: ${String(frame_nr)} features a ${name}:`);
    print_bottom();
  }
}

function log_risiko(frame_nr, statedict, name, index) {
  num_risk_steps += 1;
  if (LOGGING || INTERACTIVE) {
    if (!risk_accept_flg) {
      uiPrint("Risk accepted");
    } else {
      uiPrint("Risk declined, price accepted!");
    }
    print_bottom();
  }
}

function log_win(frame_nr, statedict, name, index) {
  num_won += 1;
  if (LOGGING || INTERACTIVE) {
    uiPrint(`Game No. ${String(frame_nr)} wins! Prize will be put onto account!`);
  }
}

function log_jackpot(frame_nr, statedict, name, index) {
  num_jackpot += 1;
  if (LOGGING || INTERACTIVE) {
    uiPrint(`Game No. ${String(frame_nr)} features a JACKPOT!!!`);
    print_bottom();
  }
}

function log_srplus(frame_nr, statedict, name, index) {
  if (LOGGING || INTERACTIVE) {
    uiPrint("EXTRA_POINT-Plus won!!!");
    print_bottom();
  }
}

function log_next_row(frame_nr, statedict, name, index) {
  if (LOGGING || INTERACTIVE) {
    uiPrint("There is another winning row:");
    uiPrint(String(next_combination));
    print_bottom();
  }
}

// key handling and print game ro console

async function handle_keys_textmode(state, index) {
  risk_fail_flg = 0;
  risk_win_flg = 0;
  risk_accept_flg = 0;
  cheatrun = 0;
  if (state !== ROLLERS && state !== RISK_L && state !== RISK_R) {
    return state;
  }
  if ((state === RISK_L || state === RISK_R) && index === 4) {
    return state;
  }
  if (INTERACTIVE) {
    currentState = state;
    currentIndex = index;
    const strg = `Next State: ${state} \nInput: `;
    const xinput = await uiWaitInput(strg, state, index);
    if (state === ROLLERS) {
      try {
        if (xinput.startsWith("SUPER ")) {
          const i = parseInt(xinput.slice(7), 10);
          carry[SUPER] = i;
          return WIN;
        } else if (xinput.startsWith("TURBO ")) {
          const i = parseInt(xinput.slice(4), 10);
          carry[TURBO] = i;
          return WIN;
        } else if (xinput.startsWith("EXTRA ")) {
          const i = parseInt(xinput.slice(3), 10);
          carry[EXTRA_POINT] = i;
          return WIN;
        } else if (xinput.startsWith("JACKS ")) {
          const i = parseInt(xinput.slice(3), 10);
          carry[JP] = i;
          return WIN;
        } else if (xinput.startsWith("MONEY ")) {
          const i = parseInt(xinput.slice(5), 10);
          carry[MONEY] = i;
          return WIN;
        }
      } catch (e) {
        // pass
      }
    }
    uiPrint(" ");
    if (xinput === "q") {
      return END_OF_GAME;
    }
    if (state === RISK_L || state === RISK_R) {
      if (xinput === "1") risk_fail_flg = 1;
      else if (xinput === "5") risk_win_flg = 1;
      else if (xinput === "4") risk_accept_flg = 1;
    } else if (state === ROLLERS) {
      cheatrun = 1;
      cheatcode = xinput;
    }
  } else if (MACRO) {
    if (macro_list.length === 0) return END_OF_GAME;
    const xinput = macro_list[0];
    if (LOGGING) {
      const strg = `Next state: ${state} \nInput: ${xinput} `;
      uiPrint(strg);
    }
    macro_list = macro_list.slice(1);
    if (state === RISK_L || state === RISK_R) {
      if (xinput === "1") risk_fail_flg = 1;
      else if (xinput === "5") risk_win_flg = 1;
      else if (xinput === "4") risk_accept_flg = 1;
    } else if (state === ROLLERS) {
      cheatrun = 1;
      cheatcode = xinput;
    }
  } else if (state === RISK_R && index === 10 && RECEIVING_40) {
    risk_accept_flg = 1;
  }
  return state;
}

// state dispatch table

const STATES = {
  [ROLLERS]: {
    [TABLE]: BONUS_SCHEME,
    [ROWS]: WINNING_ROWS,
    [ROUTE]: normal_process,
    [LOG]: log_normal,
  },
  [DRAW20]: {
    [TABLE]: DRAW_20,
    [ROUTE]: draw_process,
    [LOG]: log_draw,
  },
  [DRAW30]: {
    [TABLE]: DRAW_30,
    [ROUTE]: draw_process,
    [LOG]: log_draw,
  },
  [DRAW200]: {
    [TABLE]: DRAW_200,
    [ROUTE]: draw_process,
    [LOG]: log_draw,
  },
  [DRAW300]: {
    [TABLE]: DRAW_300,
    [ROUTE]: draw_process,
    [LOG]: log_draw,
  },
  [DRAW2S]: {
    [TABLE]: DRAWS2S,
    [ROUTE]: draw_process,
    [LOG]: log_draw,
  },
  [DRAW3S]: {
    [TABLE]: DRAWS3S,
    [ROUTE]: draw_process,
    [LOG]: log_draw,
  },
  [FAIL40]: {
    [TABLE]: DRAW_FAIL_40,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [FAIL50]: {
    [TABLE]: DRAW_FAIL_50,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [WHEEL40]: {
    [TABLE]: WHEEL_40,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [WHEEL60]: {
    [TABLE]: WHEEL_60,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [WHEEL80]: {
    [TABLE]: WHEEL_80,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [DRAW3BAR]: {
    [TABLE]: DRAWS3BAR,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [DRAWGOLD]: {
    [TABLE]: DRAW_GOLD,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [DRAW3X7]: {
    [TABLE]: DRAW_TRIPEL7,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [RISK_R]: {
    [TABLE]: RISK_RIGHT,
    [ROUTE]: risk_dispatch_process,
    [LOG]: log_risiko,
  },
  [RISK_L]: {
    [TABLE]: RISK_LEFT,
    [ROUTE]: risk_dispatch_process,
    [LOG]: log_risiko,
  },
  [JACKPOT]: {
    [ROUTE]: jackpot_route,
    [LOG]: log_jackpot,
  },
  [WIN]: {
    [ROUTE]: win_route,
    [LOG]: log_win,
  },
  [EXTRA_PLUS]: {
    [ROUTE]: extra_plus_process,
    [LOG]: log_srplus,
  },
  [NEXT_ROW]: {
    [TABLE]: BONUS_SCHEME,
    [ROWS]: WINNING_ROWS,
    [ROUTE]: next_row_process,
    [LOG]: log_next_row,
  },
  [START4S]: {
    [TABLE]: WHEEL_START4S,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [START8S]: {
    [TABLE]: WHEEL_START8S,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [START8T]: {
    [TABLE]: WHEEL_START8T,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [START20T]: {
    [TABLE]: WHEEL_START20T,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [START40T]: {
    [TABLE]: WHEEL_START40T,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [START6S]: {
    [TABLE]: WHEEL_START6S,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [START12S]: {
    [TABLE]: WHEEL_START12S,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [START12T]: {
    [TABLE]: WHEEL_START12T,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [START25T]: {
    [TABLE]: WHEEL_START25T,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
  [START50T]: {
    [TABLE]: WHEEL_START50T,
    [ROUTE]: draw_process,
    [LOG]: log_wheel,
  },
};

function get_risk_step(state, next_state, win_index) {
  if (next_state === RISK_L) {
    if (state === ROLLERS || state === NEXT_ROW) {
      const symbol = STATES[state][TABLE][game_mode]()[win_index][COLUMN_SYMBOL];
      if (symbol !== NOPE) {
        return RISK_LEFT[SYMBOLS].indexOf(symbol);
      }
      return win_index;
    }
    return RISK_LEFT[SYMBOLS].indexOf(STATES[state][TABLE][SYMBOLS][win_index]);
  } else if (next_state === RISK_R) {
    if (state === ROLLERS || state === NEXT_ROW) {
      const symbol = STATES[state][TABLE][game_mode]()[win_index][COLUMN_SYMBOL];
      if (symbol !== NOPE) {
        return RISK_RIGHT[SYMBOLS].indexOf(symbol);
      }
      return win_index;
    }
    return RISK_RIGHT[SYMBOLS].indexOf(STATES[state][TABLE][SYMBOLS][win_index]);
  }
  return win_index;
}

async function main() {
  let state = ROLLERS;
  let index = UNDEFINED;
  let game_cnt = 1;
  let tick = 1;

  currentState = state;
  currentIndex = index;

  try {
    while (state !== END_OF_GAME && game_cnt < NUM_GAMES + 1) {
      currentState = state;
      currentIndex = index;

      state = pre_rules(state, index);
      currentState = state;
      currentIndex = index;

      state = await handle_keys_textmode(state, index);

      if (state === END_OF_GAME) {
        break;
      }

      if (state !== WIN) {
        for (const z of Object.keys(carry)) {
          carry[z] = 0;
        }
      }

      let next_state;
      [next_state, index] = STATES[state][ROUTE](STATES, state, index);

      next_state = post_rules(state, next_state, index);

      STATES[state][LOG](game_cnt, STATES, state, index);

      const old_step = index;
      index = get_risk_step(state, next_state, index);

      if (next_state === ROLLERS) {
        game_cnt += 1;
      }

      state = next_state;
      currentState = state;
      currentIndex = index;
      tick += 1;
      void old_step;

      if (stopRequested) {
        state = END_OF_GAME;
        break;
      }

      if (INTERACTIVE) {
        await new Promise((r) => setTimeout(r, 0));
      } else if (tick % 100 === 0) {
        await new Promise((r) => setTimeout(r, 0));
      }
    }
  } catch (e) {
    if (e.message !== 'GAME_EXIT') {
      throw e;
    }
  }
}

function print_stats() {
  const quote = counter[MONEY_TOTAL] * 100.0 / (NUM_GAMES * DEPOSIT);
  uiPrint("----------------------------------------------");
  uiPrint(`Rotor games: ${num_games}`);
  uiPrint("----------------------------------------------");
  uiPrint("----------------------------------------------");
  uiPrint(`Payout Rate: ${quote.toFixed(2)}`);
  uiPrint("----------------------------------------------");
  uiPrint("----------------------------------------------");
  uiPrint("Occurrence of symbols:");
  uiPrint("----------------------------------------------");
  uiPrint(" ");
  const sortiert = Object.keys(stats).sort();
  for (const name of sortiert) {
    uiPrint(name);
    uiPrint("----------------------------------------------");
    let cash = 0;
    let top = 0;
    let master = 0;
    for (const symbol of Object.keys(stats[name])) {
      const i = STATES[name][TABLE][SYMBOLS].indexOf(symbol);
      const a = stats[name][symbol];
      const summe = a * STATES[name][TABLE][PRIZE][i];
      const wahr = STATES[name][TABLE][PROPABILITY][i];
      uiPrint(`${symbol}${" ".repeat(Math.max(0, 20 - symbol.length))} times ${String(a)}${" ".repeat(Math.max(0, 10 - String(a).length))} Prob. ${wahr}`);
      if (symbol.slice(-1) === "C") cash += summe;
      if (symbol.slice(-1) === "T") top += summe;
      if (symbol.slice(-1) === "M") master += summe;
    }
    uiPrint("----------------------------------------------");
    uiPrint(`Sum of Turbo-Games: ${top} Super-Games: ${master} Money: ${cash}`);
    uiPrint(" ");
  }
  uiPrint("----------------------------------------------");
  uiPrint("----------------------------------------------");
  uiPrint(`Sum of all draws: ${num_draws}`);
  uiPrint("----------------------------------------------");
  uiPrint("----------------------------------------------");
  uiPrint(`Sum of all prizes: ${num_won}`);
  uiPrint("----------------------------------------------");
  uiPrint("----------------------------------------------");
  uiPrint(`Sum of all wheels of forutune: ${num_wheel}`);
  uiPrint("----------------------------------------------");
  uiPrint("----------------------------------------------");
  uiPrint("All counters:");
  uiPrint("----------------------------------------------");
  const summen = [];
  const sortiertCounter = Object.keys(counter).sort();
  for (const z of sortiertCounter) {
    if (!z.startsWith("Sum")) {
      uiPrint(`${z}${" ".repeat(Math.max(0, 20 - z.length))} Value: ${counter[z]}`);
      uiPrint("----------------------------------------------");
    } else {
      summen.push(z);
    }
  }
  uiPrint("----------------------------------------------");
  uiPrint("Sum of all prizes");
  uiPrint("----------------------------------------------");
  for (const s of summen) {
    uiPrint(`${s} ${counter[s]}`);
    uiPrint("----------------------------------------------");
  }
  uiPrint("----------------------------------------------");
  uiPrint(`Payout Rate: ${quote.toFixed(2)}`);
  uiPrint("----------------------------------------------");
}

function create_inner_string(strg) {
  let inner = '';
  let int_puff = "";
  let i = 0;
  let do_int = 0;
  let c = '';
  while (i < strg.length) {
    if (strg[i] !== '[' && strg[i] !== ']' &&
        !do_int) {
      c = strg[i];
    }
    if (strg[i] === '[') {
      do_int = 1;
    } else if (strg[i] === ']') {
      do_int = 0;
      const x = parseInt(int_puff, 10) - 1;
      inner += x * c;
      int_puff = '';
      c = '';
    } else if (do_int) {
      int_puff += strg[i];
    } else if (!do_int) {
      inner += c;
    }
    i += 1;
  }
  return inner;
}

function create_macro(strg) {
  const tokens = strg.split('X');
  let i = 0;
  let result = '';
  try {
    if (tokens.length > 1) {
      let maxi;
      if (tokens.length % 2 === 0) {
        maxi = tokens.length - 1;
      } else {
        maxi = tokens.length - 2;
      }
      while (i < maxi) {
        result += create_inner_string(tokens[i]).repeat(parseInt(tokens[i + 1], 10));
        i += 2;
      }
      if (maxi === tokens.length - 2) {
        result += create_inner_string(tokens[tokens.length - 1]);
      }
    } else {
      result = create_inner_string(tokens[0]);
    }
  } catch (e) {
    uiPrint("ERROR: Macro string does not fit!!!");
    exitGame("ERROR: Macro string does not fit!!!");
  }
  return result;
}

const exclude = [ROLLERS, WIN, JACKPOT, RISK_R, RISK_L, EXTRA_PLUS, NEXT_ROW];
for (const name of Object.keys(STATES)) {
  if (!exclude.includes(name)) {
    stats[name] = {};
  }
}
for (const name of Object.keys(stats)) {
  for (const symbol of STATES[name][TABLE][SYMBOLS]) {
    stats[name][symbol] = 0;
  }
}

window.SlotMain = {
  main, setUiHooks, enableInteractiveMode, configureGame, print_stats, create_macro,
  resetSimulation, requestStop,
  getState, getIndex, STATES,
  get picture() { return picture; },
  get game_mode() { return game_mode; },
  get winning_line() { return winning_line; },
  get naechste_linie() { return naechste_linie; },
  get winning_combinations() { return winning_combinations; },
  counter, carry,
  NUM_GAMES, INTERACTIVE, LOGGING, BLIND, MACRO, TOTAL, RECEIVING_40, TEST,
  MONEY, JP, TURBO, SUPER, FOUR_ROW, EXTRA_POINT, ROLLERS, RISK_L, RISK_R, END_OF_GAME, UNDEFINED,
};
