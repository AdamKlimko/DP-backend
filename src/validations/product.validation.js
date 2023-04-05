const Joi = require('joi');
const { objectId } = require('./custom.validation');

const body = Joi.object().keys({
  partNumber: Joi.string().required(),
  description: Joi.string(),
  storedQuantity: Joi.number().integer(),
  uom: Joi.string().required(),
  size: Joi.string(),
  billOfMaterials: Joi.array().items(Joi.string()),
});

const createProduct = {
  body,
};

const getProducts = {
  query: Joi.object().keys({
    uom: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: body.min(1),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
};
