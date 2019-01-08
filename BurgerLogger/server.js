var express = require("express");
var methodOverride = require("method-override");
// var path = require("path");

var app = express();

app.use(express.static("public"));
// app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

var port = process.env.PORT || 3002;
app.listen(port);
console.log("Listening on PORT " + port);

