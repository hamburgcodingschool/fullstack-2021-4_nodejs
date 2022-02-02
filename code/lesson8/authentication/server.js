// there is no convention in naming it app.js

const express = require("express");
const PORT = 3000;
const app = express();

app.get("/admin", (req, res) => {
  res.send("not everyone should change this");
});

app.get("/about", (req, res) => {
  res.send("some content about me");
});

app.get("/", (req, res) => {
  res.send("some content");
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
