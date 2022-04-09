"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          "restaurant_opening_hours",
          {
            id: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
            },
            restaurantId: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false,
              references: {
                model: "restaurant",
                key: "id",
              },
              field: "restaurant_id",
              onDelete: "RESTRICT",
              onUpdate: "RESTRICT",
            },
            weekDays: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false,
              field: "week_days",
            },
            openingTime: {
              type: Sequelize.DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue: 0.0,
              field: "opening_time",
            },
            closingTime: {
              type: Sequelize.DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue: 0.0,
              field: "closing_time",
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
        queryInterface.dropTable("restaurant_opening_hours", {
          transaction: t,
        }),
      ]);
    });
  },
};
