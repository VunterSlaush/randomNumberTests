const utils = require("./utils");

module.exports = function(numbers) {
  const runStr = toRunString(numbers);
  const runs = utils.calculateRuns(runStr);
  console.log("runStr", runStr);
  console.log("Runs", runs);

  const media = (2 * runs - 1) / 3;
  const varianza = (16 * runs - 29) / 90;
  const zCalc = (a - media) / varianza;
  console.log("Runs", runs, zCalc);
};

function toRunString(numbers) {
  let str = "";
  for (var i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] < numbers[i + 1]) str += "+";
    else str += "-";
  }
  return str;
}
