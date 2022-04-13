"use strict";

module.exports = (sequelize, DataTypes) => {
  const restaurantOpeningHours = sequelize.define(
    "restaurantOpeningHours",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "restaurant",
          key: "id",
        },
      },
      weekDays: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      openingHour: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      closingHour: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      version: true,
      paranoid: false,
      underscored: true,
      freezeTableName: true,
      tableName: "restaurant_opening_hours",
    }
  );

  restaurantOpeningHours.associate = function (models) {
    restaurantOpeningHours.belongsTo(models.restaurant, {
      as: "restaurant",
      foreignKey: { name: "restaurantId" },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
      constraints: true,
    });
  };

  return restaurantOpeningHours;
};
