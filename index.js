const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const connect = require("./src/configs/db");

const port = process.env.PORT || 3000;
const app = express();

//log
app.use(morgan("tiny"));

//parser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine for express
app.set("view engine", "ejs");
//app.set("views", path.resolve(__dirname, "views/ejs"));

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

//load routers
app.use("/", require("./src/routes/router"));

app.listen(port, async () => {
  try {
    await connect();
    console.log(`listening on port ${port}`);
  } catch (e) {
    console.log(e.message);
  }
});
