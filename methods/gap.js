const utils = require("./utils");
module.exports = function(numbers, significancy = 0.05) {
  const table = generateTable(numbers);
  const filledTable = fillTable(table, numbers);
  const higherGap = findHigherGap(table);
  const higherDivisor = findHighDivisor(higherGap);
  const intervalsTable = generateIntervalsTable(higherDivisor, higherGap);
  fillFreqColum(table, intervalsTable);
  const divideBy = numbers.length - Object.keys(table).length;
  fillReFreqColum(intervalsTable, divideBy);
  fillSNColum(intervalsTable);
  fillFXColum(intervalsTable); // and Result!
  const max = findMaxFromResults(intervalsTable);
  const valid = utils.kolmogorovTable(numbers.length, significancy) >= max;
  return {
    valid: valid,
    dCalc: max,
    dTable: utils.kolmogorovTable(numbers.length, significancy),
    table1: table,
    intervalsTable: intervalsTable
  };
};

function generateTable(numbers) {
  const table = {};
  for (var i = 0; i < numbers.length; i++) {
    if (!table[numbers[i]]) {
      table[numbers[i]] = { gaps: [], gapsCount: 0 };
    }
  }
  return table;
}

function gapsOf(number, numbers) {
  const gaps = [];
  let lastIndex;
  for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] == number) {
      if (lastIndex) gaps.push(i - lastIndex - 1);
      lastIndex = i;
    }
  }
  return gaps;
}
function fillTable(table, numbers) {
  let gaps;
  for (var i in table) {
    gaps = gapsOf(i, numbers);
    table[i].gaps = gaps;
    table[i].gapsCount = gaps.length;
  }
  return table;
}
function findHigherGap(table) {
  let higher = 0;
  for (var i in table) {
    for (var j = 0; j < table[i].gaps.length; j++) {
      if (higher < table[i].gaps[j]) {
        higher = table[i].gaps[j];
      }
    }
  }
  return higher;
}
function findHighDivisor(number) {
  let divisor = 1;
  if (number % 2 != 0) number += 1;
  for (var i = 1; i <= 3; i++) {
    if (number % i == 0) divisor = i;
  }

  return divisor;
}
function generateIntervalsTable(divisor, limit) {
  let from = 0; // 0
  let to = divisor; // 5
  const table = {};

  for (var i = 0; i < limit / divisor; i++) {
    table[from + "-" + to] = { from: from, to: to };
    if (to == limit) break;
    from = to + 1; // 6
    to = to + divisor + 1; // 5 + 5 + 1 = 11

    //if (to > limit) to = limit;
  }
  return table;
}
function freqIn(table, from, to) {
  let count = 0;
  for (var i in table) {
    for (var j = 0; j < table[i].gaps.length; j++) {
      if (from <= table[i].gaps[j] && to >= table[i].gaps[j]) {
        count++;
      }
    }
  }
  return count;
}
function fillFreqColum(table, intervalsTable) {
  for (var i in intervalsTable) {
    intervalsTable[i].freq = freqIn(
      table,
      intervalsTable[i].from,
      intervalsTable[i].to
    );
  }
}
function fillReFreqColum(intervalsTable, divideBy) {
  for (var i in intervalsTable) {
    intervalsTable[i].refreq = intervalsTable[i].freq / divideBy;
  }
}
function fillSNColum(intervalsTable) {
  let sum = 0;
  for (var i in intervalsTable) {
    intervalsTable[i].sn = sum + intervalsTable[i].refreq;

    console.log("Sum", sum, intervalsTable[i].sn);
    sum += intervalsTable[i].refreq;
  }
}
function fillFXColum(intervalsTable) {
  for (var i in intervalsTable) {
    intervalsTable[i].fx = 1 - Math.pow(0.9, intervalsTable[i].to + 1);
    intervalsTable[i].result = Math.abs(
      intervalsTable[i].fx - intervalsTable[i].sn
    );
  }
}
function findMaxFromResults(table) {
  let higher = 0;
  for (var i in table) {
    if (higher < table[i].result) {
      higher = table[i].result;
    }
  }
  return higher;
}
