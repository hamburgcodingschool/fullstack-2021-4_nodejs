const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/dir/page1", (req, res) => {
  const now = new Date();
  res.send(
    `<html>
    <head>
        <title>Page 1</title>
        <link rel="stylesheet" href="/css/main.css" >
    </head>
    <body>
        <img src="/images/hcs_mid_32x.png" width="100" />
        <p>Hello! This is page 1 at ${now}</p>
        <p><a href="/static.html">Go to static page</a></p>
        <p><a href="/dir/page2">Go to page 2</a></p>
    </body>
    </html>`
  );
});

app.get("/dir/page2", (req, res) => {
  res.send(
    `<html>
      <head>
          <title>Page 2</title>
          <style type="text/css">
             body { background-color: green; }
          </style>
      </head>
      <body>
          <p>Hello! This is page 2</p>
          <p><a href="/static.html">Go to static page</a></p>
          <p><a href="/dir/page1">Go to page 1</a></p>
      </body>
      </html>`
  );
});

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
