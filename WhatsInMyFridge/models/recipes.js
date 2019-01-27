/* eslint-disable camelcase */
module.exports = function (sequelize, DataTypes) {
    var Recipes = sequelize.define("Recipes", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        uri_recipe: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 1024]
            }
        },
        uri_wine: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 1024],
                isURL: true
            }
        },
        isFavorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Recipes.associate = function (models) {
        Recipes.belongsTo(models.Users, {
            "onDelete": "CASCADE"
        });
    };

    return Recipes;
};