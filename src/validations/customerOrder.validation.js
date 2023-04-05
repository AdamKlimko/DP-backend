const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCustomerOrder = {
  body: Joi.object().keys({
    state: Joi.string().valid('planned', 'released', 'processed', 'closed', 'canceled').required(),
    price: Joi.number().required(),
    currency: Joi.string().valid('usd', 'eur', 'gbp').required(),
    orderDate: Joi.date().required(),
    productionSeq: Joi.string().required(),
    priority: Joi.string().valid('high', 'medium', 'low').required(),
    orderProfit: Joi.number(),
    customer: Joi.string().custom(objectId),
    products: Joi.array().items(Joi.string().custom(objectId)).required(),
  }),
};

const getCustomerOrders = {
  query: Joi.object().keys({
    state: Joi.string().valid('planned', 'released', 'processed', 'closed', 'canceled'),
    currency: Joi.string().valid('usd', 'eur', 'gbp'),
    priority: Joi.string().valid('high', 'medium', 'low'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCustomerOrder = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateCustomerOrder = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      state: Joi.string().valid('planned', 'released', 'processed', 'closed', 'canceled'),
      price: Joi.number(),
      currency: Joi.string().valid('usd', 'eur', 'gbp'),
      orderDate: Joi.date(),
      productionSeq: Joi.string(),
      priority: Joi.string().valid('high', 'medium', 'low'),
      orderProfit: Joi.number(),
      customer: Joi.string().custom(objectId),
      products: Joi.array().items(Joi.string().custom(objectId)),
    })
    .min(1),
};

module.exports = {
  createCustomerOrder,
  getCustomerOrders,
  getCustomerOrder,
  updateCustomerOrder,
};
