SLOTMACHINE_PY
=================

**Blog:** [Pushbox J2ME → HTML5 in 49 minutes](http://www.tekturcms.de/index.html#2026-06-13-pushbox-j2me-to-html5-in-49-minutes) — write-up on the HTML5 port workflow (Alex Düsel, [tekturcms.de](http://www.tekturcms.de/))

If you have ever wondered how a State-of-the-Art slotmachine works,
then this Python program is for you.

It features a complete state machine, bonus scheme and special rules of a commercial slotmachine.
Well actually I modified the rules in order to get a better payout rate :-]

It features various parameter options, even support for macros, see comments in source code.


HTML5 browser UI (`html5-ui` branch)
------------------------------------

This branch adds a browser port of the simulation — no Python runtime required in the browser.

| File | Role |
|------|------|
| `index.html` | Main page |
| `slotmachine_tables.js` | Game tables (from `slotmachine_tables.py`) |
| `slotmachine_main.js` | Game logic (from `slotmachine_main.py`) |
| `slotmachine_ui.js` | Interactive UI (ASCII log, SVG reels, risk ladder, auto mode) |
| `style.css` | Layout and Tektur-themed styling |
| `build_tables.mjs` | Regenerates `slotmachine_tables.js` from the Python tables |

**Run locally**

```bash
# optional: local HTTP server
python -m http.server 8765
# open http://127.0.0.1:8765/index.html
```

Or open `index.html` directly in a modern browser (classic scripts, no build step).

**Branch on GitHub:** [github.com/alexdd/SLOTMACHINE_PY/tree/html5-ui](https://github.com/alexdd/SLOTMACHINE_PY/tree/html5-ui)


Prerequisites (Python CLI)
--------------------------

* Python must be installed on your machine


Test-Run (Python CLI)
---------------------

Execute `python slotmachine_main.py` and watch console output


Options (Python CLI)
--------------------

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

   Hint: Hold 'Enter' key in interactive mode in order to speed run games

License
-------

SLOTMACHINE_PY is licensed under the GNU General Public License, see file license.txt.
