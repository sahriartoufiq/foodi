"use strict";

const { ENV, HOST, PORT } = require("../utils/env");
const { DEV } = require("../utils/constants");
const logger = require("../utils/logger");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const Pack = require("package");

const config = async () => {
  const server = require("@hapi/hapi").server({
    host: HOST || "localhost",
    port: PORT || 7000,
    routes: {
      cors: {
        origin: ["*"],
        headers: ["Content-type", "Authorization", "platform"],
      },
    },
    debug: false, // disable Hapi debug console logging
  });

  const swaggerOptions = {
    info: {
      title: "Buying Frenzy API Documentation",
      version: Pack.version,
    },
  };

  await server.register([
    {
      plugin: require("hapi-pino"),
      options: {
        logPayload: false,
        logRouteTags: true,
        logRequestStart: true,
        logRequestComplete: true,
        prettyPrint: true,
        logEvents: ENV === DEV && [
          "onPostStart",
          "onPostStop",
          "onRequest",
          "response",
          "request",
          "request-error",
          "log",
        ],
        // Redact Authorization headers, see https://getpino.io/#/docs/redaction
        redact: ["req.headers.authorization"],
      },
    },
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
    require("../plugins/restaurant"),
    require("../plugins/purchase"),
  ]);

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World!";
    },
    options: {
      auth: false, // Remove this line if 'jwt' authentication required
      validate: {},
    },
  });

  return server;
};

exports.init = async () => {
  const server = await config();

  try {
    await server.initialize();
    return server;
  } catch (error) {
    console.error(error);
    logger.error("server.js", error);
  }

  return null;
};

exports.start = async () => {
  const server = await config();

  try {
    await server.start();
  } catch (error) {
    console.error(error);
    logger.error("server.js", error);
  }
};

process.on("unhandledRejection", (error) => {
  console.error(error);
  logger.error("server.js", error);
});
