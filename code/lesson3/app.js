const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // !important to parse json POST requests

app.post("/calculate", (req, res) => {
  console.log("get a get request");
  console.log(req.body);

  const value1 = req.body.value1;
  const value2 = req.body.value2;
  const result = parseInt(value1) + parseInt(value2);

  // we can just return a json object here!
  res.send({ result: result, ok: "all looking good!" });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
