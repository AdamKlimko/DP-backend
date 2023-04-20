const Joi = require('joi');
const { objectId } = require('./custom.validation');

const body = Joi.object().keys({
  partNumber: Joi.string().required(),
  description: Joi.string(),
  manufacturer: Joi.string().required(),
  storedQuantity: Joi.number().integer().min(0),
});

const createSemiProduct = {
  body,
};

const getSemiProducts = {
  query: Joi.object().keys({
    partNumber: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSemiProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateSemiProduct = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: body.min(1),
};

module.exports = {
  createSemiProduct,
  getSemiProducts,
  getSemiProduct,
  updateSemiProduct,
};
