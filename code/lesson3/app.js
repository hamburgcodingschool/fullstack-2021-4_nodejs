const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // !important if using POST requests

app.get("/calculateGET", (req, res) => {
  console.log("get a get request");
  const value1 = req.query.value1;
  const value2 = req.query.value2;
  res.send(`${parseInt(value1) + parseInt(value2)}`);
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
