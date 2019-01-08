// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
    all: function(cb) {
        orm.all("burgers", function(result) {
            cb(result);
        });
    },
    create: function(cols, vals, cb) {
        orm.create("burgers", cols, vals, function(result) {
            cb(result);
        });
    },
    update: function(objColVals, condition, cb) {
        orm.update("burgers", objColVals, condition, function(result) {
            cb(result);
        });
    }
};

module.exports = burger;