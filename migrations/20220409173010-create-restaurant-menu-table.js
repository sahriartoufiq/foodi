"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          "restaurant_menu",
          {
            id: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
            },
            restaurantId: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false,
              references: {
                model: "restaurant",
                key: "id",
              },
              field: "restaurant_id",
              unique: "restaurant_menu_restaurant_dish_unique_key",
              onDelete: "RESTRICT",
              onUpdate: "RESTRICT",
            },
            dishName: {
              type: Sequelize.DataTypes.TEXT,
              allowNull: false,
              field: "dish_name",
              unique: "restaurant_menu_restaurant_dish_unique_key",
            },
            price: {
              type: Sequelize.DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue: 0.0,
              field: "price",
            },
            version: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false,
              field: "version",
              defaultValue: 1,
            },
            createdAt: {
              type: Sequelize.DataTypes.DATE,
              allowNull: true,
              field: "created_at",
            },
            updatedAt: {
              type: Sequelize.DataTypes.DATE,
              allowNull: true,
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
        queryInterface.dropTable("restaurant_menu", {
          transaction: t,
        }),
      ]);
    });
  },
};
