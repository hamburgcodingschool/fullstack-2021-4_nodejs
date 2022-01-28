const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();

let todo_list = [];

app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.json()); 

app.get("/list", (req, res) => {
  return res.send({ todos: todo_list });
});
app.post("/list", (req, res) => {
  todo_list.push(req.body.todo);
  return res.send({ todos: todo_list });
});
app.put("/list", (req, res) => {
  todo_list[req.body.index] = req.body.todo;
  return res.send({ todos: todo_list });
});
app.delete("/list", (req, res) => {
  todo_list.splice(req.body.index, 1);
  return res.send({ todos: todo_list });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
