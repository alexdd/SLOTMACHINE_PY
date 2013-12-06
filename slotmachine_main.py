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

'''
slotmachine_main.py - Simulation of a state-of-the-art slotmachine

If you have ever wondered how a State-of-the-Art slotmachine works,
then this Python program is for you. 

It features a complete state machine, bonus scheme and special rules of a commercial slotmachine.
Well actually I modified the rules in order to get a better payout rate :-] 

I wrote this simulation after I quit my job in the casino games industry back in 2005.

It features various parameter options, even support for macros, see comments in source code.

Options:

    -h   :  this help text
    -r   :   TOTAL RISK Mode
    -b   :   BLIND GAME
    -a   :   Accept 40TS and Total Risk
    -i   :   interactive mode do not use  -b and -t options
    -l   :   turn logging on in conjunction with -b, -r and -t
    -n   :   number of games
    -m   :   MACRO mode

    Default option -i

    Examples: 
    
    python slotmachine_main.py -r -l -n 3400 > output.txt
    python slotmachine_main.py -b -n 1000
    python slotmachine_main.py -i
    python slotmachine_main.py -m a5[10]1 > ausgabe.txt
    python slotmachine_main.py -t -l > test.txt
    python slotmachine_main.py -t
    slotmachine_main.py mini.py -l -z -r -n 100000 > test.txt

   Hint: Hold  'Enter' key in interactive mode in order to speed run games
   
'''

import random
import string
import time
import os
import getopt
import sys
import math
from slotmachine_tables import *

# constants and variables

NUM_GAMES = 3400000
DEPOSIT = 20
EXTRAGAME_BOUNDS = 4
FOUR_ROW_MODE_BOUNDS = 100
INTERACTIVE = 0
LOGGING = 0
MACRO = 0
BLIND = 0
TOTAL = 0
TEST = 0
RECEIVING_40 = 0
ADVANCED_LOGGING = 1
TEXT_MODE = 0
RISK_FINISHED = 12
UNDEFINED = -1
COLUMN_WIN_COMBINATIONS = 0
COLUMN_NEXT_STATE = 1
COLUMN_MONEY = 2
COLUMN_SUPER = 3
COLUMN_TURBO = 4
COLUMN_FOUR_ROW = 5
COLUMN_EXTRA = 6
COLUMN_JACKPOT = 7
COLUMN_RANK = 8
COLUMN_SYMBOL = 9
DEFAULT = 255
ROLLERS = 'Normal Rotor-Game'
MONEY_TOTAL = "Summe of all money prizes"
SUPER_TOTAL = "Sum of all Super Games:"
TURBO_TOTAL = "Sum of all Turbo Games:"
FOUR_ROW_TOTAL = "Sum of all Four-Row Games:"
EXTRA_TOTAL = "Sum of all Extra Points:"
JPTOTAL = "Sum of all Jackpot Points:"
POWER_RUN_COUNTER = "Power Run Counter"
POWER_RUN_HITS = "Power Run Hits"
TURBO_RUN = "Turbo Run"
SUPER_RUN = "Super Run"
NO_HITS = 'Fail!'
LOG = 'Logging procedure'
END_OF_GAME = 'Game Over!'
ROWS = 'Winning Rows'
PROCESS = "Key Handling"
counter = {}
stats = {}
carry = {}    
counter[EXTRA_POINT] = 0
counter[TURBO] = 0
counter[FOUR_ROW] = 0
counter[SUPER] = 0
counter[JP] = 1
counter[MONEY] = 2000
counter[MONEY_TOTAL] = 0
counter[EXTRA_TOTAL] = 0
counter[TURBO_TOTAL] = 0
counter[FOUR_ROW_TOTAL] = 0
counter[SUPER_TOTAL] = 0
counter[JPTOTAL] = 0
counter[POWER_RUN_COUNTER] = 0
counter[POWER_RUN_HITS] = 0
counter[EXTRA_PLUS_LEFT] = 0
counter[EXTRA_PLUS_RIGHT] = 0
counter[TURBO_RUN] = 0
counter[SUPER_RUN] = 0
counter[NO_HITS] = 0
carry[MONEY] = 0
carry[SUPER] = 0
carry[TURBO] = 0
carry[FOUR_ROW] = 0
carry[EXTRA_POINT] = 0
carry[JP] = 0
game_mode = NORMAL
winning_combinations = []
winning_combinations_stack = []
extra_double_jump = 0
in_run = 0
free_flg = 0
four_row_flg = 0
risk_accept_flg = 0
risk_start_flg = 0
num_games = 0
num_won = 0
num_risk_steps = 0
num_wheel = 0
num_draws = 0
num_jackpot = 0
risk_fail_flg = 0
risk_win_flg = 0
cheatrun = 0
cheatcode = 0
macro_list = []
picture = [ S20C, S20C, S20C,\
               S20C, S20C, S20C ]
next_combination = ()

def get_turbo_plan():
  return SUPER_PLAN

def get_normal_plan():
  return NORMAL_PLAN

def get_turbol_plan():
  if game_mode == SUPER and counter[SUPER] <= 19:
    return TURBO_PLAN
  else:
    return SUPER_PLAN

BONUS_SCHEME = {
  NORMAL : get_normal_plan,
  TURBO :    get_turbo_plan,
  SUPER : get_turbol_plan,
  FOUR_ROW: get_normal_plan
}

# cheatcodes

def get_cheatrun(cheatcode, picture):
  
  '''... this procedure should be rather self-explanatory :-] ...'''

  if cheatcode == 'a': return (S30C,S30C,S30C, \
                               S50C,S80C,S20C)

  if cheatcode == 'b': return (S20C,S20C,S20C, \
                               S50C,S80C,S30C)

  if cheatcode == 'c': return (JACK,JACK,JACK, \
                               S50C,S80C,S30C)

  if cheatcode == 'd': return (S50C,S80C,S30C, \
                               S50C,S80C,S30C)

  if cheatcode == 'e': return (S50C,S50C,S50C, \
                               S50C,S80C,S30C)

  if cheatcode == 'f': return (S160C,S160C,S160C, \
                               S50C, S80C, S30C)

  if cheatcode == 'g': return (S50C,S80C,S160C, \
                               S50C,S80C,S30C)
 
  if cheatcode == 'h': return (S50C,S80C,JACK, \
                               S50C,S80C,S160)

  if cheatcode == 'i': return (S50C,S80C,S3BAR, \
                               S80C,S50C,S1BAR)

  if cheatcode == 'j': return (JACK,JACK,JACK, \
                               S80C,S50C,S1BAR)

  if cheatcode == 'k': return (S50C,S80C,S7, \
                               S80C,S50C,S30C)

  if cheatcode == 'l': return (S50C,S80C,S7, \
                               S50C,S80C,S30C)

  if cheatcode == 'm': return (S80C,S50C,S80C, \
                               S50C,S80C,S30C)

  if cheatcode == 'n': return (S50C, S80C, S30C, \
                               S160C,S160C,S160C)
  
  if cheatcode == 'o': return (S2BAR, S2BAR, S2BAR, \
                               S160C,S160C,S160C)

  if cheatcode == 'p': return (S7, S7, S7, \
                               S160C,S160C,S160C)

  return picture

# rule base

def pre_rules(game_state, index):
  
  '''... these special rules will be evaluated before a state change triggered by the state table ...'''
  
  global extra_double_jump
  global game_mode
  global winning_combinations
  global in_run
  global free_flg
  global four_row_flg
  global risk_start_flg
  global winning_line

  # set game_mode { NORMAL | SUPER | TURBO | FOUR_ROW }
  
  if counter[FOUR_ROW] >= FOUR_ROW_MODE_BOUNDS or four_row_flg:
    game_mode = FOUR_ROW
    four_row_flg = 1
  if counter[TURBO] > 0:
    game_mode = TURBO
    counter[SUPER] = 0
  elif counter[SUPER] > 0:
    game_mode = SUPER
  elif not four_row_flg:
    game_mode = NORMAL

  # reset free games mode
  
  if len(winning_combinations) > 0:
    counter[NO_HITS] = 0
    free_flg = 0

  # if we reach TURBO game mode we will change our SUPER games into TURBO games 1:1
  
  if game_state == WIN and game_mode == TURBO and carry[SUPER] > 0:
    if LOGGING or INTERACTIVE: print "Rule: Change Super-Games 1:1 into Turbo-Games"
    carry[TURBO] = carry[SUPER]
    carry[SUPER] = 0

  # we let our Success-Run begin if we win SUPER or TURBO games for the first time
  
  if game_state == WIN and (carry[TURBO] > 0 or carry[SUPER] > 0) \
      and not in_run and counter[TURBO] == 0 and counter[SUPER] == 0:
    if LOGGING or INTERACTIVE: print "Rule: Success-Run started!"
    in_run = 1
    counter[POWER_RUN_HITS] = 0
    counter[SUPER_RUN] = 0
    counter[TURBO_RUN] = 0
    
  # restart Success-Run if we win TURBO games in SUPER games mode 
  
  if in_run and game_mode == SUPER and carry[TURBO] > 0 \
     and game_state == WIN:
    if LOGGING or INTERACTIVE: print "Rule: Restart Success-Run!"
    counter[POWER_RUN_COUNTER] = 0
    in_run = 1
    counter[POWER_RUN_HITS] = 0
    counter[SUPER_RUN] = 0
    counter[TURBO_RUN] = 0
      
  # count SUPER and TURBO games if we are in a Success-RUN
  
  if game_state == WIN and in_run:
    if carry[TURBO] > 0:
      counter[TURBO_RUN]+=carry[TURBO]
    elif carry[SUPER] > 0:
      counter[SUPER_RUN]+=carry[SUPER]

  # if not in FREE games mode charge money for one game
  
  if counter[MONEY] > 20 and game_state == ROLLERS and not free_flg:
    counter[MONEY]-=DEPOSIT

  # set free games mod (well at the moment you can can get free games only when you do not win anything in 100 games)
  # be careful this has a big impact on the payout rate 
  
  if counter[NO_HITS] >= 100:
    if LOGGING or INTERACTIVE: print "Rule: Free Games running!"
    free_flg = 1
  
  # decrement FOUR-ROW games
  
  if counter[FOUR_ROW] > 0 and game_state == ROLLERS and game_mode == FOUR_ROW:
    counter[FOUR_ROW]-=1
    # exit FOUR-ROW mode
    if counter[FOUR_ROW]==0:
      four_row_flg = 0

  # decrement SUPER games
  
  if counter[SUPER] > 0 and game_state == ROLLERS and game_mode == SUPER:
    counter[SUPER]-=1
    # exit Success-Run
    if in_run and counter[SUPER] == 0:
      in_run = 0
      if counter[POWER_RUN_COUNTER] > 0:
        counter[POWER_RUN_COUNTER] = 0

  # decrement TURBO games
  
  if counter[TURBO] > 0 and game_state == ROLLERS and game_mode == TURBO:
    counter[TURBO]-=1
    # exit Success-Run
    if in_run and counter[TURBO] == 0:
      in_run = 0
      if counter[POWER_RUN_COUNTER] > 0:
        counter[POWER_RUN_COUNTER] = 0

  # calculate POWER-RUN when in SUPER games mode
  
  if counter[SUPER] > 0 and game_mode == SUPER and in_run:
    counter[POWER_RUN_COUNTER] = counter[POWER_RUN_HITS]-math.ceil(counter[SUPER_RUN]*0.5)
    
  # calculate POWER-RUN when in TURBO games mode
  
  if counter[TURBO] > 0 and game_mode == TURBO and in_run:
    counter[POWER_RUN_COUNTER] = counter[POWER_RUN_HITS]-math.ceil(counter[TURBO_RUN]*0.75)

  # win another TURBO game if POWER-RUN < 0
  
  if game_mode == TURBO and counter[POWER_RUN_COUNTER] < 0 and counter[TURBO]==0:
    if LOGGING or INTERACTIVE: print "Rule: Won another Turbo-Game for free"
    counter[TURBO] = 1

  # win another SUPER game if POWER-RUN < 0
  
  if game_mode == SUPER and counter[POWER_RUN_COUNTER] < 0 and counter[SUPER]==0:
    if LOGGING or INTERACTIVE: print "Rule: Won another Super-Game for free"
    counter[SUPER] = 1

  # win a Wheel of Fortune 60 draw
  
  if counter[JP]==7 and (S50C, S50C, S50C) in winning_combinations:
    if LOGGING or INTERACTIVE: print "Rule: Jackpot-Win a Wheel of Fortune 60 draw!"
    counter[JP]=1
    counter[EXTRA_POINT]+=3
    counter[EXTRA_TOTAL]+=3
    winning_combinations = []
    return WHEEL60
    
  # win a Wheel of Fortune 80 draw
  
  elif counter[JP]==8 and (S160C, S160C, S160C) in winning_combinations:
    if LOGGING or INTERACTIVE: print "Rule: Jackpot-Win a Wheel of Fortune 80 draw!"
    counter[JP]=1
    counter[EXTRA_POINT]+=4
    counter[EXTRA_TOTAL]+=4
    winning_combinations = []
    return WHEEL80

  ## RISK-LINES

  # no RISK lines when in blind game mode
  
  if (game_state == RISK_L or game_state == RISK_R) and BLIND:
    if LOGGING or INTERACTIVE: print "Rule: BLIND -> No risk line!"
    if carry[SUPER] > 0 and counter[TURBO]>0:
      if LOGGING or INTERACTIVE: print "Rule: Change Super-Games 1:1 into Turbo-Games"
      carry[TURBO] = carry[SUPER]
      carry[SUPER] = 0
    return WIN

  # no RISK lines when TURBO games or SUPER games counter > 200
  
  if (counter[TURBO] > 200 or counter[SUPER] > 200) \
     and (game_state == RISK_L or game_state == RISK_R):
    if LOGGING or INTERACTIVE: print "Regel: Sonder > 150 -> Kein Risiko!"
    if carry[SUPER] > 0:
      if LOGGING or INTERACTIVE: print "Rule: Change Super-Games 1:1 into Turbo-Games"
      carry[TURBO] = carry[SUPER]
      carry[SUPER] = 0
    return WIN
  
  # if risk line right step 4 then execute a DRAW200 game
  
  if index == 4 and game_state == RISK_R:
    return DRAW200

  # if risk line left step 4 then execute a DRAW300 game
  
  elif index == 4 and game_state == RISK_L:
    return DRAW300

  # executea double jump in risk line 
  
  elif counter[EXTRA_POINT] > 0 and game_state == RISK_L and index == 5:
    if LOGGING or INTERACTIVE: print "Rule: Double-Jump!"
    extra_double_jump = 1

  # executea double jump in risk line 

  elif counter[EXTRA_POINT] > 0 and game_state == RISK_R and index == 5:
    if LOGGING or INTERACTIVE: print "Rule: Double-Jump!"
    extra_double_jump = 1

  # executea double jump in risk line 

  elif counter[EXTRA_POINT] > 0 and game_state == RISK_L and index == 7:
    if LOGGING or INTERACTIVE: print "Rule: Double-Jump!"
    extra_double_jump = 1

  # executea double jump in risk line 

  elif counter[EXTRA_POINT] > 0 and game_state == RISK_R and index == 7:
    if LOGGING or INTERACTIVE: print "Rule: Double-Jump!"
    extra_double_jump = 1

  # executea double jump in risk line 

  elif counter[EXTRA_POINT] > 0 and game_state == RISK_L and index == 9:
    if LOGGING or INTERACTIVE: print "Rule: Double-Jump!"
    extra_double_jump = 1

  # executea double jump in risk line 

  elif counter[EXTRA_POINT] > 0 and game_state == RISK_R and index == 9:
    if LOGGING or INTERACTIVE: print "Rule: Double-Jump!"
    extra_double_jump = 1

  # execute start draw when on risk line step
  
  if risk_start_flg and game_state == RISK_L and index == 6:
    risk_start_flg = 0
    return START6S

  # execute start draw when on risk line step

  if risk_start_flg and game_state == RISK_L and index == 7:
    risk_start_flg = 0
    return START12S

  # execute start draw when on risk line step

  if risk_start_flg and game_state == RISK_L and index == 8:
    risk_start_flg = 0
    return START12T

  # execute start draw when on risk line step

  if risk_start_flg and game_state == RISK_L and index == 9:
    risk_start_flg = 0
    return START25T

  # execute start draw when on risk line step

  if risk_start_flg and game_state == RISK_L and index == 10:
    risk_start_flg = 0
    return START50T

  # execute start draw when on risk line step

  if risk_start_flg and game_state == RISK_R and index == 6:
    risk_start_flg = 0
    return START4S

  # execute start draw when on risk line step

  if risk_start_flg and game_state == RISK_R and index == 7:
    risk_start_flg = 0
    return START8S

  # execute start draw when on risk line step

  if risk_start_flg and game_state == RISK_R and index == 8:
    risk_start_flg = 0
    return START8T

  # execute start draw when on risk line step

  if risk_start_flg and game_state == RISK_R and index == 9:
    risk_start_flg = 0
    return START20T

  # execute start draw when on risk line step

  if risk_start_flg and game_state == RISK_R and index == 10:
    risk_start_flg = 0
    return START40T
  
  # restart state
  
  if counter[FOUR_ROW] >= FOUR_ROW_MODE_BOUNDS or four_row_flg:
    game_mode = FOUR_ROW
    four_row_flg = 1
  if counter[TURBO] > 0:
    game_mode = TURBO
    counter[SUPER] = 0
  elif counter[SUPER] > 0:
    game_mode = SUPER
  elif not four_row_flg:
    game_mode = NORMAL

  # default  
  
  return game_state

def post_rules(game_state, next_state, index):
  
  '''... these special rules will be evaluated after a state change triggered by the state table ...'''
  
  global winning_combinations_stack
  global winning_combinations
  global winning_line

  # increment Jackpot-Points if RISK step accepted
  
  if risk_accept_flg and game_state == RISK_R and next_state==WIN and index == 10:
    if LOGGING or INTERACTIVE: print "Rule: Win Jackpot Points!"
    counter[JP]+=1
    counter[JPTOTAL]+=1

  # if RISK step failed then evaluate next winning line (only in FOUR-ROW and NORMAL games)

  if (game_state == RISK_L or game_state == RISK_R) and next_state == ROLLERS and \
      len(winning_combinations_stack)>0 and \
      (game_mode == NORMAL or game_mode==FOUR_ROW):
    return NEXT_ROW

  # another winning rule for Jackpot points
  
  if game_state == DRAW3BAR and carry[TURBO] == 150 and next_state == WIN:
    if LOGGING or INTERACTIVE: print "Rule: Win Jackpot Points!"
    counter[JP]+=1
    counter[JPTOTAL]+=1

  # count FREE-GAMES mode games
  
  if game_state == ROLLERS and len(winning_combinations)==0:
    counter[NO_HITS]+=1

  # split 150 SUPER games into 50 TURBO games  + 1EXTRA Point
  
  if (game_state==RISK_L or game_state==RISK_R or game_state.startswith("START") or \
      game_state.startswith("FAIL")) \
      and next_state == WIN and carry[TURBO] == 150:
    if LOGGING or INTERACTIVE: print "Rule: Split into 50 TURBO games  + 1EXTRA Point"
    carry[TURBO] = 50
    carry[EXTRA_POINT] = 1

  # default
  
  return next_state

def compare_picture_with_plan(picture, winning_lines, winning_plan):
  
  '''... check if win in standard draw ...'''
  
  global winning_combinations
  i = 0
  for row in winning_plan:
    found = 1
    j = 0
    for symbol in row[COLUMN_WIN_COMBINATIONS]:
      if(picture[winning_lines[j]]!=symbol and \
         symbol!=JOKER):
        found = 0
        i+=1
        break
      j+=1
    if found:
      # hit!
      return i, row[COLUMN_WIN_COMBINATIONS]
  # no hit!
  return UNDEFINED, UNDEFINED
            
def compare_draw_table(drawtable, rand_value):
  
  '''... check if win in risk draw ...'''
  
  prob = 0
  index = 0
  for wert in drawtable[PROPABILITY]:
    prob += wert
    if prob >= rand_value:
      break
    index+=1
  if index < len(drawtable[PROPABILITY]):
    # win!
    return index
  # no win!?
  print "ERROR! No match in table found"
  sys.exit(1)
  
def put_into_account(xtable, index, plan_row=None):

  '''... put prize onto player's account ...'''
  
  if plan_row==None:
    # handle drawtable
    prize = xtable[PRIZE][index]
    typ = xtable[PRIZE_TYPE][index]
    carry[typ] = prize
    if prize > 0:
      symbol = xtable[SYMBOLS][index]
      carry[symbol] = 1
  else:
    # handle winning_plan put onto carry over 
    carry[MONEY] = plan_row[COLUMN_MONEY]
    carry[SUPER] = plan_row[COLUMN_SUPER]
    carry[TURBO] = plan_row[COLUMN_TURBO]
    # instant win
    counter[FOUR_ROW] += plan_row[COLUMN_FOUR_ROW]
    counter[FOUR_ROW_TOTAL] += plan_row[COLUMN_FOUR_ROW]
    counter[EXTRA_POINT] += plan_row[COLUMN_EXTRA]
    counter[EXTRA_TOTAL] += plan_row[COLUMN_EXTRA]
    counter[JP] += plan_row[COLUMN_JACKPOT]
    counter[JPTOTAL] += plan_row[COLUMN_JACKPOT]

def win_route(statedict,name,index):
  
  '''... puts carry overs onto counters ...'''
  
  for z in carry.keys():
    try:
      counter[z] += carry[z]
    except KeyError:
      counter[z] = 0
      counter[z] += carry[z]
  counter[MONEY_TOTAL] += carry[MONEY]
  counter[SUPER_TOTAL] += carry[SUPER]
  counter[TURBO_TOTAL] += carry[TURBO]
  counter[FOUR_ROW_TOTAL] += carry[FOUR_ROW]
  counter[EXTRA_TOTAL] += carry[EXTRA_POINT]
  counter[JPTOTAL] += carry[JP]
  return ROLLERS, DEFAULT
    
def draw_process(statedict, name,index):

  '''... random normal draw ...'''
 
  rand_value = random.randint(1, 1000)
  index = compare_draw_table(statedict[name][TABLE],rand_value) 
  if index != UNDEFINED:
    if (MACRO or TEST) and (name == DRAW200 or name == DRAW300 \
                or name == DRAW20 or name == DRAW30):
      index= 0
    # prize
    put_into_account(statedict[name][TABLE], index)
    return statedict[name][TABLE][NEXT_STATE][index], index
  # should not happen
  print "ERROR! no matchin value found"
  sys.exit(1)

def risk_process(statedict, name,index):
  
  '''... random risk draw ...'''
  
  global risk_win_flg
  global risk_fail_flg
  global risk_accept_flg
  if risk_accept_flg:
    # accept risk step
    put_into_account(statedict[name][TABLE],index)
    return WIN, index
  # step up
  index+=1
  if (random.randint(0, 1) or risk_win_flg) \
      and not risk_fail_flg:
    # prize
    put_into_account(statedict[name][TABLE],index)
    if index >= RISK_FINISHED:
      # reached final step
      return WIN, DEFAULT
    # next step
    return name, index
  # risk failed!
  if game_mode == NORMAL and index>=9 and index<=12:
      # failed in top area win FOUR-ROW game
      counter[FOUR_ROW]+=1
      counter[FOUR_ROW_TOTAL]+=1
  if index >= RISK_FINISHED:
    # fail safe
    if name == RISK_L:
      return FAIL50, DEFAULT
    else:
      return FAIL40, DEFAULT
  # normal fail
  return ROLLERS, DEFAULT

def extra_risk_process(statedict, name,index):
  
  '''... risk draw when EXTRA points on player's account ...'''
  
  global risk_win_flg
  global risk_fail_flg
  global risk_accept_flg
  if risk_accept_flg:
    # accept
    put_into_account(statedict[name][TABLE],index)
    return WIN, index
  # double setpup
  index +=2
  if(random.randint(1, 100)>30 or risk_win_flg) \
      and not risk_fail_flg:
    # prize
    put_into_account(statedict[name][TABLE],index)
    if index >= RISK_FINISHED-1:
      # decrement EXTRA_POINT s
      counter[EXTRA_POINT]-=1
      return WIN, DEFAULT
    # next step
    return name, index
  # fail
  if game_mode == NORMAL and index>=9 and index<=12:
      # failed in top area win FOUR-ROW game
      counter[FOUR_ROW]+=1
      counter[FOUR_ROW_TOTAL]+=1
  return ROLLERS, DEFAULT

def extra_plus_risk_process(statedict, name,index):
  
  '''... risk draw when extra_plus counters > 0 ...'''
  
  global risk_win_flg
  global risk_fail_flg
  global risk_accept_flg
  if risk_accept_flg:
    # accept
    put_into_account(statedict[name][TABLE],index)
    return WIN, index
  # stepup
  index +=1
  if(random.randint(1, 100)>30 or risk_win_flg) \
      and not risk_fail_flg:
    # prize
    put_into_account(statedict[name][TABLE],index)
    if name == RISK_L:
      # decrement extra_plus counter
      if index == counter[EXTRA_PLUS_LEFT]:
        counter[EXTRA_PLUS_LEFT]-=1
    else:
      # decrement extra_plus counter
      if index == counter[EXTRA_PLUS_RIGHT]:
        counter[EXTRA_PLUS_RIGHT]-=1
    # next step
    return name, index
  # fail
  return ROLLERS, DEFAULT
  
def risk_dispatch_process(statedict, name,index):
  
  '''... dispatches into various risk draw modes ...'''
  
  global extra_double_jump
  if counter[EXTRA_PLUS_LEFT] and name == RISK_L \
     and index < counter[EXTRA_PLUS_LEFT]:
    if (LOGGING or INTERACTIVE) and ADVANCED_LOGGING:
      print "70% Risk Chance!"
    return extra_plus_risk_process(statedict, name,index)
  elif counter[EXTRA_PLUS_RIGHT] and name == RISK_R \
     and index < counter[EXTRA_PLUS_RIGHT]:
    if (LOGGING or INTERACTIVE) and ADVANCED_LOGGING:
      print "70% Risk Chance!"
    return extra_plus_risk_process(statedict, name,index)
  elif extra_double_jump:
    extra_double_jump = 0
    if (LOGGING or INTERACTIVE) and ADVANCED_LOGGING:
      print "70% Risk Chance!"
    return extra_risk_process(statedict, name,index)
  else:
    if (LOGGING or INTERACTIVE) and ADVANCED_LOGGING:
      print "50% Risk Chance!"
    return risk_process(statedict, name,index)
        
def normal_process(statedict, name,index):
  
  '''... normal rotor game ...'''
  
  global winning_combinations
  global winning_combinations_stack
  global in_run
  global picture
  global restart_flg
  global cheatrun
  global winning_line
  # draw
  rotorpos = [0,0,0,0,0,0]
  for i in range(len(rotorpos)):
    rotorpos[i] = random.randint( 0, len(CYLINDER[i%3])-1)
  picture = [ CYLINDER[0][rotorpos[0]], CYLINDER[1][rotorpos[1]], CYLINDER[2][rotorpos[2]],
                 CYLINDER[0][rotorpos[3]], CYLINDER[1][rotorpos[4]], CYLINDER[2][rotorpos[5]]]
  # cheating
  if cheatrun:
    picture = get_cheatrun(cheatcode, picture)
    rotorpos[0] = list(CYLINDER[0]).index(picture[0])
    rotorpos[1] = list(CYLINDER[1]).index(picture[1])
    rotorpos[2] = list(CYLINDER[2]).index(picture[2])
    rotorpos[3] = list(CYLINDER[0]).index(picture[3])
    rotorpos[4] = list(CYLINDER[1]).index(picture[4])
    rotorpos[5] = list(CYLINDER[2]).index(picture[5])
  # restart rotors
  winsymbole = (S1BAR, S2BAR,S3BAR,S7,JACK)
  if picture[TOP_LEFT] not in winsymbole and \
     picture[BOTTOM_LEFT] not in winsymbole and not cheatrun:
    n1 = random.randint( 0, len(CYLINDER[0])-1)
    n2 = random.randint( 0, len(CYLINDER[0])-1)
    picture[TOP_LEFT] = CYLINDER[0][n1]
    picture[BOTTOM_LEFT] = CYLINDER[0][n2]
    restart_flg = 1
  cheatrun = 0
  # evaluation
  winning_plan = statedict[name][TABLE][game_mode]()
  wiin_rows = statedict[name][ROWS][game_mode]
  max_rang = UNDEFINED
  winning_combinations = []
  winning_combinations_stack = []
  idx = 0
  for row in wiin_rows:
    i, kombi = compare_picture_with_plan(picture, row, winning_plan)
    rang = UNDEFINED
    if i != UNDEFINED:
      rang = winning_plan[i][COLUMN_RANK]
      winning_combinations_stack.append((rang,i,row))
      winning_combinations.append(kombi)
    if rang > max_rang:
      max_rang = rang
      winning_line = row
      idx = i
  # hit!
  if len(winning_combinations)>0:
    # Success-Run!
    if in_run:
      counter[POWER_RUN_HITS]+=1
    if counter[POWER_RUN_COUNTER] < 0:
      counter[POWER_RUN_COUNTER]+=1
    elif counter[POWER_RUN_COUNTER] == 0:
      in_run = 0
      counter[POWER_RUN_HITS] = 0
      counter[SUPER_RUN] = 0
      counter[TURBO_RUN] = 0
    # sort winning combinations
    winning_combinations_stack.sort()
    winning_combinations_stack.reverse()
  # put_into_account
  if max_rang != UNDEFINED:
    # pop stack
    winning_combinations_stack = winning_combinations_stack[1:]
    # put_into_account and set next step
    put_into_account(statedict[name][TABLE], idx, winning_plan[idx])
    return winning_plan[idx][COLUMN_NEXT_STATE], idx
  # no hit
  return ROLLERS, DEFAULT

def jackpot_route(statedict, name,index):
  
  '''... won jackpot: 2 EXTRA_POINT points and wheel of fortune 40'''
  
  counter[JP]=1
  counter[EXTRA_POINT]+=2
  counter[EXTRA_TOTAL]+=2
  return WHEEL40, DEFAULT

def extra_plus_process(statedict, name,index):
  
  '''... increment extra plus counters and win 10C ...'''
  
  if counter[EXTRA_PLUS_LEFT] < EXTRAGAME_BOUNDS or \
     counter[EXTRA_PLUS_RIGHT] < EXTRAGAME_BOUNDS:
    if counter[EXTRA_PLUS_LEFT] > counter[EXTRA_PLUS_RIGHT]:
      counter[EXTRA_PLUS_RIGHT]+=1
    else:
      counter[EXTRA_PLUS_LEFT]+=1
  carry[MONEY] = 10
  return WIN, DEFAULT

def next_row_process(statedict, name,index):
  
  '''... if more then one winning row check for the next one ...'''
  
  global winning_combinations_stack
  global next_combination
  global naechste_linie
  if len(winning_combinations_stack) > 0:
    idx = winning_combinations_stack[0][1]
    naechste_linie = winning_combinations_stack[0][2]
    winning_combinations_stack = winning_combinations_stack[1:]
    winning_plan = statedict[name][TABLE][game_mode]()
    next_combination = winning_plan[idx][COLUMN_WIN_COMBINATIONS]
    put_into_account(statedict[name][TABLE], idx, winning_plan[idx])
    return winning_plan[idx][COLUMN_NEXT_STATE], idx
  else:
    # should not happen
    print "ERROR: There is no next winning row!!!"
    sys.exit(1)

# logging

def print_head():
  
  '''... print counters ...'''
  
  print "-------------------------------------------------------------"
  print "Counters:"
  c = (JP, TURBO, SUPER, FOUR_ROW, MONEY, EXTRA_POINT, EXTRA_PLUS_LEFT, EXTRA_PLUS_RIGHT, POWER_RUN_COUNTER)
  for z in counter.keys():
    if counter[z]!=0 and z in c:
      print z, counter[z]   
  print "-------------------------------------------------------------"

def print_bottom():
  
  ''' ... print carry overs ...'''
  
  for z in carry.keys():
    if carry[z]>0:
      print z, carry[z]
  
def log_normal(frame_nr, statedict, name, index):
  
  '''... normal rotor game has been finished print result ...'''
  
  global num_games
  global picture
  num_games+=1
  if LOGGING or INTERACTIVE:
    print "#############################################################"
    print "Game No.: %s is a %s" % (str(frame_nr),name)
    print "Mode: ",game_mode 
    if ADVANCED_LOGGING:
      print "Rotor Picture:"
      print picture[:3]
      print picture[3:]
    if len(winning_combinations)>0:
      print "Winning combinations:"
    for prize in winning_combinations:
      print prize
    print_head()
    print_bottom()
    
def log_draw(frame_nr, statedict, name, index):
  
  '''... risk draw has been finished ...'''
  
  global num_draws
  num_draws+=1
  stats[name][statedict[name][TABLE][SYMBOLS][index]]+=1
  if LOGGING or INTERACTIVE:
    print "Game No. %s features a %s:" % (str(frame_nr), name)
    print_bottom()
  
def log_wheel(frame_nr, statedict, name, index):
  
  '''... wheel of fortune has been finsihed ...'''
  
  global num_wheel
  num_wheel+=1
  stats[name][statedict[name][TABLE][SYMBOLS][index]]+=1
  if LOGGING or INTERACTIVE:
    print "Game No.: %s features a %s:" % (str(frame_nr), name)
    print_bottom()
    
def log_risiko(frame_nr, statedict, name, index):
  
  '''... risk step has been evaluated ...'''
  
  global num_risk_steps
  num_risk_steps+=1
  if LOGGING or INTERACTIVE:
    if not risk_accept_flg:
      print "Risk accepted"
    else:
      print "Risk declined, price accepted!"
    print_bottom()
  
def log_win(frame_nr, statedict, name, index):
  
  '''... win!!!! ....'''
  
  global num_won
  num_won+=1
  if LOGGING or INTERACTIVE:
    print "Game No. %s wins! Prize will be put onto account!" % str(frame_nr)

def log_jackpot(frame_nr, statedict, name, index):
  
  '''... Jackpot win!!! ...'''
  
  global num_jackpot
  num_jackpot+=1
  if LOGGING or INTERACTIVE:
    print "Game No. %s features a JACKPOT!!!" % (str(frame_nr))
    print_bottom()

def log_srplus(frame_nr, statedict, name, index):
  
  '''... extra point plus has been won ...'''
  
  if LOGGING or INTERACTIVE:
    print "EXTRA_POINT-Plus won!!!"
    print_bottom()

def log_next_row(frame_nr, statedict, name, index):
  
  '''... risk failed check next row ...'''
  
  global next_combination
  if LOGGING or INTERACTIVE:
    print "There is another winning row:"
    print next_combination
    print_bottom()

# key handling and print game ro console

def handle_keys_textmode(state, index):
  global risk_fail_flg
  global risk_win_flg
  global risk_accept_flg
  global cheatrun
  global cheatcode
  global macro_list
  global gfx_toggle
  global TEXT_MODE
  risk_fail_flg = 0
  risk_win_flg = 0
  risk_accept_flg = 0
  cheatrun = 0
  if state != ROLLERS and state != RISK_L and state != RISK_R:
    return state
  if (state==RISK_L or state==RISK_R) and index==4:
    return state
  if INTERACTIVE:
    # interactive user input
    strg = "Next State: %s \nInput: " % state
    xinput = raw_input(strg)
    if state == ROLLERS:
      try:
        if xinput.startswith("SUPER "):
          i = int(xinput[7:])
          carry[SUPER]=i
          return WIN
        elif xinput.startswith("TURBO "):
          i = int(xinput[4:])
          carry[TURBO]=i
          return WIN
        elif xinput.startswith("EXTRA "):
          i = int(xinput[3:])
          carry[EXTRA_POINT]=i
          return WIN
        elif xinput.startswith("JACKS "):
          i = int(xinput[3:])
          carry[JP]=i
          return WIN
        elif xinput.startswith("MONEY "):
          i = int(xinput[5:])
          carry[MONEY]=i
          return WIN
      except:
        pass
    print " "
    if xinput == "q":
      sys.exit()
    if state == RISK_L or state == RISK_R:
      if xinput == "1": risk_fail_flg = 1
      elif xinput == "5": risk_win_flg = 1
      elif xinput == "4": risk_accept_flg = 1
    elif state == ROLLERS:
      cheatrun = 1
      cheatcode = xinput
  elif MACRO:
    # handle macro string
    if len(macro_list)==0: return END_OF_GAME
    xinput = macro_list[0]
    if LOGGING:
      strg = "Next state: %s \nInput: %s " % (state, xinput)
      print strg
    macro_list = macro_list[1:]
    if state == RISK_L or state == RISK_R:
      if xinput == "1": risk_fail_flg = 1
      elif xinput == "5": risk_win_flg = 1
      elif xinput == "4": risk_accept_flg = 1
    elif state == ROLLERS:
      cheatrun = 1
      cheatcode = xinput
  else:
    # no interaction loop game
    if state == RISK_R and index == 10 and RECEIVING_40:
      # always decline risk draw
      risk_accept_flg = 1
  return state
      
# state dispatch table

STATES =  {
    ROLLERS :
    { TABLE      : BONUS_SCHEME,
      ROWS       : WINNING_ROWS,
      ROUTE    : normal_process, 
      LOG          : log_normal
    },
    DRAW20 : 
    { TABLE      : DRAW_20,
      ROUTE    : draw_process, 
      LOG          : log_draw
    },
    DRAW30  : 
    { TABLE      : DRAW_30,
      ROUTE    : draw_process, 
      LOG          : log_draw
    },
    DRAW200  : 
    { TABLE      : DRAW_200,
      ROUTE    : draw_process, 
      LOG          : log_draw
    },
    DRAW300  : 
    { TABLE      : DRAW_300,
      ROUTE    : draw_process, 
      LOG          : log_draw
    },
    DRAW2S   : 
    { TABLE      : DRAWS2S,
      ROUTE    : draw_process, 
      LOG          : log_draw
    },
    DRAW3S   : 
    { TABLE      : DRAWS3S,
      ROUTE    : draw_process, 
      LOG          : log_draw
    },
    FAIL40 : 
    { TABLE      : DRAW_FAIL_40,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    FAIL50 : 
    { TABLE      : DRAW_FAIL_50,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    WHEEL40  :
    { TABLE      : WHEEL_40,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    WHEEL60  :
    { TABLE      : WHEEL_60,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    WHEEL80  :
    { TABLE      : WHEEL_80,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    DRAW3BAR :
    { TABLE      : DRAWS3BAR,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    DRAWGOLD :
    { TABLE      : DRAW_GOLD,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    DRAW3X7 :
    { TABLE      : DRAW_TRIPEL7,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    RISK_R  :
    { TABLE      : RISK_RIGHT,
      ROUTE    : risk_dispatch_process, 
      LOG          : log_risiko
    },
    RISK_L  :
    { TABLE      : RISK_LEFT,
      ROUTE    : risk_dispatch_process, 
      LOG          : log_risiko
    },
    JACKPOT :
    { ROUTE    : jackpot_route,
      LOG          : log_jackpot
    },
    WIN  :
    { ROUTE    : win_route,
      LOG          : log_win
    },
    EXTRA_PLUS :
    { ROUTE    : extra_plus_process,
      LOG          : log_srplus
    },
    NEXT_ROW :
    { TABLE      : BONUS_SCHEME,
      ROWS       : WINNING_ROWS,
      ROUTE    : next_row_process,
      LOG          : log_next_row
    },
    START4S  :
    { TABLE      : WHEEL_START4S,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    START8S  :
    { TABLE      : WHEEL_START8S,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    START8T  :
    { TABLE      : WHEEL_START8T,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    START20T  :
    { TABLE      : WHEEL_START20T,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    START40T  :
    { TABLE      : WHEEL_START40T,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    START6S  :
    { TABLE      : WHEEL_START6S,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    START12S  :
    { TABLE      : WHEEL_START12S,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    START12T  :
    { TABLE      : WHEEL_START12T,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    START25T  :
    { TABLE      : WHEEL_START25T,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    },
    START50T  :
    { TABLE      : WHEEL_START50T,
      ROUTE    : draw_process, 
      LOG          : log_wheel
    }
  }

def get_risk_step(state, next_state, win_index):
  
  '''... determins current risk step ...'''
  
  if (next_state == RISK_L):
    if state == ROLLERS or state == NEXT_ROW:
      symbol = STATES[state][TABLE][game_mode]()\
               [win_index][COLUMN_SYMBOL]
      if symbol != NOPE:
        return RISK_LEFT[SYMBOLS].index(symbol)
      else:
        return win_index
    else:
      return RISK_LEFT[SYMBOLS].\
           index(STATES[state][TABLE][SYMBOLS][win_index])
  elif (next_state == RISK_R):
    if state == ROLLERS or state == NEXT_ROW:
      symbol = STATES[state][TABLE][game_mode]()\
               [win_index][COLUMN_SYMBOL]
      if symbol != NOPE:
        return RISK_RIGHT[SYMBOLS].index(symbol)
      else:
        return win_index
    else:
      return RISK_RIGHT[SYMBOLS].\
           index(STATES[state][TABLE][SYMBOLS][win_index])
  else:
   return win_index

def main():
  
  '''game loop'''
  
  global di
  global do
  global winning_line
  global anim_einlauf_flg
  global anim_risiko_anbieten_flg
  global rad_done
  global tick_mark
  global anim_abbruch
  state = ROLLERS
  state_old = ROLLERS
  tick = 1
  ze = 0
  game_cnt = 1
  flg = 1
  index = UNDEFINED
  old_index = UNDEFINED
  events = []
  
  while (state != END_OF_GAME and game_cnt < NUM_GAMES+1):
    
    # process pre rules
    
    state = pre_rules(state, index)
    
    # handle keys
    
    state = handle_keys_textmode(state, index)
    
    # game over
    
    if state == END_OF_GAME:
      break
    
    # delete carry over counters
    
    if state != WIN:
      for z in carry.keys():
        carry[z] = 0
        
    # determine next state
    
    next_state, index = STATES[state][ROUTE] \
                            (STATES,state,index)
    
    # process post rules
    
    next_state = post_rules \
                          (state, next_state, index)
    
    # logging
    
    STATES[state][LOG](game_cnt,STATES,state,index)
    
    # set risk step
    
    old_step = index
    index = get_risk_step(state, next_state, index)
    
    # count games
    
    if next_state == ROLLERS:
      game_cnt+=1
    
    # set next state
    
    old_state = state
    old_index = old_step
    state = next_state
    tick+=1

def print_stats():
  
  '''... prints statistics ...'''
  
  quote = counter[MONEY_TOTAL]*100.0/(NUM_GAMES*DEPOSIT)
  print "--------------------------------------------------------"
  print "Rotor games: ", num_games
  print "--------------------------------------------------------"
  print "--------------------------------------------------------"
  print "Payout Rate: %5.2f" % quote
  print "--------------------------------------------------------"
  print "--------------------------------------------------------"
  print "Occurrence of symbols:"
  print "--------------------------------------------------------"
  print " "
  sortiert = stats.keys()
  sortiert.sort()
  for name in sortiert:
    print name
    print "--------------------------------------------------------"
    cash = 0
    top = 0
    master = 0
    for symbol in stats[name]:
      i = STATES[name][TABLE][SYMBOLS].index(symbol)
      a = stats[name][symbol]
      summe = a*STATES[name][TABLE][PRIZE][i]
      wahr = STATES[name][TABLE][PROPABILITY][i]
      print symbol+(20-len(symbol))*" ", "mal", \
            str(a)+(10-len(str(a)))*" ","Wahrsch.", wahr
      if symbol[-1]=="C": cash+=summe
      if symbol[-1]=="T": top+=summe
      if symbol[-1]=="M": master+=summe
    print "--------------------------------------------------------"
    print "Sum of Turbo-Games:",top," Super-Games:",master," Money:",cash
    print " "
  print "--------------------------------------------------------"
  print "--------------------------------------------------------"
  print "Sum of all draws: ", num_draws
  print "--------------------------------------------------------"
  print "--------------------------------------------------------"
  print "Sum of all prizes: ", num_won
  print "--------------------------------------------------------"
  print "--------------------------------------------------------"
  print "Sum of all wheels of forutune: ", num_wheel
  print "--------------------------------------------------------"
  print "--------------------------------------------------------"
  print "All counters:"
  print "--------------------------------------------------------"
  summen = []
  sortiert = counter.keys()
  sortiert.sort()
  for z in sortiert:
    if not z.startswith("Sum"):
      print z+(20-len(z))*" ", "Value:", counter[z]
      print "--------------------------------------------------------"
    else:
      summen.append(z)
  print "--------------------------------------------------------"
  print "Sum of all prizes"
  print "--------------------------------------------------------"
  for s in summen:
    print s, counter[s]
    print "--------------------------------------------------------"
  print "--------------------------------------------------------"
  print "Payout Rate: %5.2f" % quote
  print "--------------------------------------------------------"

def create_inner_string(strg):
  inner = ''
  int_puff = ""
  i = 0
  do_int = 0
  c = ''
  while i < len(strg):
    if (strg[i] != '[' and strg[i] != ']'\
        and not do_int):
      c = strg[i]
    if strg[i] == '[':
      do_int = 1
    elif strg[i] == ']':
      do_int = 0
      x = int(int_puff)-1
      inner+=x*c
      int_puff = ''
      c = ''
    elif do_int:
      int_puff+=strg[i]
    elif not do_int:
      inner+=c
    i+=1
  return inner

def create_macro(strg):
  
  '''... creates code for macro mode ...'''
  
  tokens = string.split(strg, 'X')
  i = 0
  result = ''
  try:
    if len(tokens) > 1:
      if len(tokens)%2==0:
        maxi = len(tokens)-1
      else:
        maxi = len(tokens)-2
      while i < maxi:
        result+=create_inner_string(tokens[i])*int(tokens[i+1])
        i+=2
      if maxi == len(tokens)-2:
        result+=create_inner_string(tokens[-1])
    else:
      result = create_inner_string(tokens[0])
  except:
    print "ERROR: Macro string does not fit!!!"
    sys.exit(1)
  return result

exclude = (ROLLERS, WIN, JACKPOT, RISK_R, RISK_L, EXTRA_PLUS, NEXT_ROW)
for name in STATES.keys():
  if name not in exclude:
    stats[name] = {}
for name in stats.keys():
  for symbol in STATES[name][TABLE][SYMBOLS]:
    stats[name][symbol] = 0

# command line parameters

if __name__ == '__main__':
  try:
    opts,args = getopt.getopt(sys.argv[1:],"abrtlim:n:xz")
    for o,v in opts:
      if o == '-b':
        if MACRO or TOTAL or RECEIVING_40 or INTERACTIVE or TEST:
          print "ERROR: Option conflict!!!"
          sys.exit(1)
        BLIND = 1
        TEXT_MODE=1
        print "Blind game mode active...\n"
      elif o == '-r':
        if BLIND or MACRO or INTERACTIVE or RECEIVING_40 or TEST:
          print "ERROR: Option conflict!!!"
          sys.exit(1)
        TOTAL = 1
        TEXT_MODE=1
        print "Total Risk Mode activated...\n"
      elif o == '-a':
        if BLIND or TOTAL or MACRO or INTERACTIVE or TEST:
          print "ERROR: Option conflict!!!"
          sys.exit(1)
        RECEIVING_40 = 1
        TEXT_MODE=1
        print "Accept 40TS Mode activated...\n"
      elif o == '-l':
        if MACRO or INTERACTIVE:
          print "ERROR: Option conflict!!!"
          sys.exit(1)
        LOGGING = 1
        print "Logging activated...\n"
      elif o == '-i':
        if MACRO or TOTAL or BLIND or RECEIVING_40 or TEST:
          print "ERROR: Option conflict!!!"
          sys.exit(1)        
        print "Interactive mode...\n"
        INTERACTIVE = 1
        LOGGING = 1
      elif o == '-m':
        if BLIND or TOTAL or INTERACTIVE or RECEIVING_40 or TEST:
          print "ERROR: Option conflict!!!"
          sys.exit(1)
        MACRO = 1
        LOGGING = 1
        letters = '[]abcdefghijklmnopqrstuvwxyz0123456789X'
        for c in v:
          if c not in letters:
            print "ERROR: Macro Option has to be in "+letters+" sein!!!"
            sys.exit(1)
        print "Macro Modus..."
        print "Code: ", v
        print "\n"
        macro_list = create_macro(v)
      elif o == '-n':
        NUM_GAMES = int(v)
      elif o == "-t":
        TEST = 1
      elif o == "-z":
        ADVANCED_LOGGING = 0        
      elif o == "-x":
        TEXT_MODE = 1        
  except:
    print __doc__
    sys.exit(1)
  if len(opts)==0: INTERACTIVE = 1
  ti = time.time()

  if not TEST:
    main()
    print "\n"
    print "*************************"
    print "*  RESULT  *"
    print "*************************\n"
    print "Time:", time.time()-ti
    print_stats()
    sys.exit(1)
