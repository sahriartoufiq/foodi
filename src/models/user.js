"use strict";

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
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
      tableName: "user",
    }
  );

  user.associate = function (models) {
    user.hasMany(models.userPurchaseHistory, {
      as: "userPurchaseHistories",
      foreignKey: { name: "userId" },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
      constraints: true,
    });
  };

  return user;
};
