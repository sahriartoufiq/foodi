"use strict";

const db = require("../models/index");
const _ = require("lodash");

class BaseService {
  constructor(model) {
    this.model = model;
  }

  async create(payload, transaction) {
    return await db[this.model].create(payload, { transaction });
  }

  async bulkUpdate(payload, columnsToUpdate, transaction) {
    return await db[this.model].bulkCreate(payload, {
      transaction,
      updateOnDuplicate: columnsToUpdate,
    });
  }

  async bulkCreate(payload, transaction) {
    return await db[this.model].bulkCreate(payload, { transaction });
  }

  async readAll(include, order, offset, limit) {
    return await db[this.model].findAll({
      include: !include ? undefined : include,
      order: !order ? undefined : order,
      offset: !offset ? undefined : offset,
      limit: !limit ? undefined : limit,
    });
  }

  async readAndCountAll(include, where, order, limit, offset) {
    return await db[this.model].findAndCountAll({
      include: !include ? undefined : include,
      where: !where ? undefined : where,
      order: !order ? undefined : order,
      limit: !limit ? undefined : limit,
      offset: !offset ? undefined : offset,
    });
  }

  async readById(id, include, order) {
    return await db[this.model].findAll({
      where: { id },
      include: !include ? undefined : include,
      order: !order ? undefined : order,
    });
  }

  async readBy(field, value, include, order, offset, limit) {
    return await db[this.model].findAll({
      include: !include ? undefined : include,
      where: { [field]: value },
      order: !order ? undefined : order,
      offset: !offset ? undefined : offset,
      limit: !limit ? undefined : limit,
      // raw: true,
      // plain: true,
    });
  }

  async readByWhere(attributes, where, include, order, offset, limit) {
    return await db[this.model].findAll({
      attributes: !attributes ? undefined : attributes,
      include: !include ? undefined : include,
      where,
      order: !order ? undefined : order,
      offset: !offset ? undefined : offset,
      limit: !limit ? undefined : limit,
    });
  }

  async readByWhereV2(where, attributes, include, order, limit, offset) {
    return await db[this.model].findAll({
      where,
      attributes: !attributes ? undefined : attributes,
      include: !include ? undefined : include,
      order: !order ? undefined : order,
      limit: !limit ? undefined : limit,
      offset: !offset ? undefined : offset,
    });
  }

  async readByNested(include, order) {
    return await db[this.model].findAll({
      include: !include ? undefined : include,
      order: !order ? undefined : order,
    });
  }

  async count(where, include, isDistinct, distinctColumn) {
    return await db[this.model].count({
      include: !include ? undefined : include,
      where: !where ? undefined : where,
      distinct: !isDistinct ? undefined : isDistinct,
      col: !distinctColumn ? undefined : distinctColumn,
    });
  }

  async updateById(id, payload, transaction) {
    return await db[this.model].update(payload, {
      where: {
        id,
      },
      transaction,
    });
  }

  async updateBy(field, value, payload) {
    return await db[this.model].update(payload, {
      where: {
        [field]: value,
      },
    });
  }

  async updateByWhere(where, payload, transaction) {
    return await db[this.model].update(payload, {
      where,
      transaction,
    });
  }

  async increamentBy(value, where, field) {
    return await db[this.model].increment(field, { by: value, where: where });
  }

  async deleteById(id, transaction) {
    return await db[this.model].destroy({
      where: {
        id,
      },
      transaction,
    });
  }
}

module.exports = BaseService;
