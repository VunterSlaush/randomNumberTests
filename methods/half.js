const utils = require("./utils");

module.exports = function(numbers, significancy) {
  const sumatory = sum(numbers);
  const n = numbers.length;
  const r = sumatory * (1 / n);

  const lir =
    1 / 2 -
    Math.abs(utils.reverseZ(significancy / 2)) * (1 / Math.sqrt(12 * n));
  const lsr =
    1 / 2 +
    Math.abs(utils.reverseZ(significancy / 2)) * (1 / Math.sqrt(12 * n));
  const valid = lir <= r && lsr >= r;
  return { valid, lir, lsr, n, r };
};

function sum(numbers) {
  return numbers.reduce((a, b) => a + b);
}
