// html routes
var db = require("../models");
const axios = require("axios");
const path = require("path");
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

module.exports = app => {
    // Load index page
    app.get("/", (req, res) => {
        // if (!req.user) {
        //     res.redirect("/login");
        // };
        // res.render("index");
        res.redirect("/login");
    });

    app.get("/search", (req, res) => {
        const recipe = req.query.recipeSearch.split(',')[0]

        db.Pairings.findOne({
                where: {
                    food_type: recipe
                }
            })
            .then(function (response) {
                // console.log(response.wine_type);

                axios.get("http://api.snooth.com/wines/?", {
                        params: {
                            "akey": process.env.AKEY,
                            "ip": req.connection.remoteAddress,
                            "q": response.wine_type,
                            "xp": 30,
                            "n": 1
                        }
                    })
                    .then(function (response) {
                        const wineobject = response.data.wines[0];

                        axios.get("https://api.edamam.com/search", {
                                params: {
                                    "q": req.query.recipeSearch,
                                    "app_id": app_id,
                                    "app_key": app_key
                                }
                            })
                            .then(function (response) {
                                res.render("search", {
                                    results: response.data.hits,
                                    wine: wineobject
                                });
                            }).catch(error => {
                                console.log(error);
                            });
                    });
            }).catch(error => {
                console.log(error);
            });
    });

    app.get("/index", (req, res) => {
        // console.log(req);
        res.render("index");
    })

    // app.get("/user/:id", (req, res) => {
    //     res.send(user({
    //         // insert data stuff here, i.e. user profile
    //     }));
    // });

    app.get("/login", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/html/login.html"));
    });

    app.get("/signup", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/html/signup.html"));
    });

    app.get("/team", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/html/team.html"));
    });
};