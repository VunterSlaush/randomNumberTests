const utils = require("./utils");

module.exports = function(numbers, significancy) {
  const runStr = toRunString(numbers);
  const runs = utils.calculateRuns(runStr);
  const media = (2 * runs - 1) / 3;
  const varianza = (16 * runs - 29) / 90;
  const zCalc = (significancy - media) / varianza;
  const zCalculated = 1 - significancy / 2;
  const zIndex = 1 - significancy / 2;
  const zFromTable = utils.reverseZ(zIndex);
  const valid = zCalculated < zFromTable;
  return { valid, zCalculated, media, zFromTable, runs, runStr };
};

function toRunString(numbers) {
  let str = "";
  for (var i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] < numbers[i + 1]) str += "+";
    else str += "-";
  }
  return str;
}
