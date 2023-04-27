const Joi = require('joi');
const { objectId } = require('./custom.validation');

const body = Joi.object().keys({
  customerOrder: Joi.string().custom(objectId).required(),
  product: Joi.string().custom(objectId).required(),
  productionSeq: Joi.string().custom(objectId).required(),
  state: Joi.string().valid('planned', 'released', 'processed', 'closed', 'canceled').required(),
  quantity: Joi.number().integer().min(1).required(),
  unitPrice: Joi.number().integer().min(0).required(),
});

const createProductOrder = {
  params: Joi.object().keys({
    customerOrderId: Joi.string().custom(objectId),
  }),
  body,
};

const getProductOrders = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProductOrder = {
  params: Joi.object().keys({
    customerOrderId: Joi.string().custom(objectId),
    id: Joi.string().custom(objectId),
  }),
};

const updateProductOrder = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: body.min(1),
};

module.exports = {
  createProductOrder,
  getProductOrders,
  getProductOrder,
  updateProductOrder,
};
