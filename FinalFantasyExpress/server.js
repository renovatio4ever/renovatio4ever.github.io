var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//FF Characters
var characters = [
  {
    routeName: "cloudstrife",
    name: "Cloud Strife",
    role: "Warrior",
    age: 21,
    hitpoints: 2000
  },
  {
    routeName: "tifalockheart",
    name: "Tifa Lockheart",
    role: "Fighter",
    age: 20,
    hitpoints: 1500
  },
  {
    routeName: "aerithgainsborough",
    name: "Aerith Gainsborough",
    role: "White Mage",
    age: 20,
    hitpoints: 1350
  }
];

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/all", function(req, res) {
  res.sendFile(path.join(__dirname, "all.html"));
});

app.get("/api/characters", function(req, res) {
  return res.json(characters);
});

app.get("/api/characters/:character", function(req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }
  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/characters", function(req, res) {
  var newcharacter = req.body;
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
  console.log(newcharacter);
  characters.push(newcharacter);
  res.json(newcharacter);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
