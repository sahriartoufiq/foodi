"use strict";

const handler = require("./handlers");

module.exports = [
  {
    method: "GET",
    path: "/api/v1/restaurants/status/open",
    handler: handler.getAllOpenRestaurants,
    options: {},
  },
  {
    method: "GET",
    path: "/api/v1/restaurants",
    handler: handler.getRestaurants,
    options: {},
  },
];
