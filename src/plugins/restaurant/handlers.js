"use strict";

const Service = require("../../services/restaurant");
const { success, error } = require("../../utils/response");
const service = new Service();

module.exports = {
  getAllOpenRestaurants: async (request, h) => {
    const { date_time: dateTime } = request.query;
    const result = await service.getAllOpenRestaurants(dateTime);

    if (!result.success) return error(result.data);

    return success(result.data);
  },
};
