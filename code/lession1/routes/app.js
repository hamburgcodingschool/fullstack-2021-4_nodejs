const express = require("express");
const app = express();

function showHelloWorld(request, response) {
  response.send("Hello fantastic World!");
  console.log("hello world was requested");
}

app.get("/", showHelloWorld);
app.get("/world.html", showHelloWorld);

app.get("/hello", (req, res) => {
  res.send("Hello from the other side!");
});

app.listen(3000, () => {
  console.log("Server started.");
});
