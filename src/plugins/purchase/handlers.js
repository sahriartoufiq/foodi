"use strict";

const Service = require("../../services/purchase");
const { success, error } = require("../../utils/response");
const service = new Service();

module.exports = {
  purchaseItem: async (request, h) => {
    const { payload } = request;
    const result = await service.purchaseItem(payload);

    if (!result.success) return error(result.data);

    return success(result.data);
  },
};
