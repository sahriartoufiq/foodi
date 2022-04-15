"use strict";

const Joi = require("joi");
const handler = require("./handlers");

module.exports = [
  {
    method: "POST",
    path: "/api/v1/customer/purchase",
    handler: handler.purchaseItem,
    options: {
      description: "purchase dish from restaurant",
      notes: "Returns a todo item by the id passed in the path",
      tags: ["api"], // ADD THIS TAG
      validate: {
        payload: Joi.object({
          userId: Joi.number().required().default(11).description("user id."),
          restaurantName: Joi.string()
            .required()
            .default("Pizza Burg")
            .description("restaurant name that user want purchase from."),
          dishName: Joi.string()
            .required()
            .default("coffee")
            .description("dish name that user want to purchase."),
        }),
      },
    },
  },
];
