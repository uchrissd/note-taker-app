// Dependencies

var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Read the db.json file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
  return res.json();
});

//Post the stuff
app.post("/api/notes", function(req, res) {
  var notes = req.body;
  let noteText = { title: "Test Title", text: "Test text" };
  noteText.title = notes.title;
  noteText.text = notes.text;

  fs.readFile("./db/db.json", "utf8", function noteCallBack(err, d) {
    if (err) throw err;
    console.log("this is the console log", d);
    noteObject = JSON.parse(d);
    noteObject.data.push(noteText);
    noteJSON = JSON.stringify(noteObject);

    fs.writeFile("./db/db.json", noteJSON, "utf8", err => {
      if (err) throw err;
    });
  });
});
//Delete the stuff
app.delete("/", function(req, res) {
  res.send("DELETE request to homepage");
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
