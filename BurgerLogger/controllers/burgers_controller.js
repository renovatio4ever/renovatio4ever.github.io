// Declares all the required packages

var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// The air traffic controller. Routes user input and responses to appropriate modules

router.get("/", function(req, res) {
    res.redirect("/burgers");
});

// Get all the burgers at rest in Valhalla

router.get("/burgers", function(req, res) {
    burger.all(function(data) {
        var handlebarsObject = {
        burgers: data
    };
    console.log(handlebarsObject);
    res.render("index", handlebarsObject);
    });
});

// Posts new custom burger to the DB. Even if the name is the same the distinguisher is the DB_ID

router.post("/burgers", function(req, res) {
    burger.create(
        ["burger_name"], [req.body.b_name], function() {
            res.redirect("/burgers");
        });
});

// Flags burger as eaten or not. The flag will determine where it will be displayed on the front end.
// Eaten burgers go to Valhalla, otherwise they will remain fresh and ready to be eaten on the left side of the page

router.put("/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.update(
    {"devoured": req.body.devoured}, condition, function(data) {
            res.redirect("/burgers");
    });
});

module.exports = router;