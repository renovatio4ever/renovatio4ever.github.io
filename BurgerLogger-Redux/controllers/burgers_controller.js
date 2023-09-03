var db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Burger.findAll({}).then(function (result) {
            var hbsObject = {
                burger: result
            };
            res.render("index", hbsObject);
        });
    });

    app.post("/", function (req, res) {
        console.log("create a burger");
        db.Burger.create({
            burger_name: req.body.name
        }, {
                devoured: req.body.devoured
            }).then(function () {
                res.redirect("/");
            });
    });

    app.put("/burgers/:id", function (req, res) {
        console.log("eating a burger");
        db.Burger.update({
            devoured: req.body.devoured
        }, {
                where: {
                    id: req.params.id
                }
            }).then(function () {
                res.redirect("/");
            });
    });

    app.delete("/:id", function (req, res) {
        console.log("eating a burger");
        db.Burger.destroy({
            where: {
                id: req.params.id
            }
        }).then(function () {
            res.redirect('/');
        });
    });
};