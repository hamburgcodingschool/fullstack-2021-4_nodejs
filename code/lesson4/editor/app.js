const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // !important to parse json POST requests

app.get("/filelist", (req, res) => {
    // return the file list
    returnFileList(res);
});

// method to get the file list
// res: the server response, where we return the data to
function returnFileList(res) {
    // read the directory 'data'
    fs.readdir(path.join(__dirname, "data"), (err, files) => {
        // we had an error reading the directory
        if (err) {
            res.status(500).send({ ok: false, errText: err});
        } else {
            // all good, return the list of files
            res.send({ ok: true, files: files});
        }
    });
}

app.post("/createNewFile", (req, res) => {
    // get the filename form the json data
    // req.body contains already the data in json format because of line 8 above
    const filename = req.body.newFile;
    const content = 'blank';

    fs.writeFile(filename, content, (err) => {
        // check, if we have an error
        if (err) {
            // oops, we actually had an error, so we notify the client about it
            // the status code 500 indictes, there was a problem on our side
            res.status(500).send({ ok: false, errText: err});
        } else {
            returnFileList(res);
        }
    });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
