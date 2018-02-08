var jStat = require("jStat").jStat;
function calculateRuns(runStr) {
  let count = 0;
  for (var i = 0; i < runStr.length; i++) {
    if (runStr.charAt(i) != runStr.charAt(i + 1)) count++;
  }
  return count;
}

function calculateMedia(numbers) {
  let sum = 0;
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length;
}

function getZPercent(z) {
  //z == number of standard deviations from the mean

  //if z is greater than 6.5 standard deviations from the mean
  //the number of significant digits will be outside of a reasonable
  //range
  if (z < -6.5) return 0.0;
  if (z > 6.5) return 1.0;

  var factK = 1;
  var sum = 0;
  var term = 1;
  var k = 0;
  var loopStop = Math.exp(-23);
  while (Math.abs(term) > loopStop) {
    term =
      0.3989422804 *
      Math.pow(-1, k) *
      Math.pow(z, k) /
      (2 * k + 1) /
      Math.pow(2, k) *
      Math.pow(z, k + 1) /
      factK;
    sum += term;
    k++;
    factK *= k;
  }
  sum += 0.5;

  return sum;
}

function reverseZ(z) {
  let init = 0.0;
  for (var i = 0.0; i < 6.5; i += 0.001) {
    if (z - GetZPercent(i) <= 0.000001) return i;
  }
  for (var i = 6.5; i >= 0.0; i -= 0.001) {
    if (z - GetZPercent(i) <= 0.000001) return i;
  }
}

function reverseChi(x, dof) {
  return jStat.chisquare.inv(1 - x, dof);
}

module.exports = {
  calculateRuns,
  calculateMedia,
  reverseZ,
  getZPercent,
  reverseChi
};
