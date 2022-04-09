"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          "user_purchase_history",
          {
            id: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
            },
            userId: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false,
              references: {
                model: "user",
                key: "id",
              },
              field: "user_id",
              onDelete: "RESTRICT",
              onUpdate: "RESTRICT",
            },
            dishName: {
              type: Sequelize.DataTypes.STRING,
              allowNull: false,
              field: "dish_name",
            },
            restaurantName: {
              type: Sequelize.DataTypes.STRING,
              allowNull: false,
              field: "restaurant_name",
            },
            transactionAmount: {
              type: Sequelize.DataTypes.DECIMAL(10, 2),
              allowNull: false,
              field: "transaction_amount",
            },
            transactionDate: {
              type: Sequelize.DataTypes.STRING,
              allowNull: false,
              field: "transaction_date",
            },
            version: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false,
              field: "version",
            },
            createdAt: {
              type: Sequelize.DataTypes.DATE,
              allowNull: false,
              field: "created_at",
            },
            updatedAt: {
              type: Sequelize.DataTypes.DATE,
              allowNull: false,
              field: "updated_at",
            },
          },
          {
            transaction: t,
          }
        ),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable("user_purchase_history", {
          transaction: t,
        }),
      ]);
    });
  },
};
