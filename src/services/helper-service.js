"use strict";

const BaseService = require("./base-service");

class HelperService extends BaseService {
  constructor(model, include, order) {
    super(model);

    this.model = model;
    this.include = include;
    this.order = order;
  }
}

module.exports = HelperService;
