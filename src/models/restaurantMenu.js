"use strict";

module.exports = (sequelize, DataTypes) => {
  const restaurantMenu = sequelize.define(
    "restaurantMenu",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "restaurant",
          key: "id",
        },
        unique: "restaurant_menu_restaurant_dish_unique_key",
      },
      dishName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "restaurant_menu_restaurant_dish_unique_key",
          message: "Dish must be unique for a single restaurant",
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      timestamps: true,
      version: true,
      paranoid: false,
      underscored: true,
      freezeTableName: true,
      tableName: "restaurant_menu",
    }
  );

  restaurantMenu.associate = function (models) {
    restaurantMenu.belongsTo(models.restaurant, {
      as: "restaurant",
      foreignKey: { name: "restaurantId" },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
      constraints: true,
    });
  };

  return restaurantMenu;
};
