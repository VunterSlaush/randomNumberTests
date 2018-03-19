const utils = require("./utils");
const ApiError = require("../utils/ApiError");
module.exports = function(numbers, significancy) {
  const m = Math.sqrt(numbers.length);
  const expected = numbers.length / m;
  const intervals = generateIntervals(m, numbers, expected);
  const x2Calculated = getX2Calculated(intervals);
  const x2FromTable = utils.reverseChi(significancy, m - 1);
  const valid = x2Calculated < x2FromTable;
  return {
    valid: valid,
    x2Calculated: x2Calculated,
    x2FromTable: x2FromTable,
    intervals: intervals,
    m: m,
    elements: numbers.length
  };
};

function generateIntervals(m, numbers, expected) {
  const intervals = [];
  let sum = 0;
  for (var i = 1; i <= 10; i++) {
    let obj = {};
    obj.from = sum;
    sum += 0.1;
    sum = Math.round(sum * 100) / 100;
    obj.to = sum;
    obj.count = numbers.filter(function(n) {
      if (n > 1)
        throw new ApiError("Este metodo solo permite valores entre 0 y 1", 400)
      return n > obj.from && n <= obj.to;
    }).length;
    let a = Math.pow(obj.count - expected, 2);
    obj.x = a / expected;
    intervals.push(obj);
  }
  return intervals;
}

function getX2Calculated(intervals) {
  let sum = 0;
  for (var i = 0; i < intervals.length; i++) {
    sum += intervals[i].x;
  }
  return sum;
}
