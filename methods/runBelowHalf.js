const utils = require("./utils");

module.exports = function(numbers, a) {
  const media = utils.calculateMedia(numbers);
  const runStr = toRunString(numbers, media);
  const runs = utils.calculateRuns(runStr);
  const n1 = runsForCertainChar(runStr, "+");
  const n2 = runsForCertainChar(runStr, "-");
  const expected = calculateExpected(n1, n2);
  const varianza = calculateVarianza(n1, n2, numbers.length);
  const zCalculated = calculateZ(runs, expected, varianza);
  const zIndex = 1 - a / 2;
  const zFromTable = utils.reverseZ(zIndex);
  const valid = zCalculated < zFromTable;
  return {
    valid: valid,
    zCalculated: zCalculated,
    runs: runs,
    n1: n1,
    n2: n2,
    zFromTable,
    runStr
  };
};

function toRunString(numbers, media) {
  let str = "";
  for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] >= media) str += "+";
    else str += "-";
    console.log("", numbers[i], " VS ", media, str.charAt(i));
  }
  return str;
}

function runsForCertainChar(runStr, chr) {
  let count = 0;
  for (var i = 0; i < runStr.length; i++) {
    if (runStr.charAt(i) == chr) count++;
  }
  return count;
}

function calculateExpected(n1, n2) {
  const a = 2 * n1 * n2;
  const b = n1 + n2;
  return 1 + a / b;
}

function calculateVarianza(n1, n2, n) {
  const twoN = 2 * n1 * n2;
  const nPow = Math.pow(n, 2);
  const a = twoN * (twoN - n);
  const b = nPow * (n - 1);
  return a / b;
}

function calculateZ(runs, expected, varianza) {
  const a = runs - expected;
  return a / Math.sqrt(varianza);
}
