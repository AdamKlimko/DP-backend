const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProductReservation = {
  body: Joi.object().keys({
    customerOrder: Joi.string().custom(objectId).required(),
    product: Joi.string().custom(objectId).required(),
    reservedQuantity: Joi.number().integer().required(),
    productionSeq: Joi.string().custom(objectId).required(),
    location: Joi.string().required(),
  }),
};

const getProductReservations = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProductReservation = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateProductReservation = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      customerOrder: Joi.string().custom(objectId),
      product: Joi.string().custom(objectId),
      reservedQuantity: Joi.number(),
      productionSeq: Joi.string().custom(objectId),
      location: Joi.string(),
    })
    .min(1),
};

module.exports = {
  createProductReservation,
  getProductReservations,
  getProductReservation,
  updateProductReservation,
};
