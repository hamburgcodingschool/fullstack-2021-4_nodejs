const express = require("express");
const path = require("path");
const PORT = 3000;

const app = express();

let GLOBAL_RESULT;
let GLOBAL_METHOD;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // !important if using POST requests

app.post("/calculate", (req, res) => {
  console.log(req.body);
  const value1 = parseInt(req.body.value1, 10);
  const value2 = parseInt(req.body.value2, 10);

  let result = 0;
  let method = "";

  if (req.body.multiply) {
    result = value1 * value2;
    method = "multpliction";
  }
  if (req.body.add) {
    result = value1 + value2;
    method = "addition";
  }
  if (req.body.substract) {
    result = value1 - value2;
    method = "substraction";
  }
  if (req.body.divide) {
    result = value1 / value2;
    method = "division";
  }
  if (req.body.exp) {
    result = value1 ** value2;
    method = "exponentation";
  }
  GLOBAL_RESULT = result;
  GLOBAL_METHOD = method;
  res.redirect("/resultpage");
});

app.get("/resultpage", (req, res) => {
  res
    .status(200)
    .send(`The result of your ${GLOBAL_METHOD} operation is ${GLOBAL_RESULT}`);
});

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
