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
              type: Sequelize.DataTypes.STRING,
              allowNull: false,
              field: "dishName",
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
        queryInterface.dropTable("restaurant_menu", {
          transaction: t,
        }),
      ]);
    });
  },
};
