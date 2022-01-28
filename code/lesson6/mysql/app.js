// use the mysql package
const mysql = require("mysql");
// create a connection pool
// with the pool we can re-use connections more easily
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "hcs",
  connectionLimit: 10,
});

// standard way to get the express server
const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public"))); // serve static content from public directory
app.use(express.json()); // !important to parse json POST requests

app.get("/database/:id", (req, res) => {
  console.log(req.params.id);
  pool.query(
    "SELECT * FROM mytable WHERE id=?",
    req.params.id,
    (error, results, fields) => {
      res.send(results[0]);
    }
  );
});
// get all data from the database
// get method
app.get("/database", (req, res) => {
  // make a query to get all data from our table
  pool.query("SELECT * FROM mytable", (error, results, fields) => {
    // did we have a mysql error?
    if (error) {
      // yes: returning the error
      console.log(error);
      res.status(500).send({ ok: false, error: error });
    } else {
      console.log(results);
      // return the data as json format
      // all types are discarded when converting to json
      // the column names are then the keys in the json file
      res.send({ ok: true, result: results });
    }
  });
});

// insert something into the database
// we use post to insert new rows to the database (create new rows)
app.post("/database", (req, res) => {
  // use the pool, so that we don't have blocking data
  // req.body is the json data, we sent from the browser (client)
  // with this format we can just pass the json data and the mysql package is
  // correctly assigning it to the table columns
  pool.query(
    "INSERT INTO mytable SET ?",
    req.body,
    (error, results, fields) => {
      // did we have a mysql error?
      if (error) {
        // yes: returning the error
        res.status(500).send({ ok: false, error: error });
      } else {
        console.log("data inserted into database");
        // no: return a confirmation
        res.send({ ok: true });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
