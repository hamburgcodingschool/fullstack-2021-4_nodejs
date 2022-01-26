const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = 3000;
const app = express();
// define data directory, so that we don't get any spelling errors later
// and so that we can change the directory easily
const DATA_DIRECTORY = "data";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // !important to parse json POST requests

///////////////////////////////////////////////////
// Methods to handle files
app.get("/file", (req, res) => {
  // return the file list
  returnFileList(res);
});

app.post("/file", (req, res) => {
  // get the filename form the json data
  // req.body contains already the data in json format because of line 8 above
  const filename = path.join(__dirname, DATA_DIRECTORY, req.body.newFile);
  const content = "blank";

  fs.writeFile(filename, content, (err) => {
    handleFileChangeResponse(err, res);
  });
});

app.put("/file", (req, res) => {
  // get the filename form the json data
  // req.body contains already the data in json format because of line 8 above
  const filename = path.join(__dirname, DATA_DIRECTORY, req.body.fileToRename);
  const newFilename = path.join(
    __dirname,
    DATA_DIRECTORY,
    req.body.newFileName
  );

  // rename the file
  fs.rename(filename, newFilename, (err) => {
    handleFileChangeResponse(err, res);
  });
});

app.delete("/file", (req, res) => {
  // get the filename form the json data
  // req.body contains already the data in json format because of line 8 above
  const filename = path.join(__dirname, DATA_DIRECTORY, req.body.fileToDelete);

  // unlink is the old way of removing a file
  // if you have a new version, rm works as well
  fs.unlink(filename, (err) => {
    handleFileChangeResponse(err, res);
  });
});

// Handle all the file system changes and return the list of files
handleFileChangeResponse = (err, res) => {
  // check, if we have an error
  if (err) {
    // oops, we actually had an error, so we notify the client about it
    // the status code 500 indictes, there was a problem on our side
    res.status(500).send({ ok: false, errText: err });
  } else {
    returnFileList(res);
  }
};

// method to get the file list
// res: the server response, where we return the data to
returnFileList = (res) => {
  // read the directory 'data'
  fs.readdir(path.join(__dirname, DATA_DIRECTORY), (err, files) => {
    // we had an error reading the directory
    if (err) {
      res.status(500).send({ ok: false, errText: err });
    } else {
      // all good, return the list of files
      res.send({ ok: true, files: files });
    }
  });
};

///////////////////////////////////////////////////
// Methods to handle files
app.get("/filecontent", (req, res) => {
  // get the file name to read and create a proper path for it
  const filename = path.join(__dirname, DATA_DIRECTORY, req.query.filename);

  fs.readFile(filename, (err, data) => {
    // check, if we have an error
    if (err) {
      // oops, we actually had an error, so we notify the client about it
      // the status code 500 indictes, there was a problem on our side
      res.status(500).send({ ok: false, errText: err });
    } else {
      // return content of the file
      res.send({
        ok: true,
        filename: req.body.filename,
        content: data.toString(),
      });
    }
  });
});
app.put("/filecontent", (req, res) => {
  // write a file with the content, which was passed
  writeFile(req.body.filename, req.body.content, res);
});
app.delete("/filecontent", (req, res) => {
  // write a file with the content, which was passed
  writeFile(req.body.filename, "", res);
});
// generic function to write the file and return a response
writeFile = (filename, content, res) => {
  // get the file name to read and create a proper path for it
  const filenameWithPath = path.join(__dirname, DATA_DIRECTORY, filename);

  fs.writeFile(filenameWithPath, content, (err) => {
    // check, if we have an error
    if (err) {
      // oops, we actually had an error, so we notify the client about it
      // the status code 500 indictes, there was a problem on our side
      res.status(500).send({ ok: false, errText: err });
    } else {
      // return an ok message
      res.send({ ok: true, filename: filename, content: content.toString() });
    }
  });
};

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
