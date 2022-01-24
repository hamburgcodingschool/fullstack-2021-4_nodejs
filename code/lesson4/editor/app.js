const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // !important to parse json POST requests

app.get("/file", (req, res) => {
  // return the file list
  returnFileList(res);
});

// Handle all the file system changes and return the list of files
function handleFileChangeResponse(err, res) {
  // check, if we have an error
  if (err) {
    // oops, we actually had an error, so we notify the client about it
    // the status code 500 indictes, there was a problem on our side
    res.status(500).send({ ok: false, errText: err });
  } else {
    returnFileList(res);
  }
}

// method to get the file list
// res: the server response, where we return the data to
function returnFileList(res) {
  // read the directory 'data'
  fs.readdir(path.join(__dirname, "data"), (err, files) => {
    // we had an error reading the directory
    if (err) {
      res.status(500).send({ ok: false, errText: err });
    } else {
      // all good, return the list of files
      res.send({ ok: true, files: files });
    }
  });
}

app.post("/file", (req, res) => {
  // get the filename form the json data
  // req.body contains already the data in json format because of line 8 above
  const filename = path.join(__dirname, "data", req.body.newFile);
  const content = "blank";

  fs.writeFile(filename, content, (err) => {
    handleFileChangeResponse(err, res);
  });
});

app.put("/file", (req, res) => {
  // get the filename form the json data
  // req.body contains already the data in json format because of line 8 above
  const filename = path.join(__dirname, "data", req.body.fileToRename);
  const newFilename = path.join(__dirname, "data", req.body.newFileName);

  // rename the file
  fs.rename(filename, newFilename, (err) => {
    handleFileChangeResponse(err, res);
  });
});

app.delete("/file", (req, res) => {
  // get the filename form the json data
  // req.body contains already the data in json format because of line 8 above
  const filename = path.join(__dirname, "data", req.body.fileToDelete);

  // unlink is the old way of removing a file
  // if you have a new version, rm works as well
  fs.unlink(filename, (err) => {
    handleFileChangeResponse(err, res);
  });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
