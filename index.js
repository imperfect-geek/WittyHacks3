const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./app/config/connection");
const route = require("./app/route");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(function (req, res, next) {
  console.log("----------REQUEST LOG---------");
  console.log(new Date());
  console.log("req.method", req.method);
  console.log("req.url", req.url);
  console.log();
  console.log("req.body", req.body);
  console.log();
  console.log("req.params", req.params);
  console.log("-----------REQUEST LOG ENDS---");
  console.log();
  next();
});
app.use(express.static(__dirname + "/app/public"));
app.use(express.static(__dirname + "build"));
app.use(express.static(__dirname + "dist"));
app.use(cors());
app.use(route);

const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
