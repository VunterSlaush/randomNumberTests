const utils = require("./utils");
module.exports = function(numbers, significancy) {
  const orderedNumbers = orderNumbers(numbers);
  const kolmogorovTestTable = kolmogorov(orderedNumbers);
  const dCalc = findMaxFromKolmogorovTable(kolmogorovTestTable);
  const valid = utils.kolmogorovTable(numbers.length, significancy) >= dCalc;
  return {
    valid: valid,
    dCalc: dCalc,
    dTable: utils.kolmogorovTable(numbers.length, significancy),
    tableResult: kolmogorovTestTable
  };
};

function orderNumbers(numbers) {
  return numbers.sort((n1, n2) => {
    return n1 - n2;
  });
}

function kolmogorov(numbers) {
  const table = [];
  let row;

  let n = numbers.length;
  for (var i in numbers) {
    row = {};
    row.i = i + 1;
    row.xi = numbers[i];
    row["i/n"] = (i + 1) / n;
    row["i/n-xi"] = row["i/n"] - row.xi;
    row["xi-(i-1)/n"] = (row.xi - i) / n;

    table.push(row);
  }

  return table;
}

function findMaxFromKolmogorovTable(table) {
  let maxIn = table[0]["i/n-xi"],
    maxXi = table[0]["xi-(i-1)/n"];
  for (var i in table) {
    if (maxIn < table[i]["i/n-xi"]) maxIn = table[i]["i/n-xi"];
    if (maxXi < table[i]["xi-(i-1)/n"]) maxXi = table[i]["xi-(i-1)/n"];
  }
  return maxXi > maxIn ? maxXi : maxIn;
}
