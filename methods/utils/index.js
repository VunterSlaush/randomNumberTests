const jStat = require("jStat").jStat;
const requireAll = require("require-all");
const tables = requireAll({
  dirname: __dirname + "/tables",
  filter: filename => {
    return filename;
  }
});

Number.prototype.toFixedDown = function(digits) {
  var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
    m = this.toString().match(re);
  return m ? parseFloat(m[1]) : this.valueOf();
};

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
  let r;
  for (var i = 6.5; i >= 0.0; i -= 0.001) {
    r = Math.abs(z - getZPercent(i));
    if (r <= 0.00001) return i;
  }

  for (var i = -6.5; i < 0.0; i += 0.001) {
    r = Math.abs(z - getZPercent(i));
    if (r <= 0.00001) return i;
  }
}

function reverseChi(x, dof) {
  return jStat.chisquare.inv(1 - x, dof);
}

function chiSquareTable(x, dof) {
  return jStat.chisquare.cdf(x, dof);
}

function kolmogorovTable(n, a) {
  const significancies = [0.2, 0.1, 0.05, 0.02, 0.01, 0.005, 0.002, 0.001];
  const numerators = [1.07, 1.22, 1.36, 1.52, 1.63, 1.73, 1.85, 1.95];
  if (n > 50) {
    for (var i = 0; i < significancies; i++) {
      if (a == significancies[i]) return numerators[i] / Math.sqrt(n);
    }
  }

  const table = findRow(tables["kolmogorov.js"], n);

  if (table[n.toString()] == null) throw new Exception("Error Value Not Found");
  const values = table[n.toString()];

  for (var i = 0; i < significancies; i++) {
    if (a == significancies[i]) return values[i];
  }
}

function findRow(table, k) {
  for (var i in table) {
    if (Object.keys(table[i])[0] == k) {
      return table[i];
    }
  }
  return null;
}

module.exports = {
  calculateRuns,
  kolmogorovTable,
  calculateMedia,
  chiSquareTable,
  reverseZ,
  getZPercent,
  reverseChi
};
