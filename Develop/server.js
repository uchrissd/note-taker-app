// Dependencies

var express = require("express");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Read the db.json file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
  return res.json();
});

//Post the stuff
app.post("/api/notes", function(req, res) {
  var notes = req.body;
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
