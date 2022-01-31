// use the mongoose package - see https://mongoosejs.com/
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");

const Todo = mongoose.model("Todos", {
  todo: String,
  category: [{ name: String }],
});

const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/list", (req, res) => {
  showCurrentStatus(res);
});
app.post("/list", async (req, res) => {
  const dataToInsert = new Todo({
    todo: req.body.todo,
    category: [{ name: "work" }, { name: "hcs" }],
  });
  await dataToInsert.save();
  showCurrentStatus(res);
});
app.put("/list", (req, res) => {
  Todo.findByIdAndUpdate(req.body.index, { todo: req.body.todo }, () => {
    showCurrentStatus(res);
  });
});
app.delete("/list", (req, res) => {
  Todo.findByIdAndDelete(req.body.index, () => {
    showCurrentStatus(res);
  });
});

showCurrentStatus = async (res) => {
  // get data from the database
  const data_from_the_database = await Todo.find();

  console.log(data_from_the_database);

  // return it as a response
  res.send(data_from_the_database);
};

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
