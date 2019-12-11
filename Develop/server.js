// Dependencies

var express = require("express");
var path = require("path");
const fs = require("fs");

//Generate random id for each note

var ID = function() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

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

// Api reads the jb json file to return the notes in the form of an array
app.get("/api/notes", function(req, res) {
  fs.readFile("./db/db.json", "utf8", function noteCallBack(err, d) {
    return res.json(JSON.parse(d));
  });
});

//Delete api target an object by the object's id in the db json file after a user deletes a note.
app.delete("/api/notes/:id", function deleteNote(req, res) {
  var noteId = req.body.id;

  fs.readFile("./db/db.json", "utf8", function getNoteId(err, d) {
    console.log("this is the array", d);
    noteArray = JSON.parse(d);

    for (var i = 0; i < noteArray.length; i++) {
      console.log(noteArray[i]);
      if (noteArray[i].id === noteId) {
        noteArray.splice(i, 1);

        fs.writeFile("./db/db.json", JSON.stringify(noteArray), "utf8", err => {
          if (err) throw err;
        });
      }
    }
  });
});

//Api that passes the note information to the front end functions for rendering the notes onto the HTML page
app.post("/api/notes", function(req, res) {
  var notes = req.body;
  let noteText = { title: "Test Title", text: "Test text" };
  noteText.title = notes.title;
  noteText.text = notes.text;
  noteText.id = ID();

  fs.readFile("./db/db.json", "utf8", function noteCallBack(err, d) {
    if (err) throw err;
    console.log("this is the console log", d);
    noteObject = JSON.parse(d);
    noteObject.push(noteText);
    noteJSON = JSON.stringify(noteObject);

    fs.writeFile("./db/db.json", noteJSON, "utf8", err => {
      if (err) throw err;
    });
  });
});

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
