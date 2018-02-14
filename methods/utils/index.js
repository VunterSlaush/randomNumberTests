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

function chiSquareTable(x, dof) {
  console.log("CHI SQUARE", x, dof);
  return jStat.chisquare.cdf(x, dof);
}

function kolmogorovTable(n, a) {
  if (n > 35) n = 35;

  const table = findRow(tables["kolmogorov.js"], n);

  if (table[n.toString()] == null) throw new Exception("Error Value Not Found");
  const values = table[n.toString()];
  let signIndex = 0.2;
  for (var i = 0; i < values.length; i++) {
    if (a == signIndex.toFixedDown(2)) return values[i];
    if (signIndex > 0.05) signIndex -= 0.05;
    else signIndex = 0.01;
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
