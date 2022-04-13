"use strict";

const db = require("../src/models");
const { sequelize } = db;
if (process.env.NODE_ENV === "development") sequelize.sync({ force: true });
