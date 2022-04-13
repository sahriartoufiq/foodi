"use strict";

module.exports = (sequelize, DataTypes) => {
  const restaurant = sequelize.define(
    "restaurant",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      restaurantName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cashBalance: {
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
      tableName: "restaurant",
    }
  );

  restaurant.associate = function (models) {
    restaurant.hasMany(models.restaurantMenu, {
      as: "restaurantMenus",
      foreignKey: { name: "restaurantId" },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
      constraints: true,
    });

    restaurant.hasMany(models.restaurantOpeningHours, {
      as: "restaurantOpeningHours",
      foreignKey: { name: "restaurantId" },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
      constraints: true,
    });
  };

  return restaurant;
};
