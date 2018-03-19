var fs = require("fs");

const controllerHandler = method => async (req, res, next) => {
  try {
    const numbers = req.body.numbers
      ? req.body.numbers
      : await getNumbers(req.files.numbersFile);
    const numbersFormatted =
      numbers instanceof Array ? numbers : convertToNumbers(numbers);
    const result = method(numbersFormatted, req.body.significancy);
    return res.json(result || { message: "OK" });
  } catch (error) {
    if (error.status) return res.status(error.status).json({ error: error.name});
    else res.status(500).json({error:"Error en los datos ingresados"});
  }
};

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

async function getNumbers(file) {
  const fileText = file.data.toString("utf8"); //await read(file.data);
  const matches = convertToNumbers(fileText);
  return matches;
}

function convertToNumbers(text) {
  console.log("CALLING convertToNumbers");

  return text
    .replaceAll("[", "")
    .replaceAll("]", "")
    .replaceAll(",", "")
    .split(" ")
    .map(function(item) {
      return Number(item);
    });
}

module.exports = controllerHandler;
