const Joi = require('joi');
const { objectId } = require('./custom.validation');

const body = Joi.object().keys({
  productOrder: Joi.string().custom(objectId),
  productionSeq: Joi.string().custom(objectId),
  state: Joi.string().valid('planned', 'released', 'processed', 'closed', 'canceled'),
  wantedDeliveryDate: Joi.date().required(),
  startDateTime: Joi.date(),
  endDateTime: Joi.any(),
  priority: Joi.string().valid('high', 'medium', 'low'),
  semiProductOrders: Joi.array(),
  currency: Joi.string().valid('usd', 'eur', 'gbp').required(),
});

const createProductionOrder = {
  body,
};

const getProductionOrders = {
  query: Joi.object().keys({
    productOrder: Joi.custom(objectId),
    productionSeq: Joi.string(),
    state: Joi.string().valid('planned', 'released', 'processed', 'closed', 'canceled'),
    priority: Joi.string().valid('high', 'medium', 'low'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProductionOrder = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateProductionOrder = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: body.min(1),
};

module.exports = {
  createProductionOrder,
  getProductionOrders,
  getProductionOrder,
  updateProductionOrder,
};
