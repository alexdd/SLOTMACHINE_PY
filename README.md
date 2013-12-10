SLOTMACHINE_PY
=================

If you have ever wondered how a State-of-the-Art slotmachine works,
then this Python program is for you. 

It features a complete state machine, bonus scheme and special rules of a commercial slotmachine.
Well actually I modified the rules in order to get a better payout rate :-] 

It features various parameter options, even support for macros, see comments in source code.


Prerequisites
-------------

* Python must be installed on your machine


Test-Run
-------

Execute python slotmachine_main.py and watch console output


Options
-------------

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
   
License
-------

SLOTMACHINE_PY is licensed under the GNU General Public License, see file license.txt.
