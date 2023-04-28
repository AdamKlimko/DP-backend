const Joi = require('joi');
const { objectId } = require('./custom.validation');

const body = Joi.object().keys({
  product: Joi.string().custom(objectId).required(),
  productionOrder: Joi.string().custom(objectId).required(),
  storedQuantity: Joi.number().required(),
  location: Joi.string(),
});

const createProductStorageItem = {
  body,
};

const getProductStorageItems = {
  query: Joi.object().keys({
    product: Joi.string(),
    populate: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProductStorageItem = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateProductStorageItem = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: body.min(1),
};

module.exports = {
  createProductStorageItem,
  getProductStorageItems,
  getProductStorageItem,
  updateProductStorageItem,
};
