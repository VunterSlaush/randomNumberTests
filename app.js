const runTest = require("./methods/runTest");
const runBelowHalf = require("./methods/runBelowHalf");
const chiSquare = require("./methods/chiSquare");
const kolmogorov = require("./methods/kolmogorov");
const poker = require("./methods/poker");
console.log(
  poker(
    [
      0.85881,
      "0.99700",
      0.75289,
      0.82813,
      0.02818,
      0.36065,
      0.45649,
      0.06451,
      0.07582,
      0.73994,
      "0.52480",
      0.03333,
      "0.50410",
      0.76568,
      0.11767,
      0.37587,
      0.55763,
      0.33089,
      0.53339,
      "0.41700",
      0.24577,
      0.74797,
      0.92023,
      0.93143,
      "0.05520",
      0.94996,
      0.35838,
      0.85376,
      0.41727,
      0.08969
    ],
    0.05
  )
);
