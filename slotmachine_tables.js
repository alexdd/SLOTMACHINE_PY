(function() {
// Copyright (c) Alex Duesel — www.tekturcms.de 2026
// slotmachine_tables.js - Tables for slotmachine_main.js
// Ported from slotmachine_tables.py (Alex Duesel, GPL-3.0)

const S20C = '20C';
const S40C = '40C';
const S80C = '80C';
const S160 = '160C';
const S2S = '2S';
const S4S = '4S';
const S8S = '8S';
const S8T = '8T';
const S20T = '20T';
const S40T = '40T';
const S80T = '80T';
const S1EX40T = '1SR40T';
const S30C = '30C';
const S50C = '50C';
const S100C = '100C';
const S160C = '160C';
const S200C = '200C';
const S3S = '3S';
const S6S = '6S';
const S12S = '12S';
const S12T = '12T';
const S25T = '25T';
const S50T = '50T';
const S100T = '100T';
const S1EX50T = '1SR50T';
const S1BAR = '1BAR';
const S2BAR = '2BAR';
const S3BAR = '3BAR';
const S7 = '7';
const S1EX = "1EX";
const S2EX = "2EX";
const S5EX = "5SR";
const JACK = 'JACK';
const START4S = 'START4S';
const START6S = 'START6S';
const START8S = 'START8S';
const START12S = 'START12S';
const START8T = 'START8T';
const START12T = 'START12T';
const START20T = 'START20T';
const START40T = 'START40T';
const START25T = 'START25T';
const START50T = 'START50T';
const DRAW20 = 'DRAW20';
const DRAW30 = 'DRAW30';
const DRAW200 = 'DRAW200';
const DRAW300 = 'DRAW300';
const DRAW2S = 'DRAW2S';
const DRAW3S = 'DRAW3S';
const FAIL40 = 'FAIL40';
const FAIL50 = 'FAIL50';
const WHEEL40 = 'Wheel of Fortune 40';
const WHEEL60 = 'Wheel of Fortune 60';
const WHEEL80 = 'Wheel of Fortune 80';
const DRAW3BAR = 'DRAW3BAR';
const DRAWGOLD = 'DRAWGOLD';
const DRAW3X7 = 'Draw Tripel 7';
const RISK_L = 'Risk Left';
const RISK_R = 'Risk Right';
const SYMBOLS = "Symbols";
const PROPABILITY = "Propability";
const JACKPOT = 'JACKPOT';
const TABLE = 'Game Table';
const ROUTE = "Route";
const NEXT_STATE = "Next State";
const PRIZE = "WIN";
const PRIZE_TYPE = "WIN Type";
const MONEY = "Money";
const NOPE = "nothing";
const NORMAL = 'Normal Game';
const SUPER = "Super Games";
const TURBO = "Turbo Games";
const FOUR_ROW = "Four-Row Games";
const NEXT_ROW = 'Next Column Wins';
const WIN = 'WIN!';
const EXTRA_POINT = "Extra Points";
const JP = "Jackpot Points";
const JOKER = 'Joker';
const EXTRA_PLUS = "Extra Plus";
const EXTRA_PLUS_LEFT = "Extra Plus Left";
const EXTRA_PLUS_RIGHT = "Extra Plus Right";
const TOP_LEFT = 0;
const TOP_CENTER = 1;
const TOP_RIGHT = 2;
const BOTTOM_LEFT = 3;
const BOTTOM_CENTER = 4;
const BOTTOM_RIGHT = 5;

const CYLINDER = [[], [], []];

CYLINDER[0] = [ S20C, S1BAR, S50C, S160C, S20C, S1BAR, S3BAR, S1BAR, S30C, S80C, S3BAR, S1BAR, S30C, S160C, S2BAR, S30C, S20C, S30C, S50C, S20C, S30C, S1BAR, S7, S2BAR, S30C, JACK, 
                       S20C, S1BAR, S30C, S1BAR, S20C, S50C, S20C, S30C, S1BAR, S50C, S1BAR, S7, S160C, S30C, S20C, S2BAR, S80C, S30C, S20C, S30C, S1BAR, S30C, S1BAR, S30C, S20C, S20C, 
                      S1BAR, S20C, S1BAR, S30C, S80C, S50C, S1BAR, S20C, S1BAR, S2BAR, S1BAR, S20C, S1BAR, S20C, S50C, S1BAR, S3BAR, S50C, S7, S30C, S20C, S20C, S30C, S1BAR, S30C, S1BAR, 
                      JACK, S2BAR, S20C, S1BAR, S20C, S1BAR, S30C, S1BAR, S50C, S20C, S20C, S20C, S160C, S1BAR, S1BAR, S20C, S30C, S80C, S1BAR, S50C, S1BAR, S50C, S1BAR, S30C, S1BAR, S30C, S20C ];
CYLINDER[1] = [ S20C, S30C, S30C, S20C, S80C, S20C, S50C, S80C, S50C, S160C, S2BAR, S160C, S20C, S30C, S20C, S50C, S20C, S80C, S30C, S20C, S50C, S7, S20C, S30C, S20C, S20C, S50C, S30C, S20C, 
                        S1BAR, S30C, S20C, S20C, S30C, S20C, S160C, S30C, S20C, S30C, S1BAR, S3BAR, S20C, S80C, S30C, S50C, S20C, S30C, S30C, S160C, S7, S30C, S20C, S160C, S50C, S20C, S50C, S20C, 
                        S80C, S1BAR, S20C, S30C, S20C, S30C, JACK, S20C, S30C, S3BAR, S20C, S50C, S20C, S20C, S30C, S1BAR, S20C, S160C, S30C, S20C, S30C, S7, S20C, S80C, S20C, S30C, S20C, S80C, JACK, 
                        S20C, S30C, S50C, S20C, S30C, S20C, S160C, S50C, S20C, S80C, S1BAR, S20C, S30C, S20C];
CYLINDER[2] = [ S20C, JACK, S80C, S20C, S30C, S20C, S1BAR, S20C, S2BAR, S50C, S30C, S20C, S30C, S160C, S20C, S80C, S7, S20C, S30C, S3BAR, S30C, S80C, JACK, S50C, S20C, S30C, S1BAR, S20C, S30C, 
                        S1BAR, S30C, S7, S50C, S30C, S20C, S50C, S1BAR, S30C, S80C, S20C, S20C, S1BAR, S2BAR, S30C, S30C, S1BAR, S50C, S30C, S160C,  S20C, S1BAR, S20C, S160C, S1BAR, S20C,  S30C, S20C,
                        S80C, S2BAR, S30C, S20C, S30C, S7, S50C, S80C, S1BAR, S30C, S80C, S20C, S30C, S20C, S160C, S20C, S50C, S20C, S30C, S20C, S1BAR, S50C, S30C, S50C, S1BAR, S30C, S20C, S50C, S3BAR, 
                        S20C, S30C, S20C, S160C, S1BAR, S20C, S30C, S50C, S20C, S30C, S50C, S80C, S20C, S1BAR];

const DRAW_20 = {
  [SYMBOLS]:            [S20C,   S40C,   S80C,   S160C,  DRAW200, S2S,    S4S,    S8S,    S8T,    S20T],
  [PROPABILITY]: [850,    140,    3,      1,      1,      1,      1,      1,      1,      1],
  [NEXT_STATE]: [RISK_R, RISK_R, RISK_R, RISK_R, DRAW200, RISK_R, RISK_R, RISK_R, RISK_R, RISK_R],
  [PRIZE]: [20,     40,     80,     160,    0,      2,      4,      8,      8,      20],
  [PRIZE_TYPE]: [MONEY,   MONEY,   MONEY,   MONEY,   NOPE,    SUPER, SUPER, SUPER, TURBO,    TURBO],
};

const DRAW_30 = {
  [SYMBOLS]:            [S30C,   S50C,   S100C,  S200C,  DRAW300, S3S,    S6S,    S12S,   S12T,   S25T],
  [PROPABILITY]: [850,    140,    3,      1,      1,      1,      1,      1,      1,      1],
  [NEXT_STATE]: [RISK_L, RISK_L, RISK_L, RISK_L, DRAW300, RISK_L, RISK_L, RISK_L, RISK_L, RISK_L],
  [PRIZE]: [30,     50,     100,    200,    0,      3,      6,      12,     12,     25],
  [PRIZE_TYPE]: [MONEY,   MONEY,   MONEY,   MONEY,   NOPE,    SUPER, SUPER, SUPER, TURBO,    TURBO],
};

const DRAW_200 = {
  [SYMBOLS]:             [S2S,    S4S,    S8S,    S8T],
  [PROPABILITY]: [900,    95,     4,      1],
  [NEXT_STATE]: [RISK_R, RISK_R, RISK_R, RISK_R],
  [PRIZE]: [2,      4,      8,      8],
  [PRIZE_TYPE]: [SUPER, SUPER, SUPER, TURBO],
};

const DRAW_300 = {
  [SYMBOLS]:            [S3S,    S6S,    S12S,   S12T],
  [PROPABILITY]: [900,    95,     4,      1],
  [NEXT_STATE]: [RISK_L, RISK_L, RISK_L, RISK_L],
  [PRIZE]: [3,      6,      12,     12],
  [PRIZE_TYPE]: [SUPER, SUPER, SUPER, TURBO],
};

const DRAWS2S = {
  [SYMBOLS]:            [S2S,    S3S,    S4S,    S6S,    S8S,    S12S,   S8T,    S12T,   S20T,   S25T,   S40T,   S50T,   S80T, S100T, S1EX,S2EX,S5EX, JACKPOT],
  [PROPABILITY]: [600,    170,    100,    50,     30,     20,     5,      5,      5,      5,      3,      1,      1,    1,     1,   1,   1,    1],
  [NEXT_STATE]: [RISK_R, RISK_L, RISK_R, RISK_L, RISK_R, RISK_L, RISK_R, RISK_L, RISK_R, RISK_L, RISK_R, RISK_L, WIN,  WIN,   WIN, WIN, WIN,  JACKPOT],
  [PRIZE]: [2,      3,      4,      6,      8,      12,     8,      12,     20,     25,     40,     50,     80,   100,   1,   2,   5,    0],
  [PRIZE_TYPE]: [SUPER, SUPER, SUPER, SUPER, SUPER, SUPER, TURBO,    TURBO,    TURBO,    TURBO,    TURBO,    TURBO,    TURBO,  TURBO,   EXTRA_POINT,  EXTRA_POINT,  EXTRA_POINT,   NOPE],
};

const DRAWS3S = {
  [SYMBOLS]:            [S3S,    S4S,    S6S,    S8S,    S12S,   S8T,    S12T,   S20T,   S25T,   S40T,   S50T,   S80T, S100T, S1EX,S2EX,S5EX, JACKPOT],
  [PROPABILITY]: [700,    170,    50,     30,     20,     10,     5,      3,      3,      2,      1,      1,    1,     1,   1,   1,    1],
  [NEXT_STATE]: [RISK_L, RISK_R, RISK_L, RISK_R, RISK_L, RISK_R, RISK_L, RISK_R, RISK_L, RISK_R, RISK_L, WIN,  WIN,   WIN, WIN, WIN,  JACKPOT],
  [PRIZE]: [3,      4,      6,      8,      12,     8,      12,     20,     25,     40,     50,     80,   100,   1,   2,   5,    0],
  [PRIZE_TYPE]: [SUPER, SUPER, SUPER, SUPER, SUPER, TURBO,    TURBO,    TURBO,    TURBO,    TURBO,    TURBO,    TURBO,  TURBO,   EXTRA_POINT,  EXTRA_POINT,  EXTRA_POINT,   NOPE],
};

const DRAW_FAIL_40 = {
  [SYMBOLS]:            [S20T, S40T, S80T, S1EX40T],
  [PROPABILITY]: [450,  400,  100,   50],
  [NEXT_STATE]: [WIN,  WIN,  WIN,  WIN],
  [PRIZE]: [20,   40,   80,   140],
  [PRIZE_TYPE]: [TURBO,  TURBO,  TURBO,  TURBO],
};

const DRAW_FAIL_50 = {
  [SYMBOLS]:            [S25T, S50T, S100T, S1EX50T],
  [PROPABILITY]: [430,  405,  115,    50],
  [NEXT_STATE]: [WIN,  WIN,  WIN,   WIN],
  [PRIZE]: [25,   50,   100,   150],
  [PRIZE_TYPE]: [TURBO,  TURBO,  TURBO,   TURBO],
};

const WHEEL_40 = {
  [SYMBOLS]:            [S20T, S25T, S40T, S50T, S80T, S100T],
  [PROPABILITY]: [280,  270,  150,  120,  100,  80],
  [NEXT_STATE]: [WIN,  WIN,  WIN,  WIN,  WIN,  WIN],
  [PRIZE]: [20,   25,   40,   50,   80,   100],
  [PRIZE_TYPE]: [TURBO,  TURBO,  TURBO,  TURBO,  TURBO,  TURBO],
};

const WHEEL_60 = {
  [SYMBOLS]:            [S50T, S80T, S100T],
  [PROPABILITY]: [700,  220,  80],
  [NEXT_STATE]: [WIN,  WIN,  WIN],
  [PRIZE]: [50,   80,   100],
  [PRIZE_TYPE]: [TURBO,  TURBO,  TURBO],
};

const WHEEL_80 = {
  [SYMBOLS]:            [S80T, S100T],
  [PROPABILITY]: [950,  50],
  [NEXT_STATE]: [WIN,  WIN],
  [PRIZE]: [80,   100],
  [PRIZE_TYPE]: [TURBO,  TURBO],
};

const WHEEL_START4S = {
  [SYMBOLS]:            [S2S,   S4S,   S8S,   S8T,   S1EX],
  [PROPABILITY]: [555,   230,   162,   52,    1],
  [NEXT_STATE]: [RISK_R,RISK_R,RISK_R,RISK_R,WIN],
  [PRIZE]: [2,     4,     8,     8,     1],
  [PRIZE_TYPE]: [SUPER,SUPER,SUPER,TURBO,   EXTRA_POINT],
};

const WHEEL_START6S = {
  [SYMBOLS]:            [S3S,   S6S,   S12S,  S12T,  S1EX],
  [PROPABILITY]: [555,   235,   149,   60,    1],
  [NEXT_STATE]: [RISK_L,RISK_L,RISK_L,RISK_L,WIN],
  [PRIZE]: [3,     6,     12,    12,    1],
  [PRIZE_TYPE]: [SUPER,SUPER,SUPER,TURBO,   EXTRA_POINT],
};

const WHEEL_START8S = {
  [SYMBOLS]:            [S4S,   S8S,   S8T,   S20T,  S1EX],
  [PROPABILITY]: [474,   310,   160,   55,    1],
  [NEXT_STATE]: [RISK_R,RISK_R,RISK_R,RISK_R,WIN],
  [PRIZE]: [4,     8,     8,     20,    1],
  [PRIZE_TYPE]: [SUPER,SUPER,TURBO,   TURBO,   EXTRA_POINT],
};

const WHEEL_START12S = {
  [SYMBOLS]:            [S6S,   S12S,  S12T,  S25T,  S1EX],
  [PROPABILITY]: [490,   310,   110,   89,    1],
  [NEXT_STATE]: [RISK_L,RISK_L,RISK_L,RISK_L,WIN],
  [PRIZE]: [6,     12,    12,    25,    1],
  [PRIZE_TYPE]: [SUPER,SUPER,TURBO,   TURBO,   EXTRA_POINT],
};

const WHEEL_START8T = {
  [SYMBOLS]:            [S8S,   S8T,   S20T,  S40T,  S1EX],
  [PROPABILITY]: [630,   300,   50,    19,    1],
  [NEXT_STATE]: [RISK_R,RISK_R,RISK_R,RISK_R,WIN],
  [PRIZE]: [8,     8,     20,    40,    1],
  [PRIZE_TYPE]: [SUPER,TURBO,   TURBO,   TURBO,   EXTRA_POINT],
};

const WHEEL_START12T = {
  [SYMBOLS]:            [S12S,  S12T,  S25T,  S50T,  S1EX],
  [PROPABILITY]: [650,   240,   90,    19,    1],
  [NEXT_STATE]: [RISK_L,RISK_L,RISK_L,RISK_L,WIN],
  [PRIZE]: [12,    12,    25,    50,    1],
  [PRIZE_TYPE]: [SUPER,TURBO,   TURBO,   TURBO,   EXTRA_POINT],
};

const WHEEL_START20T = {
  [SYMBOLS]:            [S8T,   S20T,  S40T,  S80T,  S1EX],
  [PROPABILITY]: [530,   309,   110,   50,    1],
  [NEXT_STATE]: [RISK_R,RISK_R,RISK_R,RISK_R,WIN],
  [PRIZE]: [8,     20,    40,    80,    1],
  [PRIZE_TYPE]: [TURBO,   TURBO,   TURBO,   TURBO,   EXTRA_POINT],
};

const WHEEL_START25T = {
  [SYMBOLS]:            [S12T,  S25T,  S50T,  S100T, S1EX],
  [PROPABILITY]: [556,   273,   111,   59,    1],
  [NEXT_STATE]: [RISK_L,RISK_L,RISK_L,RISK_L,WIN],
  [PRIZE]: [12,    25,    50,    100,   1],
  [PRIZE_TYPE]: [TURBO,   TURBO,   TURBO,   TURBO,   EXTRA_POINT],
};

const WHEEL_START40T = {
  [SYMBOLS]:            [S20T,  S40T,  S80T,  S1EX40T],
  [PROPABILITY]: [450,   400,   100,   50],
  [NEXT_STATE]: [RISK_R,RISK_R,RISK_R,WIN],
  [PRIZE]: [20,    40,    80,    140],
  [PRIZE_TYPE]: [TURBO,   TURBO,   TURBO,   TURBO],
};

const WHEEL_START50T = {
  [SYMBOLS]:            [S25T,  S50T,  S100T, S1EX50T],
  [PROPABILITY]: [430,   405,   115,   50],
  [NEXT_STATE]: [RISK_L,RISK_L,RISK_L,WIN],
  [PRIZE]: [25,    50,    100,   150],
  [PRIZE_TYPE]: [TURBO,   TURBO,   TURBO,   TURBO],
};

const DRAWS3BAR = {
  [SYMBOLS]:            [S100T, DRAWGOLD],
  [PROPABILITY]: [375,   625],
  [NEXT_STATE]: [WIN,   DRAWGOLD],
  [PRIZE]: [150,   0],
  [PRIZE_TYPE]: [TURBO,   NOPE],
};

const DRAW_GOLD = {
  [SYMBOLS]:            [S20T,   S25T,   S40T,   S50T,   S80T, S100T],
  [PROPABILITY]: [380,    350,    130,    100,    20,   20],
  [NEXT_STATE]: [RISK_R, RISK_L, RISK_R, RISK_L, WIN,  WIN],
  [PRIZE]: [20,     25,     40,     50,     80,   100],
  [PRIZE_TYPE]: [TURBO,    TURBO,    TURBO,    TURBO,    TURBO,  TURBO],
};

const DRAW_TRIPEL7 = {
  [SYMBOLS]:            [S100T, JACKPOT],
  [PROPABILITY]: [250,   750],
  [NEXT_STATE]: [WIN,   JACKPOT],
  [PRIZE]: [200,   0],
  [PRIZE_TYPE]: [TURBO,   NOPE],
};

const RISK_LEFT = {
  [SYMBOLS]:            [S30C, S50C, S100C, S200C, DRAW300, S3S,    S6S,    S12S,   S12T, S25T, S50T, S100T, S1EX50T],
  [PRIZE]: [30,   50,   100,   200,   0,      3,      6,      12,     12,   25,   50,   100,   150],
  [PRIZE_TYPE]: [MONEY, MONEY, MONEY,  MONEY,  NOPE,    SUPER, SUPER, SUPER, TURBO,  TURBO,  TURBO,  TURBO,   TURBO],
};

const RISK_RIGHT = {
  [SYMBOLS]:           [S20C, S40C, S80C, S160C, DRAW200, S2S,    S4S,    S8S,    S8T, S20T, S40T, S80T, S1EX40T],
  [PRIZE]: [20,   40,   80,   160,   0,      2,      4,      8,      8,   20,   40,   80,   140],
  [PRIZE_TYPE]: [MONEY, MONEY, MONEY, MONEY,  NOPE,    SUPER, SUPER, SUPER, TURBO, TURBO,  TURBO,  TURBO,  TURBO],
};

const NORMAL_PLAN = [
  [[JACK,    JACK,  JACK], JACKPOT,      0,         0,     0,   0,       0,         0,       11,    NOPE],
  [[S7,      S7,    S7 ], DRAW3X7,       0,         0,     0,   0,       0,         0,       10,    NOPE],
  [[S3BAR,  S3BAR, S3BAR], DRAW3BAR,      0,         0,     0,   0,       0,         0,       9,     NOPE],
  [[S2BAR,  S2BAR, S2BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S3BAR,  S3BAR, S2BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S2BAR,  S3BAR, S3BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S3BAR,  S2BAR, S3BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S3BAR,  S2BAR, S2BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S2BAR,  S3BAR, S2BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S2BAR,  S2BAR, S3BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S1BAR,  S1BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S3BAR,  S3BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S1BAR,  S3BAR, S3BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S3BAR,  S1BAR, S3BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S3BAR,  S2BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S2BAR,  S3BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S1BAR,  S3BAR, S2BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S1BAR,  S2BAR, S3BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S3BAR,  S1BAR, S2BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S2BAR,  S1BAR, S3BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S2BAR,  S2BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S1BAR,  S2BAR, S2BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S2BAR,  S1BAR, S2BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S3BAR,  S1BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S1BAR,  S3BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S1BAR,  S1BAR, S3BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S2BAR,  S1BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S1BAR,  S2BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S1BAR,  S1BAR, S2BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S160C,  S160C, S160C], RISK_R,     160,         0,     0,  20,       0,         0,       6,     S160C],
  [[S160C,  S160C, S3BAR], RISK_R,     160,         0,     0,  20,       0,         0,       6,     S160C],
  [[S160C,  S160C, S2BAR], RISK_R,     160,         0,     0,  20,       0,         0,       6,     S160C],
  [[S160C,  S160C, S1BAR], RISK_R,     160,         0,     0,  20,       0,         0,       6,     S160C],
  [[S80C,   S80C,  S80C], RISK_R,      80,         0,     0,   0,       0,         0,       5,     S80C],
  [[S80C,   S80C,  S3BAR], RISK_R,      80,         0,     0,   0,       0,         0,       5,     S80C],
  [[S80C,   S80C,  S2BAR], RISK_R,      80,         0,     0,   0,       0,         0,       5,     S80C],
  [[S80C,   S80C,  S1BAR], RISK_R,      80,         0,     0,   0,       0,         0,       5,     S80C],
  [[S50C,   S50C,  S50C], RISK_L,      50,         0,     0,   0,       0,         0,       4,     S50C],
  [[S50C,   S50C,  S3BAR], RISK_L,      50,         0,     0,   0,       0,         0,       4,     S50C],
  [[S50C,   S50C,  S2BAR], RISK_L,      50,         0,     0,   0,       0,         0,       4,     S50C],
  [[S50C,   S50C,  S1BAR], RISK_L,      50,         0,     0,   0,       0,         0,       4,     S50C],
  [[S30C,   S30C,  S30C], DRAW30,        0,         0,     0,   0,       0,         0,       3,     NOPE],
  [[S30C,   S30C,  S3BAR], DRAW30,        0,         0,     0,   0,       0,         0,       3,     NOPE],
  [[S30C,   S30C,  S2BAR], DRAW30,        0,         0,     0,   0,       0,         0,       3,     NOPE],
  [[S30C,   S30C,  S1BAR], DRAW30,        0,         0,     0,   0,       0,         0,       3,     NOPE],
  [[JOKER,  S7,    S7], DRAW30,        0,         0,     0,   0,       0,         0,       3,     NOPE],
  [[S20C,   S20C,  S20C], DRAW20,        0,         0,     0,   0,       0,         0,       2,     NOPE],
  [[S20C,   S20C,  S3BAR], DRAW20,        0,         0,     0,   0,       0,         0,       2,     NOPE],
  [[S20C,   S20C,  S2BAR], DRAW20,        0,         0,     0,   0,       0,         0,       2,     NOPE],
  [[S20C,   S20C,  S1BAR], DRAW20,        0,         0,     0,   0,       0,         0,       2,     NOPE],
  [[JOKER,  JOKER,   S7], DRAW20,        0,         0,     0,   0,       0,         0,       2,     NOPE],
  [[JOKER,  JOKER,   JACK], EXTRA_PLUS,       0,         0,     0,   0,       0,         0,       1,     NOPE]
];

const SUPER_PLAN = [
  [[JACK,    JACK, JACK], JACKPOT,      0,         0,     0,   0,       0,         0,      12,    NOPE],
  [[S7,     S7,    S7], DRAW3X7,       0,         0,     0,   0,       0,         0,      11,     NOPE],
  [[S3BAR,  S3BAR, S3BAR], DRAW3BAR,      0,         0,     0,   0,       0,         0,      10,     NOPE],
  [[S2BAR,  S2BAR, S2BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       9,     NOPE],
  [[S3BAR,  S3BAR, S2BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       9,     NOPE],
  [[S2BAR,  S3BAR, S3BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       9,     NOPE],
  [[S3BAR,  S2BAR, S3BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       9,     NOPE],
  [[S3BAR,  S2BAR, S2BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       9,     NOPE],
  [[S2BAR,  S3BAR, S2BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       9,     NOPE],
  [[S2BAR,  S2BAR, S3BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       9,     NOPE],
  [[S1BAR,  S1BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S3BAR,  S3BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S1BAR,  S3BAR, S3BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S3BAR,  S1BAR, S3BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S3BAR,  S2BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S2BAR,  S3BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S1BAR,  S3BAR, S2BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S1BAR,  S2BAR, S3BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S3BAR,  S1BAR, S2BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S2BAR,  S1BAR, S3BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S2BAR,  S2BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S1BAR,  S2BAR, S2BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S2BAR,  S1BAR, S2BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S3BAR,  S1BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S1BAR,  S3BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S1BAR,  S1BAR, S3BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S2BAR,  S1BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S1BAR,  S2BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S1BAR,  S1BAR, S2BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[JOKER,  JOKER, S7], RISK_L,     200,         0,     0,   0,       0,         0,       7,     S200C],
  [[JOKER,  JOKER, S3BAR], RISK_L,     200,         0,     0,   0,       0,         0,       7,     S200C],
  [[S160C,  S160C, S160C], WIN,        200,         0,     0,   0,       0,         0,       6,     S200C],
  [[S160C,  S160C, S2BAR], WIN,        200,         0,     0,   0,       0,         0,       6,     S200C],
  [[S160C,  S160C, S1BAR], WIN,        200,         0,     0,   0,       0,         0,       6,     S200C],
  [[S80C,   S80C,  S80C], WIN,        200,         0,     0,   0,       0,         0,       5,     S200C],
  [[S80C,   S80C,  S2BAR], WIN,        200,         0,     0,   0,       0,         0,       5,     S200C],
  [[S80C,   S80C,  S1BAR], WIN,        200,         0,     0,   0,       0,         0,       5,     S200C],
  [[S50C,   S50C,  S50C], WIN,        200,         0,     0,   0,       0,         0,       4,     S200C],
  [[S50C,   S50C,  S2BAR], WIN,        200,         0,     0,   0,       0,         0,       4,     S200C],
  [[S50C,   S50C,  S1BAR], WIN,        200,         0,     0,   0,       0,         0,       4,     S200C],
  [[S30C,   S30C,  S30C], WIN,        200,         0,     0,   0,       0,         0,       3,     S200C],
  [[S30C,   S30C,  S2BAR], WIN,        200,         0,     0,   0,       0,         0,       3,     S200C],
  [[S30C,   S30C,  S1BAR], WIN,        200,         0,     0,   0,       0,         0,       3,     S200C],
  [[S20C,   S20C,  S20C], WIN,        200,         0,     0,   0,       0,         0,       2,     S200C],
  [[S20C,   S20C,  S2BAR], WIN,        200,         0,     0,   0,       0,         0,       2,     S200C],
  [[S20C,   S20C,  S1BAR], WIN,        200,         0,     0,   0,       0,         0,       2,     S200C],
  [[JOKER,  JOKER, S2BAR], WIN,        200,         0,     0,   0,       0,         0,       1,     S200C],
  [[JOKER,  JOKER, S1BAR], WIN,        200,         0,     0,   0,       0,         0,       1,     S200C],
  [[JOKER,  JOKER, S160C], WIN,        200,         0,     0,   0,       0,         0,       1,     S200C],
  [[JOKER,  JOKER, JACK], WIN,        200,         0,     0,   0,       0,         0,       1,     S200C]
];

const TURBO_PLAN = [
  [[JACK,    JACK, JACK], JACKPOT,      0,         0,     0,   0,       0,         0,       10,    NOPE],
  [[S7,     S7,    S7], DRAW3X7,       0,         0,     0,   0,       0,         0,       9,     NOPE],
  [[S3BAR,  S3BAR, S3BAR], DRAW3BAR,      0,         0,     0,   0,       0,         0,       8,     NOPE],
  [[S2BAR,  S2BAR, S2BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S3BAR,  S3BAR, S2BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S2BAR,  S3BAR, S3BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S3BAR,  S2BAR, S3BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S3BAR,  S2BAR, S2BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S2BAR,  S3BAR, S2BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S2BAR,  S2BAR, S3BAR], DRAW3S,        0,         0,     0,   0,       0,         0,       7,     NOPE],
  [[S1BAR,  S1BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S3BAR,  S3BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S1BAR,  S3BAR, S3BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S3BAR,  S1BAR, S3BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S3BAR,  S2BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S2BAR,  S3BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S1BAR,  S3BAR, S2BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S1BAR,  S2BAR, S3BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S3BAR,  S1BAR, S2BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S2BAR,  S1BAR, S3BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S2BAR,  S2BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S1BAR,  S2BAR, S2BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S2BAR,  S1BAR, S2BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S3BAR,  S1BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S1BAR,  S3BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S1BAR,  S1BAR, S3BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S2BAR,  S1BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S1BAR,  S2BAR, S1BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S1BAR,  S1BAR, S2BAR], DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE],
  [[S160C,  S160C, S160C], RISK_L,      200,        0,     0,   0,       0,         0,       5,     S200C],
  [[S160C,  S160C, S3BAR], RISK_L,      200,        0,     0,   0,       0,         0,       5,     S200C],
  [[S160C,  S160C, S2BAR], RISK_L,      200,        0,     0,   0,       0,         0,       5,     S200C],
  [[S160C,  S160C, S1BAR], RISK_L,      200,        0,     0,   0,       0,         0,       5,     S200C],
  [[S80C,   S80C,  S80C], RISK_L,      200,        0,     0,   0,       0,         0,       4,     S200C],
  [[S80C,   S80C,  S3BAR], RISK_L,      200,        0,     0,   0,       0,         0,       4,     S200C],
  [[S80C,   S80C,  S2BAR], RISK_L,      200,        0,     0,   0,       0,         0,       4,     S200C],
  [[S80C,   S80C,  S1BAR], RISK_L,      200,        0,     0,   0,       0,         0,       4,     S200C],
  [[S50C,   S50C,  S50C], RISK_L,      200,        0,     0,   0,       0,         0,       3,     S200C],
  [[S50C,   S50C,  S3BAR], RISK_L,      200,        0,     0,   0,       0,         0,       3,     S200C],
  [[S50C,   S50C,  S2BAR], RISK_L,      200,        0,     0,   0,       0,         0,       3,     S200C],
  [[S50C,   S50C,  S1BAR], RISK_L,      200,        0,     0,   0,       0,         0,       3,     S200C],
  [[S30C,   S30C,  S30C], RISK_L,      200,        0,     0,   0,       0,         0,       2,     S200C],
  [[S30C,   S30C,  S3BAR], RISK_L,      200,        0,     0,   0,       0,         0,       2,     S200C],
  [[S30C,   S30C,  S2BAR], RISK_L,      200,        0,     0,   0,       0,         0,       2,     S200C],
  [[S30C,   S30C,  S1BAR], RISK_L,      200,        0,     0,   0,       0,         0,       2,     S200C],
  [[JOKER,  S7,    S7], RISK_L,      200,        0,     0,   0,       0,         0,       2,     S200C],
  [[S20C,   S20C,  S20C], RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C],
  [[S20C,   S20C,  S3BAR], RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C],
  [[S20C,   S20C,  S2BAR], RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C],
  [[S20C,   S20C,  S1BAR], RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C],
  [[JOKER,  JOKER, S7], RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C],
  [[JOKER,  JOKER, S3BAR], RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C],
  [[JOKER,  JOKER, S2BAR], RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C],
  [[JOKER,  JOKER, S1BAR], RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C],
  [[JOKER,  JOKER, S160C], RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C],
  [[JOKER,  JOKER, JACK], RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C]
];

const WINNING_ROWS = {

  [NORMAL]: [[ TOP_LEFT,  TOP_CENTER,  TOP_RIGHT ], [ BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT ]
            ],

  [FOUR_ROW]: [[ TOP_LEFT,  TOP_CENTER,  TOP_RIGHT ], [ BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT ], [ TOP_LEFT,  BOTTOM_CENTER, TOP_RIGHT ], [ BOTTOM_LEFT, TOP_CENTER,  BOTTOM_RIGHT ]
            ],

  [TURBO]: [[ TOP_LEFT,  TOP_CENTER,  TOP_RIGHT ], [ BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT ], [ TOP_LEFT,  BOTTOM_CENTER, TOP_RIGHT ], [ BOTTOM_LEFT, TOP_CENTER,  BOTTOM_RIGHT ]
            ],

  [SUPER]: [[ TOP_LEFT,  TOP_CENTER,  TOP_RIGHT ], [ BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT ]
            ]
  };

window.SlotTables = { S20C, S40C, S80C, S160, S2S, S4S, S8S, S8T, S20T, S40T, S80T, S1EX40T, S30C, S50C, S100C, S160C, S200C, S3S, S6S, S12S, S12T, S25T, S50T, S100T, S1EX50T, S1BAR, S2BAR, S3BAR, S7, S1EX, S2EX, S5EX, JACK, START4S, START6S, START8S, START12S, START8T, START12T, START20T, START40T, START25T, START50T, DRAW20, DRAW30, DRAW200, DRAW300, DRAW2S, DRAW3S, FAIL40, FAIL50, WHEEL40, WHEEL60, WHEEL80, DRAW3BAR, DRAWGOLD, DRAW3X7, RISK_L, RISK_R, SYMBOLS, PROPABILITY, JACKPOT, TABLE, ROUTE, NEXT_STATE, PRIZE, PRIZE_TYPE, MONEY, NOPE, NORMAL, SUPER, TURBO, FOUR_ROW, NEXT_ROW, WIN, EXTRA_POINT, JP, JOKER, EXTRA_PLUS, EXTRA_PLUS_LEFT, EXTRA_PLUS_RIGHT, TOP_LEFT, TOP_CENTER, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT, CYLINDER, DRAW_20, DRAW_30, DRAW_200, DRAW_300, DRAWS2S, DRAWS3S, DRAW_FAIL_40, DRAW_FAIL_50, WHEEL_40, WHEEL_60, WHEEL_80, WHEEL_START4S, WHEEL_START6S, WHEEL_START8S, WHEEL_START12S, WHEEL_START8T, WHEEL_START12T, WHEEL_START20T, WHEEL_START25T, WHEEL_START40T, WHEEL_START50T, DRAWS3BAR, DRAW_GOLD, DRAW_TRIPEL7, RISK_LEFT, RISK_RIGHT, NORMAL_PLAN, SUPER_PLAN, TURBO_PLAN, WINNING_ROWS };
})();
