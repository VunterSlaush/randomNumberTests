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
  console.log("NN", numbers.length);
  return sum / numbers.length;
}
module.exports = { calculateRuns, calculateMedia };
