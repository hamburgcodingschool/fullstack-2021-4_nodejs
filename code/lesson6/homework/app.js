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

const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();

let todo_list = [];

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/list", (req, res) => {
  return showCurrentStatus(res);
});
app.post("/list", (req, res) => {
  const dataToInsert = {
    todo: req.body.todo,
    create_time: new Date(),
    update_time: new Date(),
  };

  pool.query(
    "INSERT INTO todos SET ?",
    dataToInsert,
    (error, results, fields) => {
      if (error) console.log(error);
      return showCurrentStatus(res);
    }
  );
});
app.put("/list", (req, res) => {
  pool.query(
    "UPDATE todos SET todo=?, update_time = NOW() WHERE id=?",
    [req.body.todo, req.body.index],
    (error, results, fields) => {
      if (error) console.log(error);
      return showCurrentStatus(res);
    }
  );
});
app.delete("/list", (req, res) => {
  pool.query(
    "DELETE FROM todos WHERE id = ?",
    req.body.index,
    (error, results, fields) => {
      if (error) console.log(error);
      return showCurrentStatus(res);
    }
  );
});

showCurrentStatus = (res) => {
  pool.query("SELECT * FROM todos", (error, results, fields) => {
    // did we have a mysql error?
    if (error) {
      // yes: returning the error
      console.log(error);
      res.status(500).send({ ok: false, error: error });
    } else {
      res.send({ todos: results });
    }
  });
};

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
