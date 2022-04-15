"use strict";

const Joi = require("joi");
const handler = require("./handlers");

module.exports = [
  {
    method: "GET",
    path: "/api/v1/restaurants/status/open",
    handler: handler.getAllOpenRestaurants,
    options: {
      description:
        "Fetch all open restaurants at particular time sample (15 Apr 2022 00:00:00 GMT)",
      notes:
        "Returns array of restaurants at specific time if provided or current time",
      tags: ["api"],
      validate: {
        query: Joi.object({
          date_time: Joi.string()
            .default("15 Apr 2022 00:00:00 GMT")
            .description(
              "optional particular date time to fetch all open restaurants"
            ),
        }),
      },
    },
  },
  {
    method: "GET",
    path: "/api/v1/restaurants",
    handler: handler.getRestaurants,
    options: {
      description:
        "Fetch top y restaurants that has dishes between price range",
      notes:
        "Returns array of restaurants of top y restaurants that has dishes between price range",
      tags: ["api"],
      validate: {
        query: Joi.object({
          min_price: Joi.number()
            .default(10)
            .description("min price of dishes"),
          max_price: Joi.number()
            .default(1000)
            .description("max price of dishes"),
          limit: Joi.number()
            .default(20)
            .description("top y restaurants limit"),
        }),
      },
    },
  },
  {
    method: "GET",
    path: "/api/v1/restaurants/search",
    handler: handler.searchRestaurants,
    options: {
      description: "search restaurants or dishes. search by restaurant or dish",
      notes: "Returns array of names for restaurant or dish search",
      tags: ["api"],
      validate: {
        query: Joi.object({
          search_by: Joi.string()
            .required()
            .default("dish")
            .description("search by restaurant or dish"),
          search_key: Joi.string()
            .required()
            .default("coffee")
            .description("search key"),
        }),
      },
    },
  },
];
