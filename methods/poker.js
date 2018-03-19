const utils = require("./utils");
const ApiError = require("../utils/ApiError");
const CASES = ["TD", "1P", "2P", "T", "TP1", "P", "Q"];
const PROB_VALUES = {
  TD: 0.3024,
  "1P": 0.504,
  "2P": 0.108,
  T: 0.072,
  TP1: 0.009,
  P: 0.0045,
  Q: 0.0001
};

const CASES_QUANTITYS = {
  2: "1P",
  3: "T",
  4: "P",
  5: "Q"
};
module.exports = function(numbers, significancy) {
  const pokerTable = poker(numbers);
  const groupedTable = groupPokerTable(pokerTable);
  const totalsTable = calculateTotal(groupedTable);
  const x2Calc = getX2Calc(totalsTable);
  const x2Table = utils.reverseChi(
    significancy,
    Object.keys(totalsTable).length - 1
  );
  console.log("X", x2Calc, x2Table);
  const valid = x2Calc < x2Table;
  return {
    valid: valid,
    table: calculateTotal(poker(numbers)),
    groupedTable: groupedTable,
    x2Calc: x2Calc,
    x2Table: x2Table
  };
};

function getX2Calc(table) {
  let x2Calc = 0;
  for (var i in table) {
    x2Calc += table[i].t;
  }
  return x2Calc;
}

function associativeRepeates(str) {
  var obj = {};
  var repeats = [];
  for (x = 0, length = str.length; x < length; x++) {
    var l = str.charAt(x);
    obj[l] = isNaN(obj[l]) ? 1 : obj[l] + 1;
  }
  return obj;
}

function evaluateCase(obj) {
  const casesGetted = {
    "1P": 0,
    T: 0,
    P: 0,
    Q: 0
  };

  for (var key in obj) {
    if (CASES_QUANTITYS[obj[key]]) {
      casesGetted[CASES_QUANTITYS[obj[key]]] += 1;
    }
  }

  if (casesGetted["1P"] == 2) return "2P";
  if (casesGetted["1P"] == 1 && casesGetted["T"] == 1) return "TP1";
  if (casesGetted["P"] == 1) return "P";
  if (casesGetted["Q"] == 1) return "Q";
  if (casesGetted["1P"] == 1) return "1P";
  if (casesGetted["T"] == 1) return "T";
  return "TD";
}

function countObserverFreq(numbers, table) {
  let repeatedObj, casse, n;

  for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] > 1)
      throw new ApiError("Este metodo solo permite valores entre 0 y 1", 400);
      
    n = convertToExpected(numbers[i].toString()).substring(2, 7);
    repeatedObj = associativeRepeates(n);
    casse = evaluateCase(repeatedObj);
    table[casse].fo += 1;
  }
  return table;
}

function convertToExpected(str) {
  while (str.length < 7) {
    str = str + "0";
  }
  return str;
}

function calculateExpectedFreq(table, n) {
  for (var key in table) {
    table[key].fe = n * PROB_VALUES[key];
  }
  return table;
}

function poker(numbers) {
  let table = {
    TD: { fo: 0, fe: PROB_VALUES["TD"], t: 1 },
    "1P": { fo: 0, fe: PROB_VALUES["1P"], t: 1 },
    "2P": { fo: 0, fe: PROB_VALUES["2P"], t: 1 },
    T: { fo: 0, fe: PROB_VALUES["T"], t: 1 },
    TP1: { fo: 0, fe: PROB_VALUES["TP1"], t: 1 },
    P: { fo: 0, fe: PROB_VALUES["P"], t: 1 },
    Q: { fo: 0, fe: PROB_VALUES["Q"], t: 1 }
  };
  table = countObserverFreq(numbers, table);
  table = calculateExpectedFreq(table, numbers.length);
  return table;
}

function calculateTotal(table) {
  for (var key in table) {
    table[key].t = Math.pow(table[key].fe - table[key].fo, 2) / table[key].fe;
  }
  return table;
}

function groupPokerTable(table) {
  let groupTable = {};
  let arrayTable = convertToArray(table);
  regressiveSume(arrayTable, 0);
  table = toPokerObject(arrayTable);
  for (var key in table) {
    if (table[key].fe >= 5) {
      groupTable[key] = table[key];
      delete table[key];
    }
  }
  return groupTable;
}

function convertToArray(table) {
  let arry = [];
  for (var i in table) {
    arry.push(table[i]);
  }
  return arry;
}

function toPokerObject(arry) {
  return {
    TD: arry[0],
    "1P": arry[1],
    "2P": arry[2],
    T: arry[3],
    TP1: arry[4],
    P: arry[5],
    Q: arry[6]
  };
}

function regressiveSume(table, i) {
  if (table[i]) {
    let regresive = regressiveSume(table, i + 1);
    if (regresive) {
      table[i].fe += regresive.fe;
      table[i].fo += regresive.fo;
    }
    if (table[i].fe < 5) return { fe: table[i].fe, fo: table[i].fo };
    else return null;
  } else return null;
}
