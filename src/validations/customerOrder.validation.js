const Joi = require('joi');
const { objectId } = require('./custom.validation');

const body = Joi.object().keys({
  state: Joi.string().valid('planned', 'released', 'processed', 'closed', 'canceled'),
  price: Joi.number().required(),
  currency: Joi.string().valid('usd', 'eur', 'gbp').required(),
  orderDate: Joi.date().required(),
  productionSeq: Joi.string().required(),
  priority: Joi.string().valid('high', 'medium', 'low').required(),
  orderProfit: Joi.number(),
  customer: Joi.string().custom(objectId),
  productOrders: Joi.array().required(),
});

const createCustomerOrder = {
  body,
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
  body: body.min(1),
};

module.exports = {
  createCustomerOrder,
  getCustomerOrders,
  getCustomerOrder,
  updateCustomerOrder,
};
