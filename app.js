const express = require("express");
const router = express.Router();
const routes = require("./routes");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const getSwaggerJSDocOpts = require("./docs/options.js");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs");
var favicon = require("serve-favicon");

const swaggerJSDocOpts = getSwaggerJSDocOpts(process.env.NODE_ENV);

const app = express();
const swaggerSpec = swaggerJSDoc(swaggerJSDocOpts);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/assets/favicon.ico"));

app.get("/", function(req, res) {
  res.render("index.html");
});

app.use("/api", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log("ERR", err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || "3000";
const server = app.listen(port, function() {
  console.log(`Listening on http://localhost:${port}/`);
  //console.info(`App is running on  http://localhost:${port}`);
});

module.exports = server;
