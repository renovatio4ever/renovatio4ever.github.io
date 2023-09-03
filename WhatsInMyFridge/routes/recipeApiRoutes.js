const model = require("../models"),
    User = model.User;

module.exports = app => {
    // Returns user information + recipes paired with them?
    app.get("/api/user", (req, res) => {
        User.findAll({
            where: {
                UserId: req.body.id
            }
        }).then(data => {

        });
    });

    // Returns recipe information for a specific recipe?
    app.get("/api/recipe/:id", (req, res) => {

    });

    
};