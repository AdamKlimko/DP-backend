const Joi = require('joi');
const { objectId } = require('./custom.validation');

const body = Joi.object().keys({
  state: Joi.string().valid('planned', 'released', 'processed', 'closed', 'canceled'),
  customer: Joi.string().custom(objectId).required(),
  priority: Joi.string().valid('high', 'medium', 'low').required(),
  address: Joi.string().required(),
  customerOrders: Joi.array().required(),
});

const createShipment = {
  body,
};

const getShipments = {
  query: Joi.object().keys({
    state: Joi.string().valid('planned', 'released', 'processed', 'closed', 'canceled'),
    priority: Joi.string().valid('high', 'medium', 'low'),
    customer: Joi.string(),
    populate: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getShipment = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateShipment = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: body.min(1),
};

module.exports = {
  createShipment,
  getShipments,
  getShipment,
  updateShipment,
};
