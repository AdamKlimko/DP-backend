const Joi = require('joi');
const { objectId } = require('./custom.validation');

const body = Joi.object().keys({
  product: Joi.string().custom(objectId),
  quantity: Joi.number().integer().min(0),
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
