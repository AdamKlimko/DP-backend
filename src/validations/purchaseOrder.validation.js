const Joi = require('joi');
const { objectId } = require('./custom.validation');

const body = Joi.object().keys({
  supplier: Joi.string().required(),
  state: Joi.string().valid('planned', 'released', 'processed', 'closed', 'canceled'),
  currency: Joi.string().valid('usd', 'eur', 'gbp'),
  priority: Joi.string().valid('high', 'medium', 'low'),
  wantedDeliveryDate: Joi.date().required(),
});

const createPurchaseOrder = {
  body,
};

const getPurchaseOrders = {
  query: Joi.object().keys({
    state: Joi.string().valid('planned', 'released', 'processed', 'closed', 'canceled'),
    currency: Joi.string().valid('usd', 'eur', 'gbp'),
    priority: Joi.string().valid('high', 'medium', 'low'),
    populate: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPurchaseOrder = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updatePurchaseOrder = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: body.min(1),
};

const processPurchaseOrder = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    location: Joi.string().required(),
  }),
};

module.exports = {
  createPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrder,
  updatePurchaseOrder,
  processPurchaseOrder,
};
