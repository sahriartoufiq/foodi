"use strict";
const fs = require("fs");
const _ = require("lodash");

const weekDay = {
  Sun: 0,
  Mon: 1,
  Tues: 2,
  Wed: 3,
  Thurs: 4,
  Fri: 5,
  Sat: 6,
};

const dayArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const getFormattedOpeningTime = (openingTime, restaurantId) => {
  const result = [];
  const openingTimes = openingTime.split("/");

  for (let n = 0; n < openingTimes.length; n++) {
    const openingTimeString = openingTimes[n];
    const firstDigitIndex = openingTimeString.search(/\d/);

    const times = openingTimeString
      .substring(firstDigitIndex, openingTimeString.length)
      .trim()
      .split("-");

    const openingTime = convertTime(times[0].trim());
    const closingTime = convertTime(times[1].trim());
    const daysString = openingTimeString
      .substring(0, firstDigitIndex)
      .trim()
      .split(",");

    for (let k = 0; k < daysString.length; k++) {
      const splittedDays = daysString[k].split(" - ");
      const startDay = weekDay[splittedDays[0].trim()];
      const endDay = splittedDays[1]
        ? weekDay[splittedDays[1].trim()]
        : startDay;

      for (let i = startDay; i <= endDay; i++) {
        result.push({
          restaurant_id: restaurantId,
          week_days: weekDay[dayArray[i]],
          opening_time: openingTime,
          closing_time: closingTime,
        });
      }
    }
  }

  return result;
};

const convertTime = (timeStr) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes = "00"] = time.split(":");
  if (hours === "12") {
    hours = "00";
  }
  if (modifier === "pm") {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}`;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const restaurantRawData = fs.readFileSync(
      __dirname + "/restaurant_with_menu.json"
    );
    const restaurantData = JSON.parse(restaurantRawData);
    const restaurants = restaurantData.map((element) => {
      return {
        cash_balance: element.cashBalance,
        restaurant_name: element.restaurantName,
      };
    });

    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert("restaurant", restaurants, {
        transaction,
      });

      const result = await queryInterface.sequelize.query(
        "select id, restaurant_name from restaurant",
        { transaction }
      );

      const restaurantMap = _.keyBy(
        _.map(result[0], (entity) => entity),
        "restaurant_name"
      );

      const restaurantMenus = [];
      const openingHours = [];
      restaurantData.forEach((element) => {
        const restaurantId = restaurantMap[element.restaurantName].id;
        const menus = element.menu.map((entity) => {
          return {
            restaurant_id: restaurantId,
            dish_name: entity.dishName,
            price: entity.price,
          };
        });

        Array.prototype.push.apply(restaurantMenus, menus);

        const openingTimes = getFormattedOpeningTime(
          element.openingHours,
          restaurantId
        );

        Array.prototype.push.apply(openingHours, openingTimes);
      });

      await queryInterface.bulkInsert("restaurant_menu", restaurantMenus, {
        transaction,
      });

      await queryInterface.bulkInsert(
        "restaurant_opening_hours",
        openingHours,
        {
          transaction,
        }
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    return (
      (await queryInterface.bulkDelete("restaurant", null, {})) &&
      (await queryInterface.bulkDelete("restaurant_menu", null, {})) &&
      (await queryInterface.bulkDelete("restaurant_opening_hours", null, {}))
    );
  },
};
