const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();

let todo_list = [];

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/list", (req, res) => {
  // Basic <base64 encoded string>
  const header = req.headers.authorization;
  let username = "";
  let password = "";
  if (header) {
    const b64auth = header.split(" ")[1];
    // split converts the buffer string into an array
    const [username, password] = Buffer.from(b64auth, "base64").toString().split(":");

    // or in long
    const convertedText = Buffer.from(b64auth, "base64").toString();
    // now contains something like "foo:bar"
    const usernameAndPassword = convertedText.split(":");
    // now assign them to username and password
    const username2 = usernameAndPassword[0];
    const password2 = usernameAndPassword[1];
  }
  // the lines above (13 - 16) can be written shorter as:
  // const header = req.headers.authorization || "";
  //     use the header string OR (if it's null or undefined) use the empty string

  if (username == "foo" && password == "bar") {
    res.send({ todos: todo_list });
  } else {
    res.set("WWW-Authenticate", 'Basic realm="401"');
    res.status(401).send("Authentication required.");
  }
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
