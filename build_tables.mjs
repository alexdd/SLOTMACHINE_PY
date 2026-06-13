import fs from 'fs';



const py = fs.readFileSync('slotmachine_tables.py', 'latin1');



function convertTupleLine(line) {

  return line

    .trim()

    .replace(/^\(\(/, '[[')

    .replace(/\),\s*/, '], ')

    .replace(/\),?\s*$/, '],')

    .replace(/\)\s*,?\s*$/, '],')

    .replace(/\(\(/g, '[')

    .replace(/\)\)/g, ']')

    .replace(/\(/g, '[')

    .replace(/\)/g, ']')

    .replace(/,\s*\]/g, ']')

    .replace(/\[\s+/g, '[')

    .replace(/\s+\]/g, ']');

}



const constRe = /^([A-Z_][A-Z0-9_]*)\s*=\s*(.+)$/gm;

const constants = [];

let m;

while ((m = constRe.exec(py)) !== null) {

  const name = m[1];

  if (['CYLINDER', 'NORMAL_PLAN', 'SUPER_PLAN', 'TURBO_PLAN', 'WINNING_ROWS'].includes(name)) continue;

  if (name.startsWith('DRAW_') || name.startsWith('WHEEL_') || name === 'RISK_LEFT' || name === 'RISK_RIGHT') continue;

  if (name.startsWith('DRAWS')) continue;

  constants.push(`const ${name} = ${m[2].trim()};`);

}



const cylBlock = py.match(/CYLINDER = \[\(\),\(\),\(\)\][\s\S]*?(?=DRAW_20 =)/)[0];

let cylJs = cylBlock

  .replace(/CYLINDER = \[\(\),\(\),\(\)\]/, 'const CYLINDER = [[], [], []];')

  .replace(/CYLINDER\[(\d+)\] = \(/g, 'CYLINDER[$1] = [')

  .replace(/\)\s*$/gm, '];')

  .replace(/^#.*$/gm, '')

  .trim();



function convertObjectTable(block) {

  const name = block.match(/^([A-Z_][A-Z0-9_]*)/)[1];

  let body = block

    .replace(/^[A-Z_][A-Z0-9_]*\s*=\s*\{/, '')

    .replace(/\}\s*$/, '')

    .replace(/:\s*\(/g, ': [')

    .replace(/\)\s*,?\s*$/gm, '],')

    .replace(/\)\s*,/g, '],')

    .trim();

  return `const ${name} = {\n${body}\n};`;

}



const objectTables = [];

const objNames = ['DRAW_20','DRAW_30','DRAW_200','DRAW_300','DRAWS2S','DRAWS3S','DRAW_FAIL_40','DRAW_FAIL_50',

  'WHEEL_40','WHEEL_60','WHEEL_80','WHEEL_START4S','WHEEL_START6S','WHEEL_START8S','WHEEL_START12S',

  'WHEEL_START8T','WHEEL_START12T','WHEEL_START20T','WHEEL_START25T','WHEEL_START40T','WHEEL_START50T',

  'DRAWS3BAR','DRAW_GOLD','DRAW_TRIPEL7','RISK_LEFT','RISK_RIGHT'];



for (const name of objNames) {

  const re = new RegExp(`${name}\\s*=\\s*\\{[\\s\\S]*?\\n\\s*\\}`, 'm');

  const block = py.match(re);

  if (block) objectTables.push(convertObjectTable(block[0]));

}



function convertPlan(name, nextName) {

  const re = new RegExp(`${name}\\s*=\\s*\\(([\\s\\S]*?)\\n\\s*\\)\\s*(?=\\n\\s*${nextName}|\\n\\s*#|$)`, 'm');

  const match = py.match(re);

  if (!match) throw new Error('Plan not found: ' + name);

  const block = match[1];

  const rows = block.split('\n').filter(l => l.trim().startsWith('(('));

  const converted = rows.map(l => {

    let row = l.trim().replace(/,\s*$/, '');

    row = row.replace(/^\(\(/, '[[').replace(/\),\s*/, '], ');

    row = row.replace(/\)\s*$/, ']');

    return '  ' + row;

  }).join(',\n');

  return `const ${name} = [\n${converted}\n];`;

}



const plans = [

  convertPlan('NORMAL_PLAN', 'SUPER_PLAN'),

  convertPlan('SUPER_PLAN', 'TURBO_PLAN'),

  convertPlan('TURBO_PLAN', '# up to 4 winning lines'),

];



const wrBlock = py.match(/WINNING_ROWS = \{[\s\S]*?\n\s*\}/)[0];

const wrJs = wrBlock

  .replace(/WINNING_ROWS = \{/, 'const WINNING_ROWS = {')

  .replace(/:\s*\(\s*\(/g, ': [[')

  .replace(/\),\s*\(/g, '], [')

  .replace(/\)\s*,/g, '],')

  .replace(/\)\s*\n/g, ']\n')

  .replace(/\}\s*$/, '};');



const body = `// slotmachine_tables.js - Tables for slotmachine_main.js

// Ported from slotmachine_tables.py (Alex Duesel, GPL-3.0)



${constants.join('\n')}



${cylJs}



${objectTables.join('\n\n')}



${plans.join('\n\n')}



${wrJs}

`;



const names = [...body.matchAll(/^const ([A-Z_][A-Z0-9_]*)\s*=/gm)].map((match) => match[1]);

const uniqueNames = [...new Set(names)];



const out = `(function() {
// Copyright (c) Alex Duesel — www.tekturcms.de 2026
${body}
window.SlotTables = { ${uniqueNames.join(', ')} };
})();
`;



fs.writeFileSync('slotmachine_tables.js', out);

console.log('written slotmachine_tables.js (browser)');

