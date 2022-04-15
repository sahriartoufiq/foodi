"use strict";

const Service = require("../../services/restaurant");
const { success, error } = require("../../utils/response");
const service = new Service();

module.exports = {
  getAllOpenRestaurants: async (request, h) => {
    const { date_time } = request.query;
    const result = await service.getAllOpenRestaurants(date_time);

    if (!result.success) return error(result.data);

    return success(result.data);
  },

  getRestaurants: async (request, h) => {
    const { min_price, max_price, limit } = request.query;
    const result = await service.getRestaurants(min_price, max_price, limit);

    if (!result.success) return error(result.data);

    return success(result.data);
  },

  searchRestaurants: async (request, h) => {
    const { search_by, search_key } = request.query;
    const result = await service.searchRestaurants(search_by, search_key);

    if (!result.success) return error(result.data);

    return success(result.data);
  },
};
