"use strict";
const fs = require("fs");
const _ = require("lodash");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersRawData = fs.readFileSync(
      __dirname + "/users_with_purchase_history.json"
    );
    const usersData = JSON.parse(usersRawData);

    await queryInterface.sequelize.transaction(async (transaction) => {
      const users = usersData.map((element) => {
        return {
          id: element.id,
          cash_balance: element.cashBalance,
          name: element.name,
        };
      });

      const purchaseHistories = [];
      usersData.forEach((element) => {
        const history = element.purchaseHistory.map((entity) => {
          return {
            user_id: element.id,
            dish_name: entity.dishName,
            restaurant_name: entity.restaurantName,
            transaction_amount: entity.transactionAmount,
            transaction_date: entity.transactionDate,
          };
        });

        Array.prototype.push.apply(purchaseHistories, history);
      });

      await queryInterface.bulkInsert("user", users, {
        transaction,
      });

      await queryInterface.bulkInsert(
        "user_purchase_history",
        purchaseHistories,
        {
          transaction,
        }
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    return (
      (await queryInterface.bulkDelete("user", null, {})) &&
      (await queryInterface.bulkDelete("user_purchase_history", null, {}))
    );
  },
};
