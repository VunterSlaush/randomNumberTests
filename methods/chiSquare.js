const utils = require("./utils");
module.exports = function(numbers) {
  const m = Math.sqrt(numbers.length);
  const expected = numbers.length / m;
  const intervals = generateIntervals(m, numbers, expected);
  const x2Calculated = getX2Calculated(intervals);
  console.log("intervals", intervals, x2Calculated);
};

function generateIntervals(m, numbers, expected) {
  const intervals = [];
  let sum = 0;
  for (var i = 1; i <= m; i++) {
    let obj = {};
    obj.from = sum;
    sum += 1 / m;
    obj.to = sum;
    obj.count = numbers.filter(function(n) {
      return n >= obj.from && n < obj.to;
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
