"use strict";

const handler = require("./handlers");

module.exports = [
  {
    method: "GET",
    path: "/api/v1/restaurants/status/open",
    handler: handler.getAllOpenRestaurants,
    options: {},
  },
];
