const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();

/*
Kinds of redirects
==================

- temporary
  Example: saisonal product /product_of_the_month --> product page
  Example: tracking
  Example: URL shortener
  Http response code: 302

- permanent
  Example: page structure was changed (e.g. due to redesign)
  Http response code: 301
 */

app.get("/about.html", (req, res) => {
  // you are wrong here, please go to the new page
  // 301: permanent redirect: ignore the old page
  res.redirect(301, "/about");
});

app.get("/about", (req, res) => {
  res.send("about me...");
});

app.get("/employee_of_the_month", (req, res) => {
  // the content is changing over time
  // 302: temprary redirect: will change over time
  res.redirect(302, "/about");
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
