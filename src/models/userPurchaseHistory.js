"use strict";

module.exports = (sequelize, DataTypes) => {
  const userPurchaseHistory = sequelize.define(
    "userPurchaseHistory",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      dishName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      restaurantName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transactionAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      transactionDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      version: true,
      paranoid: false,
      underscored: true,
      freezeTableName: true,
      tableName: "user_purchase_history",
    }
  );

  userPurchaseHistory.associate = function (models) {
    userPurchaseHistory.belongsTo(models.user, {
      as: "user",
      foreignKey: { name: "userId" },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
      constraints: true,
    });
  };

  return userPurchaseHistory;
};
