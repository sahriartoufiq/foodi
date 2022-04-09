"use strict";

const Boom = require("@hapi/boom");

const errorMapper = (object) => {
  // console.error(object);

  let message = "";
  const { name } = object;

  if (object && object.errors && object.errors[0] && object.errors[0].message) {
    const { message: errorMessage } = object.errors[0];
    message = errorMessage;
  } else if (object && object.parent && object.parent.sqlMessage) {
    const { sqlMessage: errorMessage } = object.parent;
    message = errorMessage;
  } else if (object && object.message) {
    const { message: errorMessage } = object;
    message = errorMessage;
  }

  // error mapper for sequelize
  if (name === "SequelizeDatabaseError") {
    return Boom.internal(message);
  }

  if (name === "SequelizeValidationError") {
    return Boom.badRequest(message);
  }

  if (name === "SequelizeUniqueConstraintError") {
    return Boom.badRequest(message);
  }

  if (name === "SequelizeForeignKeyConstraintError") {
    return Boom.locked(
      "Cannot delete or update a parent row, due to there is child data depends on it."
    );
  }

  // error mapper for other purpose
  if (name === "badRequest") {
    // 400
    return Boom.badRequest(message);
  }

  if (name === "unauthorized") {
    // 401
    return Boom.unauthorized(message || "You are not authorized");
  }

  if (name === "paymentRequired") {
    // 402
    return Boom.unauthorized(message);
  }

  if (name === "forbidden") {
    // 403
    return Boom.forbidden(message);
  }

  if (name === "notFound") {
    // 404
    return Boom.notFound(message);
  }

  if (name === "badData") {
    // 422
    return Boom.badData(message);
  }

  if (name === "badImplementation") {
    return Boom.badImplementation(message);
  }
  
  return error;
};

module.exports = {
  error: (object) => {
    const error = errorMapper(object);

    return error;
  },

  success: (data, message) => {
    return {
      statusCode: 200,
      data,
      message,
    };
  },
};
