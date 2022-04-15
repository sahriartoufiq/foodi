"use strict";

const handler = require("./handlers");

module.exports = [
  {
    method: "POST",
    path: "/api/v1/customer/purchase",
    handler: handler.purchaseItem,
    options: {},
  },
];
