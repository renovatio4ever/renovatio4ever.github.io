// Declaring my MVC components
var express = require("express");
var methodOverride = require("method-override");
// var path = require("path");

var app = express();

// or I could have used this app.use(express.static(path.join(__dirname,"public")));
// need to set path otherwise you will get that annoying GET.. strict error
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

// VIEW: or handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// CONTROLLER
var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

var port = process.env.PORT || 3002;
app.listen(port);
console.log("Listening on PORT " + port);

