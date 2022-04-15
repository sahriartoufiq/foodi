"use strict";

const db = require("../models/index");
const HelperService = require("./helper-service");
const BaseService = require("./base-service");
const userService = new BaseService("user");
const restaurantService = new BaseService("restaurant");
const restaurantMenuService = new BaseService("restaurantMenu");
const logger = require("../utils/logger");
const _ = require("lodash");

const tag = "services/restaurant.js";

const getDishByName = async (dishName) => {
  const dishes = await restaurantMenuService.readByWhereV2(
    {
      dishName: dishName,
    },
    null,
    [{ model: db.restaurant, as: "restaurant" }]
  );

  if (dishes.length === 0) {
    throw {
      name: "notFound",
    };
  }

  return dishes[0];
};

const getUserById = async (userId) => {
  const users = await userService.readById(userId);

  if (users.length === 0) {
    throw {
      name: "notFound",
    };
  }

  return users[0];
};

class Purchase extends HelperService {
  constructor() {
    super("userPurchaseHistory");
  }

  async purchaseItem(payload) {
    const transaction = await db.sequelize.transaction();

    try {
      const userId = payload.userId;
      const user = await getUserById(userId);
      const dish = await getDishByName(payload.dishName);

      if (user.cashBalance < dish.price) {
        throw {
          name: "badRequest",
        };
      }

      await super.create(
        {
          userId: userId,
          dishName: dish.dishName,
          restaurantName: dish.restaurant.restaurantName,
          transactionAmount: dish.price,
          transactionDate: new Date(),
        },
        transaction
      );

      await userService.updateById(
        userId,
        {
          cashBalance: user.cashBalance - dish.price,
        },
        transaction
      );

      await restaurantService.updateById(
        dish.restaurantId,
        {
          cashBalance: dish.restaurant.cashBalance - dish.price,
        },
        transaction
      );

      await transaction.commit();

      return { success: true };
    } catch (error) {
      logger.error(tag + ": purchaseItem", error);
      await transaction.rollback();

      return { success: false, data: error };
    }
  }
}

module.exports = Purchase;
