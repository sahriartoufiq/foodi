"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          "restaurant",
          {
            id: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
            },
            restaurantName: {
              type: Sequelize.DataTypes.STRING,
              allowNull: false,
              field: "restaurant_name",
            },
            cashBalance: {
              type: Sequelize.DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue: 0.0,
              field: "cash_balance",
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
        queryInterface.dropTable("restaurant", {
          transaction: t,
        }),
      ]);
    });
  },
};