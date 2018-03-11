const fs = require("fs");
const router = require("express").Router();

const isIndex = file => file === "index.js";
const isJS = file => file.substr(-3) === ".js";

fs.readdirSync("./routes").forEach(file => {
  if (isJS(file) && !isIndex(file)) {
    const routeName = file.split(".")[0].toLowerCase();
    console.log("routeName", routeName);
    const route = require("./" + file);
    router.use(`/${routeName}`, route);
  }
});

module.exports = router;
