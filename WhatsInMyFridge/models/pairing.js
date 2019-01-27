/* eslint-disable camelcase */
module.exports = function (sequelize, DataTypes) {
    var Pairings = sequelize.define("Pairings", {
        food_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        wine_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Pairings;
};