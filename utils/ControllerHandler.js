var fs = require("fs");

const controllerHandler = method => async (req, res, next) => {
  try {
    const numbers = req.body.numbers
      ? req.body.numbers
      : await getNumbers(req.files.numbersFile);
    const result = method(numbers, req.body.significancy);
    return res.json(result || { message: "OK" });
  } catch (error) {
    console.log("Error", error);
    if (error.status) return res.status(error.status).json({ error: error });
    else res.status(500).json({});
  }
};

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

async function getNumbers(file) {
  const fileText = file.data.toString("utf8"); //await read(file.data);
  const matches = fileText
    .replaceAll("[", "")
    .replaceAll("]", "")
    .replaceAll(",", "")
    .split(" ")
    .map(function(item) {
      return Number(item);
    });
  return matches;
}

module.exports = controllerHandler;
