"use strict";

const db = require("../models/index");
const { Sequelize } = db;
const { QueryTypes } = Sequelize;
const HelperService = require("./helper-service");
const logger = require("../utils/logger");

const tag = "services/restaurant.js";

class Restaurant extends HelperService {
  constructor() {
    super("restaurant");
  }

  async getAllOpenRestaurants(dateTimeString) {
    try {
      const date = dateTimeString ? new Date(dateTimeString) : new Date();
      const day = date.getDay();
      const time = date.getHours() + ":" + date.getMinutes() + ":00";

      const result = await db.sequelize.query(
        `SELECT distinct(restaurant.id), restaurant.restaurant_name
           FROM "restaurant"
           INNER JOIN restaurant_opening_hours ON restaurant_opening_hours.restaurant_id = restaurant.id
           WHERE restaurant_opening_hours.week_days = ${day}
           AND restaurant_opening_hours.opening_time <= '${time}'
           AND restaurant_opening_hours.closing_time >= '${time}'
           ORDER BY restaurant.restaurant_name ASC;`,
        {
          type: QueryTypes.SELECT,
        }
      );

      return { success: true, data: result };
    } catch (error) {
      logger.error(tag + ": getAll", error);

      return { success: false, data: error };
    }
  }

  async getRestaurants(minPrice, maxPrice, limit = 1000) {
    try {
      const result = await db.sequelize.query(
        `SELECT distinct(restaurant.id), restaurant.restaurant_name
           FROM "restaurant"
           INNER JOIN restaurant_menu ON restaurant_menu.restaurant_id = restaurant.id
           WHERE restaurant_menu.price BETWEEN '${minPrice}' AND '${maxPrice}'
           ORDER BY restaurant.restaurant_name ASC
           LIMIT ${limit}`,
        {
          type: QueryTypes.SELECT,
        }
      );

      return { success: true, data: result };
    } catch (error) {
      logger.error(tag + ": getAll", error);

      return { success: false, data: error };
    }
  }
}

module.exports = Restaurant;
