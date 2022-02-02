// there is no convention in naming it app.js

// read the .env file
require("dotenv").config();

// If you set variables in the terminal:
// `export APP_USERNAME=foo`
// and to delete:
// `unset APP_USERNAME`

const express = require("express");
const PORT = 3000;
const app = express();

// create our own middleware to secure the /admin path
// more on middlewares: https://expressjs.com/de/guide/using-middleware.html
app.use("/admin" /* path is optional */, (req, res, next) => {
  // === CHANGED
  // if the user has entered username and password, it is in here
  const header = req.headers.authorization;
  let is_user_authenticated;
  // is it in there?
  if (header) {
    // The header reads like "Basic asdkahsdlkj=="
    // and we are only interested in the second part
    const b64auth = header.split(" ")[1];
    // We need to decode the string
    const auth = Buffer.from(b64auth, "base64").toString();
    // Now auth reads like "username:password"

    // split converts the buffer string into an array
    const [username, password] = auth.split(":");

    // check, if username and password are correct
    // NORMALLY:
    // - hash the password (maybe with a salt)
    // - compare username and hash against a database
    // hashing: convert text to numbers, but different text converts to different numbers
    // known hashing mechanisms: MD5 (unsafe!), SHA, SHA256, SHA512
    // salt: Add some (fixed) string to the password before hasing it, so that if you get the hash
    //     that you can't guess the password from it
    //
    // NEVER:
    // Compare against fixed strings in your code
    if (
      username === process.env.APP_USERNAME &&
      password === process.env.APP_PASSWORD
    ) {
      is_user_authenticated = true;
    } else {
      is_user_authenticated = false;
    }
  } else {
    is_user_authenticated = false;
  }

  if (is_user_authenticated) {
    next(); // <=== CHANGED
  } else {
    // tell the browser, that some authentication is reuqired
    // AND tell, what kind of authentication is expected
    res.set("WWW-Authenticate", 'Basic realm="401"'); // set http header in the response
    res.status(401).send("Authentication required.");
    // send() always needs to be the last command
  }
});

app.get("/admin", (req, res) => {
  res.send("Very secret admin content");
});
app.get("/admin/other", (req, res) => {
  res.send("Another secret admin content");
});

app.get("/about", (req, res) => {
  res.send("some content about me");
});

app.get("/", (req, res) => {
  res.send("some content");
});

app.listen(PORT, () => {
  console.log(
    `Server started on ${PORT} - our admin user is ${process.env.APP_USERNAME}`
  );
});
