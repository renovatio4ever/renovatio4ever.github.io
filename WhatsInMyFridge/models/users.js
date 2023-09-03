/* eslint-disable camelcase */
const bcrypt = require("bcrypt-nodejs");
module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^[a-z\s-']+$/i,
                    msg: "Only letters, spaces, hyphens, and apostrophes are allowed."
                },
                len: {
                    args: [1, 100],
                    msg: "Your name cannot exceed 100 characters."
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Please enter a valid email."
                },
                len: {
                    args: [1, 75],
                    msg: "Your email cannot exceed 75 characters."
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 20]
            }
        }
    }, {
        freezeTableName: true
    });

    Users.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    Users.hook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    Users.associate = function (models) {
        Users.hasMany(models.Recipes);
    };

    return Users;
};