"use strict";

module.exports = (sequelize, DataTypes) => {
  const restaurantOpeningHours = sequelize.define(
    "restaurantOpeningHours",
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
      },
      weekDays: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      openingTime: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      closingTime: {
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
