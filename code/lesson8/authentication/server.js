// there is no convention in naming it app.js

const express = require("express");
const PORT = 3000;
const app = express();

app.get("/admin", (req, res) => {
    // tell the browser, that some authentication is reuqired
    // AND tell, what kind of authentication is expected
    res.set("WWW-Authenticate", 'Basic realm="401"'); // set http header in the response
    res.status(401).send("Authentication required.");
    // send() always needs to be the last command
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
