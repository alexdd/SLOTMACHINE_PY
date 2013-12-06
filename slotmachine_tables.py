# -*- coding: cp1252 -*-

#    Copyright (C) 2005  by Alex Duesel <alex@alex-duesel.de>
#                                homepage: http://www.mandarine.tv
#                                See file license.txt for licensing issues
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.

# slotmachine_tables.py - Tables for slotmachine_main.py

# constants and setting text for console output 

S20C = '20C'
S40C = '40C'
S80C = '80C'
S160 = '160C'
S2S = '2S'
S4S = '4S'
S8S = '8S'
S8T = '8T'
S20T = '20T'
S40T = '40T'
S80T = '80T'
S1EX40T ='1SR40T'
S30C = '30C'
S50C = '50C'
S100C = '100C'
S160C = '160C'
S200C = '200C'
S3S = '3S'
S6S = '6S'
S12S = '12S'
S12T = '12T'
S25T = '25T'
S50T = '50T'
S100T = '100T'
S1EX50T ='1SR50T'
S1BAR = '1BAR'
S2BAR = '2BAR'
S3BAR = '3BAR'
S7 = '7'
S1EX = "1EX"
S2EX = "2EX"
S5EX = "5SR"
JACK = 'JACK'
START4S = 'START4S'
START6S = 'START6S'
START8S = 'START8S'
START12S = 'START12S'
START8T = 'START8T'
START12T = 'START12T'
START20T = 'START20T'
START40T = 'START40T'
START25T = 'START25T'
START50T = 'START50T'
DRAW20 = 'DRAW20'
DRAW30 = 'DRAW30'
DRAW200 = 'DRAW200'
DRAW300 = 'DRAW300'
DRAW2S = 'DRAW2S'
DRAW3S = 'DRAW3S'
FAIL40 = 'FAIL40'
FAIL50 = 'FAIL50'
WHEEL40 = 'Wheel of Fortune 40'
WHEEL60 = 'Wheel of Fortune 60'
WHEEL80 = 'Wheel of Fortune 80'
DRAW3BAR = 'DRAW3BAR'
DRAWGOLD = 'DRAWGOLD'
DRAW3X7 = 'Draw Tripel 7'
RISK_L = 'Risk Left'
RISK_R = 'Risk Right'
SYMBOLS = "Symbols"
PROPABILITY = "Propability"
JACKPOT = 'JACKPOT'
TABLE = 'Game Table'
ROUTE = "Route"
NEXT_STATE = "Next State"
PRIZE = "WIN"
PRIZE_TYPE = "WIN Type"
MONEY = "Money"
NOPE = "nothing"
NORMAL = 'Normal Game'
SUPER = "Super Games"
TURBO = "Turbo Games"
FOUR_ROW = "Four-Row Games"
NEXT_ROW = 'Next Column Wins'
WIN = 'WIN!'
EXTRA_POINT = "Extra Points"
JP = "Jackpot Points"
JOKER = 'Joker'
EXTRA_PLUS = "Extra Plus"
EXTRA_PLUS_LEFT = "Extra Plus Left"
EXTRA_PLUS_RIGHT = "Extra Plus Right"
TOP_LEFT = 0   
TOP_CENTER = 1   
TOP_RIGHT = 2  
BOTTOM_LEFT = 3 
BOTTOM_CENTER = 4  
BOTTOM_RIGHT = 5

# cylinders of the ROTOR-GAME

CYLINDER = [(),(),()]

CYLINDER[0] = ( S20C, S1BAR, S50C, S160C, S20C, S1BAR, S3BAR, S1BAR, S30C, S80C, S3BAR, S1BAR, S30C, S160C, S2BAR, S30C, S20C, S30C, S50C, S20C, S30C, S1BAR, S7, S2BAR, S30C, JACK, 
                       S20C, S1BAR, S30C, S1BAR, S20C, S50C, S20C, S30C, S1BAR, S50C, S1BAR, S7, S160C, S30C, S20C, S2BAR, S80C, S30C, S20C, S30C, S1BAR, S30C, S1BAR, S30C, S20C, S20C, 
                      S1BAR, S20C, S1BAR, S30C, S80C, S50C, S1BAR, S20C, S1BAR, S2BAR, S1BAR, S20C, S1BAR, S20C, S50C, S1BAR, S3BAR, S50C, S7, S30C, S20C, S20C, S30C, S1BAR, S30C, S1BAR, 
                      JACK, S2BAR, S20C, S1BAR, S20C, S1BAR, S30C, S1BAR, S50C, S20C, S20C, S20C, S160C, S1BAR, S1BAR, S20C, S30C, S80C, S1BAR, S50C, S1BAR, S50C, S1BAR, S30C, S1BAR, S30C, S20C )
     
CYLINDER[1] = ( S20C, S30C, S30C, S20C, S80C, S20C, S50C, S80C, S50C, S160C, S2BAR, S160C, S20C, S30C, S20C, S50C, S20C, S80C, S30C, S20C, S50C, S7, S20C, S30C, S20C, S20C, S50C, S30C, S20C, 
                        S1BAR, S30C, S20C, S20C, S30C, S20C, S160C, S30C, S20C, S30C, S1BAR, S3BAR, S20C, S80C, S30C, S50C, S20C, S30C, S30C, S160C, S7, S30C, S20C, S160C, S50C, S20C, S50C, S20C, 
                        S80C, S1BAR, S20C, S30C, S20C, S30C, JACK, S20C, S30C, S3BAR, S20C, S50C, S20C, S20C, S30C, S1BAR, S20C, S160C, S30C, S20C, S30C, S7, S20C, S80C, S20C, S30C, S20C, S80C, JACK, 
                        S20C, S30C, S50C, S20C, S30C, S20C, S160C, S50C, S20C, S80C, S1BAR, S20C, S30C, S20C)
       
CYLINDER[2] = ( S20C, JACK, S80C, S20C, S30C, S20C, S1BAR, S20C, S2BAR, S50C, S30C, S20C, S30C, S160C, S20C, S80C, S7, S20C, S30C, S3BAR, S30C, S80C, JACK, S50C, S20C, S30C, S1BAR, S20C, S30C, 
                        S1BAR, S30C, S7, S50C, S30C, S20C, S50C, S1BAR, S30C, S80C, S20C, S20C, S1BAR, S2BAR, S30C, S30C, S1BAR, S50C, S30C, S160C,  S20C, S1BAR, S20C, S160C, S1BAR, S20C,  S30C, S20C,
                        S80C, S2BAR, S30C, S20C, S30C, S7, S50C, S80C, S1BAR, S30C, S80C, S20C, S30C, S20C, S160C, S20C, S50C, S20C, S30C, S20C, S1BAR, S50C, S30C, S50C, S1BAR, S30C, S20C, S50C, S3BAR, 
                        S20C, S30C, S20C, S160C, S1BAR, S20C, S30C, S50C, S20C, S30C, S50C, S80C, S20C, S1BAR)

# DRAW tables after ROTOR-GAME finsished 

DRAW_20 = {
  SYMBOLS :            [S20C,   S40C,   S80C,   S160C,  DRAW200, S2S,    S4S,    S8S,    S8T,    S20T],
  PROPABILITY : (850,    140,    3,      1,      1,      1,      1,      1,      1,      1),
  NEXT_STATE :       (RISK_R, RISK_R, RISK_R, RISK_R, DRAW200, RISK_R, RISK_R, RISK_R, RISK_R, RISK_R),
  PRIZE :             (20,     40,     80,     160,    0,      2,      4,      8,      8,      20),
  PRIZE_TYPE :          (MONEY,   MONEY,   MONEY,   MONEY,   NOPE,    SUPER, SUPER, SUPER, TURBO,    TURBO),
  }

DRAW_30 = {
  SYMBOLS :            [S30C,   S50C,   S100C,  S200C,  DRAW300, S3S,    S6S,    S12S,   S12T,   S25T],
  PROPABILITY : (850,    140,    3,      1,      1,      1,      1,      1,      1,      1),
  NEXT_STATE :       (RISK_L, RISK_L, RISK_L, RISK_L, DRAW300, RISK_L, RISK_L, RISK_L, RISK_L, RISK_L),
  PRIZE :             (30,     50,     100,    200,    0,      3,      6,      12,     12,     25),
  PRIZE_TYPE :          (MONEY,   MONEY,   MONEY,   MONEY,   NOPE,    SUPER, SUPER, SUPER, TURBO,    TURBO),
  }

DRAW_200 = {   
  SYMBOLS :             [S2S,    S4S,    S8S,    S8T],
  PROPABILITY :  (900,    95,     4,      1),
  NEXT_STATE :        (RISK_R, RISK_R, RISK_R, RISK_R),
  PRIZE :              (2,      4,      8,      8),
  PRIZE_TYPE :           (SUPER, SUPER, SUPER, TURBO),
  }

DRAW_300 = {   
  SYMBOLS :            [S3S,    S6S,    S12S,   S12T],
  PROPABILITY : (900,    95,     4,      1),
  NEXT_STATE :       (RISK_L, RISK_L, RISK_L, RISK_L),
  PRIZE :             (3,      6,      12,     12),
  PRIZE_TYPE :          (SUPER, SUPER, SUPER, TURBO),
  }

DRAWS2S = {
  SYMBOLS :            [S2S,    S3S,    S4S,    S6S,    S8S,    S12S,   S8T,    S12T,   S20T,   S25T,   S40T,   S50T,   S80T, S100T, S1EX,S2EX,S5EX, JACKPOT],
  PROPABILITY : (600,    170,    100,    50,     30,     20,     5,      5,      5,      5,      3,      1,      1,    1,     1,   1,   1,    1),
  NEXT_STATE :       (RISK_R, RISK_L, RISK_R, RISK_L, RISK_R, RISK_L, RISK_R, RISK_L, RISK_R, RISK_L, RISK_R, RISK_L, WIN,  WIN,   WIN, WIN, WIN,  JACKPOT),
  PRIZE :             (2,      3,      4,      6,      8,      12,     8,      12,     20,     25,     40,     50,     80,   100,   1,   2,   5,    0),
  PRIZE_TYPE :          (SUPER, SUPER, SUPER, SUPER, SUPER, SUPER, TURBO,    TURBO,    TURBO,    TURBO,    TURBO,    TURBO,    TURBO,  TURBO,   EXTRA_POINT,  EXTRA_POINT,  EXTRA_POINT,   NOPE),
  }

DRAWS3S = {
  SYMBOLS :            [S3S,    S4S,    S6S,    S8S,    S12S,   S8T,    S12T,   S20T,   S25T,   S40T,   S50T,   S80T, S100T, S1EX,S2EX,S5EX, JACKPOT],
  PROPABILITY : (700,    170,    50,     30,     20,     10,     5,      3,      3,      2,      1,      1,    1,     1,   1,   1,    1),
  NEXT_STATE :       (RISK_L, RISK_R, RISK_L, RISK_R, RISK_L, RISK_R, RISK_L, RISK_R, RISK_L, RISK_R, RISK_L, WIN,  WIN,   WIN, WIN, WIN,  JACKPOT),
  PRIZE :             (3,      4,      6,      8,      12,     8,      12,     20,     25,     40,     50,     80,   100,   1,   2,   5,    0),
  PRIZE_TYPE :          (SUPER, SUPER, SUPER, SUPER, SUPER, TURBO,    TURBO,    TURBO,    TURBO,    TURBO,    TURBO,    TURBO,  TURBO,   EXTRA_POINT,  EXTRA_POINT,  EXTRA_POINT,   NOPE),
  }

DRAW_FAIL_40 = {
  SYMBOLS :            [S20T, S40T, S80T, S1EX40T],
  PROPABILITY : (450,  400,  100,   50),
  NEXT_STATE :       (WIN,  WIN,  WIN,  WIN),
  PRIZE :             (20,   40,   80,   140),
  PRIZE_TYPE :          (TURBO,  TURBO,  TURBO,  TURBO)
  }

DRAW_FAIL_50 = {
  SYMBOLS :            [S25T, S50T, S100T, S1EX50T],
  PROPABILITY : (430,  405,  115,    50),
  NEXT_STATE :       (WIN,  WIN,  WIN,   WIN),
  PRIZE :             (25,   50,   100,   150),
  PRIZE_TYPE :          (TURBO,  TURBO,  TURBO,   TURBO)
  }
  
WHEEL_40 = {
  SYMBOLS :            [S20T, S25T, S40T, S50T, S80T, S100T],
  PROPABILITY : (280,  270,  150,  120,  100,  80),
  NEXT_STATE :       (WIN,  WIN,  WIN,  WIN,  WIN,  WIN),
  PRIZE :             (20,   25,   40,   50,   80,   100),
  PRIZE_TYPE :          (TURBO,  TURBO,  TURBO,  TURBO,  TURBO,  TURBO)
  }

WHEEL_60 = {
  SYMBOLS :            [S50T, S80T, S100T],
  PROPABILITY : (700,  220,  80),
  NEXT_STATE :       (WIN,  WIN,  WIN),
  PRIZE :             (50,   80,   100),
  PRIZE_TYPE :          (TURBO,  TURBO,  TURBO)
  }

WHEEL_80 = {
  SYMBOLS :            [S80T, S100T],
  PROPABILITY : (950,  50),
  NEXT_STATE :       (WIN,  WIN),
  PRIZE :             (80,   100),
  PRIZE_TYPE :          (TURBO,  TURBO)
  }
  
WHEEL_START4S = {
  SYMBOLS :            [S2S,   S4S,   S8S,   S8T,   S1EX],
  PROPABILITY : (555,   230,   162,   52,    1),
  NEXT_STATE :       (RISK_R,RISK_R,RISK_R,RISK_R,WIN),
  PRIZE :             (2,     4,     8,     8,     1),
  PRIZE_TYPE :          (SUPER,SUPER,SUPER,TURBO,   EXTRA_POINT)
  }

WHEEL_START6S = {
  SYMBOLS :            [S3S,   S6S,   S12S,  S12T,  S1EX],
  PROPABILITY : (555,   235,   149,   60,    1),
  NEXT_STATE :       (RISK_L,RISK_L,RISK_L,RISK_L,WIN),
  PRIZE :             (3,     6,     12,    12,    1),
  PRIZE_TYPE :          (SUPER,SUPER,SUPER,TURBO,   EXTRA_POINT)
  }

WHEEL_START8S = {
  SYMBOLS :            [S4S,   S8S,   S8T,   S20T,  S1EX],
  PROPABILITY : (474,   310,   160,   55,    1),
  NEXT_STATE :       (RISK_R,RISK_R,RISK_R,RISK_R,WIN),
  PRIZE :             (4,     8,     8,     20,    1),
  PRIZE_TYPE :          (SUPER,SUPER,TURBO,   TURBO,   EXTRA_POINT)
  }

WHEEL_START12S = {
  SYMBOLS :            [S6S,   S12S,  S12T,  S25T,  S1EX],
  PROPABILITY : (490,   310,   110,   89,    1),
  NEXT_STATE :       (RISK_L,RISK_L,RISK_L,RISK_L,WIN),
  PRIZE :             (6,     12,    12,    25,    1),
  PRIZE_TYPE :          (SUPER,SUPER,TURBO,   TURBO,   EXTRA_POINT)
  }

WHEEL_START8T = {
  SYMBOLS :            [S8S,   S8T,   S20T,  S40T,  S1EX],
  PROPABILITY : (630,   300,   50,    19,    1),
  NEXT_STATE :       (RISK_R,RISK_R,RISK_R,RISK_R,WIN),
  PRIZE :             (8,     8,     20,    40,    1),
  PRIZE_TYPE :          (SUPER,TURBO,   TURBO,   TURBO,   EXTRA_POINT)
  }

WHEEL_START12T = {
  SYMBOLS :            [S12S,  S12T,  S25T,  S50T,  S1EX],
  PROPABILITY : (650,   240,   90,    19,    1),
  NEXT_STATE :       (RISK_L,RISK_L,RISK_L,RISK_L,WIN),
  PRIZE :             (12,    12,    25,    50,    1),
  PRIZE_TYPE :          (SUPER,TURBO,   TURBO,   TURBO,   EXTRA_POINT)
  }

WHEEL_START20T = {
  SYMBOLS :            [S8T,   S20T,  S40T,  S80T,  S1EX],
  PROPABILITY : (530,   309,   110,   50,    1),
  NEXT_STATE :       (RISK_R,RISK_R,RISK_R,RISK_R,WIN),
  PRIZE :             (8,     20,    40,    80,    1),
  PRIZE_TYPE :          (TURBO,   TURBO,   TURBO,   TURBO,   EXTRA_POINT)
  }

WHEEL_START25T = {
  SYMBOLS :            [S12T,  S25T,  S50T,  S100T, S1EX],
  PROPABILITY : (556,   273,   111,   59,    1),
  NEXT_STATE :       (RISK_L,RISK_L,RISK_L,RISK_L,WIN),
  PRIZE :             (12,    25,    50,    100,   1),
  PRIZE_TYPE :          (TURBO,   TURBO,   TURBO,   TURBO,   EXTRA_POINT)
  }

WHEEL_START40T = {
  SYMBOLS :            [S20T,  S40T,  S80T,  S1EX40T],
  PROPABILITY : (450,   400,   100,   50),
  NEXT_STATE :       (RISK_R,RISK_R,RISK_R,WIN),
  PRIZE :             (20,    40,    80,    140),
  PRIZE_TYPE :          (TURBO,   TURBO,   TURBO,   TURBO)
  }

WHEEL_START50T = {
  SYMBOLS :            [S25T,  S50T,  S100T, S1EX50T],
  PROPABILITY : (430,   405,   115,   50),
  NEXT_STATE :       (RISK_L,RISK_L,RISK_L,WIN),
  PRIZE :             (25,    50,    100,   150),
  PRIZE_TYPE :          (TURBO,   TURBO,   TURBO,   TURBO)
  }

DRAWS3BAR = {
  SYMBOLS :            [S100T, DRAWGOLD],
  PROPABILITY : (375,   625),
  NEXT_STATE :       (WIN,   DRAWGOLD),
  PRIZE :             (150,   0),
  PRIZE_TYPE :          (TURBO,   NOPE)
  }

DRAW_GOLD = {
  SYMBOLS :            [S20T,   S25T,   S40T,   S50T,   S80T, S100T],
  PROPABILITY : (380,    350,    130,    100,    20,   20),
  NEXT_STATE :       (RISK_R, RISK_L, RISK_R, RISK_L, WIN,  WIN),
  PRIZE :             (20,     25,     40,     50,     80,   100),
  PRIZE_TYPE :          (TURBO,    TURBO,    TURBO,    TURBO,    TURBO,  TURBO)
  }
  
DRAW_TRIPEL7 = {
  SYMBOLS :            [S100T, JACKPOT],
  PROPABILITY : (250,   750),
  NEXT_STATE :       (WIN,   JACKPOT),
  PRIZE :             (200,   0),
  PRIZE_TYPE :          (TURBO,   NOPE)
  }

RISK_LEFT = { 
  SYMBOLS :            [S30C, S50C, S100C, S200C, DRAW300, S3S,    S6S,    S12S,   S12T, S25T, S50T, S100T, S1EX50T],
  PRIZE :             (30,   50,   100,   200,   0,      3,      6,      12,     12,   25,   50,   100,   150),
  PRIZE_TYPE:           (MONEY, MONEY, MONEY,  MONEY,  NOPE,    SUPER, SUPER, SUPER, TURBO,  TURBO,  TURBO,  TURBO,   TURBO)
  } 
  
RISK_RIGHT = { 
  SYMBOLS :           [S20C, S40C, S80C, S160C, DRAW200, S2S,    S4S,    S8S,    S8T, S20T, S40T, S80T, S1EX40T],
  PRIZE :            (20,   40,   80,   160,   0,      2,      4,      8,      8,   20,   40,   80,   140),
  PRIZE_TYPE :         (MONEY, MONEY, MONEY, MONEY,  NOPE,    SUPER, SUPER, SUPER, TURBO, TURBO,  TURBO,  TURBO,  TURBO)
  }
  
# prize tables for the ROTOR-GAME

NORMAL_PLAN=(((JACK,    JACK,  JACK),  JACKPOT,      0,         0,     0,   0,       0,         0,       11,    NOPE),
            ((S7,      S7,    S7 ),   DRAW3X7,       0,         0,     0,   0,       0,         0,       10,    NOPE),
            ((S3BAR,  S3BAR, S3BAR),  DRAW3BAR,      0,         0,     0,   0,       0,         0,       9,     NOPE),
            ((S2BAR,  S2BAR, S2BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S3BAR,  S3BAR, S2BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S2BAR,  S3BAR, S3BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S3BAR,  S2BAR, S3BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S3BAR,  S2BAR, S2BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S2BAR,  S3BAR, S2BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S2BAR,  S2BAR, S3BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S1BAR,  S1BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S3BAR,  S3BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S1BAR,  S3BAR, S3BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S3BAR,  S1BAR, S3BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S3BAR,  S2BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S2BAR,  S3BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S1BAR,  S3BAR, S2BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S1BAR,  S2BAR, S3BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S3BAR,  S1BAR, S2BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S2BAR,  S1BAR, S3BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S2BAR,  S2BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S1BAR,  S2BAR, S2BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S2BAR,  S1BAR, S2BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S3BAR,  S1BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S1BAR,  S3BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S1BAR,  S1BAR, S3BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S2BAR,  S1BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S1BAR,  S2BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S1BAR,  S1BAR, S2BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S160C,  S160C, S160C),  RISK_R,     160,         0,     0,  20,       0,         0,       6,     S160C),
            ((S160C,  S160C, S3BAR),  RISK_R,     160,         0,     0,  20,       0,         0,       6,     S160C),
            ((S160C,  S160C, S2BAR),  RISK_R,     160,         0,     0,  20,       0,         0,       6,     S160C),
            ((S160C,  S160C, S1BAR),  RISK_R,     160,         0,     0,  20,       0,         0,       6,     S160C),
            ((S80C,   S80C,  S80C),   RISK_R,      80,         0,     0,   0,       0,         0,       5,     S80C),
            ((S80C,   S80C,  S3BAR),  RISK_R,      80,         0,     0,   0,       0,         0,       5,     S80C),
            ((S80C,   S80C,  S2BAR),  RISK_R,      80,         0,     0,   0,       0,         0,       5,     S80C),
            ((S80C,   S80C,  S1BAR),  RISK_R,      80,         0,     0,   0,       0,         0,       5,     S80C),
            ((S50C,   S50C,  S50C),   RISK_L,      50,         0,     0,   0,       0,         0,       4,     S50C),
            ((S50C,   S50C,  S3BAR),  RISK_L,      50,         0,     0,   0,       0,         0,       4,     S50C),
            ((S50C,   S50C,  S2BAR),  RISK_L,      50,         0,     0,   0,       0,         0,       4,     S50C),
            ((S50C,   S50C,  S1BAR),  RISK_L,      50,         0,     0,   0,       0,         0,       4,     S50C),
            ((S30C,   S30C,  S30C),   DRAW30,        0,         0,     0,   0,       0,         0,       3,     NOPE),
            ((S30C,   S30C,  S3BAR),  DRAW30,        0,         0,     0,   0,       0,         0,       3,     NOPE),
            ((S30C,   S30C,  S2BAR),  DRAW30,        0,         0,     0,   0,       0,         0,       3,     NOPE),
            ((S30C,   S30C,  S1BAR),  DRAW30,        0,         0,     0,   0,       0,         0,       3,     NOPE),
            ((JOKER,  S7,    S7),     DRAW30,        0,         0,     0,   0,       0,         0,       3,     NOPE),
            ((S20C,   S20C,  S20C),   DRAW20,        0,         0,     0,   0,       0,         0,       2,     NOPE),
            ((S20C,   S20C,  S3BAR),  DRAW20,        0,         0,     0,   0,       0,         0,       2,     NOPE),
            ((S20C,   S20C,  S2BAR),  DRAW20,        0,         0,     0,   0,       0,         0,       2,     NOPE),
            ((S20C,   S20C,  S1BAR),  DRAW20,        0,         0,     0,   0,       0,         0,       2,     NOPE),
            ((JOKER,  JOKER,   S7),   DRAW20,        0,         0,     0,   0,       0,         0,       2,     NOPE),
            ((JOKER,  JOKER,   JACK), EXTRA_PLUS,       0,         0,     0,   0,       0,         0,       1,     NOPE)
      )


SUPER_PLAN  = (((JACK,    JACK, JACK),   JACKPOT,      0,         0,     0,   0,       0,         0,      12,    NOPE),
            ((S7,     S7,    S7),     DRAW3X7,       0,         0,     0,   0,       0,         0,      11,     NOPE),
            ((S3BAR,  S3BAR, S3BAR),  DRAW3BAR,      0,         0,     0,   0,       0,         0,      10,     NOPE),
            ((S2BAR,  S2BAR, S2BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       9,     NOPE),
            ((S3BAR,  S3BAR, S2BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       9,     NOPE),
            ((S2BAR,  S3BAR, S3BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       9,     NOPE),
            ((S3BAR,  S2BAR, S3BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       9,     NOPE),
            ((S3BAR,  S2BAR, S2BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       9,     NOPE),
            ((S2BAR,  S3BAR, S2BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       9,     NOPE),
            ((S2BAR,  S2BAR, S3BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       9,     NOPE),
            ((S1BAR,  S1BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S3BAR,  S3BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S1BAR,  S3BAR, S3BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S3BAR,  S1BAR, S3BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S3BAR,  S2BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S2BAR,  S3BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S1BAR,  S3BAR, S2BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S1BAR,  S2BAR, S3BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S3BAR,  S1BAR, S2BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S2BAR,  S1BAR, S3BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S2BAR,  S2BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S1BAR,  S2BAR, S2BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S2BAR,  S1BAR, S2BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S3BAR,  S1BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S1BAR,  S3BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S1BAR,  S1BAR, S3BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S2BAR,  S1BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S1BAR,  S2BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S1BAR,  S1BAR, S2BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((JOKER,  JOKER, S7),     RISK_L,     200,         0,     0,   0,       0,         0,       7,     S200C),
            ((JOKER,  JOKER, S3BAR),  RISK_L,     200,         0,     0,   0,       0,         0,       7,     S200C),
            ((S160C,  S160C, S160C),  WIN,        200,         0,     0,   0,       0,         0,       6,     S200C),
            ((S160C,  S160C, S2BAR),  WIN,        200,         0,     0,   0,       0,         0,       6,     S200C),
            ((S160C,  S160C, S1BAR),  WIN,        200,         0,     0,   0,       0,         0,       6,     S200C),
            ((S80C,   S80C,  S80C),   WIN,        200,         0,     0,   0,       0,         0,       5,     S200C),
            ((S80C,   S80C,  S2BAR),  WIN,        200,         0,     0,   0,       0,         0,       5,     S200C),
            ((S80C,   S80C,  S1BAR),  WIN,        200,         0,     0,   0,       0,         0,       5,     S200C),
            ((S50C,   S50C,  S50C),   WIN,        200,         0,     0,   0,       0,         0,       4,     S200C),
            ((S50C,   S50C,  S2BAR),  WIN,        200,         0,     0,   0,       0,         0,       4,     S200C),
            ((S50C,   S50C,  S1BAR),  WIN,        200,         0,     0,   0,       0,         0,       4,     S200C),
            ((S30C,   S30C,  S30C),   WIN,        200,         0,     0,   0,       0,         0,       3,     S200C),
            ((S30C,   S30C,  S2BAR),  WIN,        200,         0,     0,   0,       0,         0,       3,     S200C),
            ((S30C,   S30C,  S1BAR),  WIN,        200,         0,     0,   0,       0,         0,       3,     S200C),
            ((S20C,   S20C,  S20C),   WIN,        200,         0,     0,   0,       0,         0,       2,     S200C),
            ((S20C,   S20C,  S2BAR),  WIN,        200,         0,     0,   0,       0,         0,       2,     S200C),
            ((S20C,   S20C,  S1BAR),  WIN,        200,         0,     0,   0,       0,         0,       2,     S200C),
            ((JOKER,  JOKER, S2BAR),  WIN,        200,         0,     0,   0,       0,         0,       1,     S200C),
            ((JOKER,  JOKER, S1BAR),  WIN,        200,         0,     0,   0,       0,         0,       1,     S200C),
            ((JOKER,  JOKER, S160C),  WIN,        200,         0,     0,   0,       0,         0,       1,     S200C),
            ((JOKER,  JOKER, JACK),   WIN,        200,         0,     0,   0,       0,         0,       1,     S200C)
        )

TURBO_PLAN= (((JACK,    JACK, JACK),  JACKPOT,      0,         0,     0,   0,       0,         0,       10,    NOPE),
            ((S7,     S7,    S7),     DRAW3X7,       0,         0,     0,   0,       0,         0,       9,     NOPE),
            ((S3BAR,  S3BAR, S3BAR),  DRAW3BAR,      0,         0,     0,   0,       0,         0,       8,     NOPE),
            ((S2BAR,  S2BAR, S2BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S3BAR,  S3BAR, S2BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S2BAR,  S3BAR, S3BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S3BAR,  S2BAR, S3BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S3BAR,  S2BAR, S2BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S2BAR,  S3BAR, S2BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S2BAR,  S2BAR, S3BAR),  DRAW3S,        0,         0,     0,   0,       0,         0,       7,     NOPE),
            ((S1BAR,  S1BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S3BAR,  S3BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S1BAR,  S3BAR, S3BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S3BAR,  S1BAR, S3BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S3BAR,  S2BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S2BAR,  S3BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S1BAR,  S3BAR, S2BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S1BAR,  S2BAR, S3BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S3BAR,  S1BAR, S2BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S2BAR,  S1BAR, S3BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S2BAR,  S2BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S1BAR,  S2BAR, S2BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S2BAR,  S1BAR, S2BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S3BAR,  S1BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S1BAR,  S3BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S1BAR,  S1BAR, S3BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S2BAR,  S1BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S1BAR,  S2BAR, S1BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S1BAR,  S1BAR, S2BAR),  DRAW2S,        0,         0,     0,   0,       0,         0,       6,     NOPE),
            ((S160C,  S160C, S160C),  RISK_L,      200,        0,     0,   0,       0,         0,       5,     S200C),
            ((S160C,  S160C, S3BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       5,     S200C),
            ((S160C,  S160C, S2BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       5,     S200C),
            ((S160C,  S160C, S1BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       5,     S200C),
            ((S80C,   S80C,  S80C),   RISK_L,      200,        0,     0,   0,       0,         0,       4,     S200C),
            ((S80C,   S80C,  S3BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       4,     S200C),
            ((S80C,   S80C,  S2BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       4,     S200C),
            ((S80C,   S80C,  S1BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       4,     S200C),
            ((S50C,   S50C,  S50C),   RISK_L,      200,        0,     0,   0,       0,         0,       3,     S200C),
            ((S50C,   S50C,  S3BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       3,     S200C),
            ((S50C,   S50C,  S2BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       3,     S200C),
            ((S50C,   S50C,  S1BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       3,     S200C),
            ((S30C,   S30C,  S30C),   RISK_L,      200,        0,     0,   0,       0,         0,       2,     S200C),
            ((S30C,   S30C,  S3BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       2,     S200C),
            ((S30C,   S30C,  S2BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       2,     S200C),
            ((S30C,   S30C,  S1BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       2,     S200C),
            ((JOKER,  S7,    S7),     RISK_L,      200,        0,     0,   0,       0,         0,       2,     S200C),
            ((S20C,   S20C,  S20C),   RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C),
            ((S20C,   S20C,  S3BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C),
            ((S20C,   S20C,  S2BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C),
            ((S20C,   S20C,  S1BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C),
            ((JOKER,  JOKER, S7),     RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C),
            ((JOKER,  JOKER, S3BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C),
            ((JOKER,  JOKER, S2BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C),
            ((JOKER,  JOKER, S1BAR),  RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C),
            ((JOKER,  JOKER, S160C),  RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C),
            ((JOKER,  JOKER, JACK),   RISK_L,      200,        0,     0,   0,       0,         0,       1,     S200C)
        )

# up to 4 winning lines

WINNING_ROWS = {

  NORMAL  : ( ( TOP_LEFT,  TOP_CENTER,  TOP_RIGHT ),
              ( BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT )
            ),

  FOUR_ROW : ( ( TOP_LEFT,  TOP_CENTER,  TOP_RIGHT ),
              ( BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT ),
              ( TOP_LEFT,  BOTTOM_CENTER, TOP_RIGHT ),
              ( BOTTOM_LEFT, TOP_CENTER,  BOTTOM_RIGHT )
            ),

  TURBO :     ( ( TOP_LEFT,  TOP_CENTER,  TOP_RIGHT ),
              ( BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT ),
              ( TOP_LEFT,  BOTTOM_CENTER, TOP_RIGHT ),
              ( BOTTOM_LEFT, TOP_CENTER,  BOTTOM_RIGHT )
            ),

  SUPER  : ( ( TOP_LEFT,  TOP_CENTER,  TOP_RIGHT ),
              ( BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT )
            )
  }