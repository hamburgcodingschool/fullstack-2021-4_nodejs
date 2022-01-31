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
  pool.query("SELECT * FROM todos", async (error, results, fields) => {
    // did we have a mysql error?
    if (error) {
      // yes: returning the error
      console.log(error);
      res.status(500).send({ ok: false, error: error });
    } else {
      const list_with_categories = [];
      for (let i = 0; i < results.length; i++) {
        const todo_item = {};
        todo_item.id = results[i].id;
        todo_item.todo = results[i].todo;
        // for promises see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise
        todo_item.categories = await new Promise((resolve, reject) => {
          pool.query(
            `SELECT * FROM categories 
                    LEFT JOIN todos_to_categories ON categories.id=todos_to_categories.category_id 
                    WHERE todos_to_categories.todo_id = ?`,
            results[i].id,
            (error, results, fields) => {
              if (error) {
                console.log(error);
                reject(error);
              } else {
                resolve(results);
              }
            }
          );
        });
        list_with_categories.push(todo_item);
      }

      res.send({ todos: list_with_categories });
    }
  });
};

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

/*

CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3

CREATE TABLE todos_to_categories (  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    todo_id int NOT NULL,
    category_id int NOT NULL
) DEFAULT CHARSET UTF8 COMMENT '';



*/
