const Joi = require('joi');
const { objectId } = require('./custom.validation');

const body = Joi.object().keys({
  productStorageItem: Joi.string().custom(objectId).required(),
  customerOrder: Joi.string().custom(objectId).required(),
  productOrder: Joi.string().custom(objectId).required(),
  reservedQuantity: Joi.number().integer().required(),
  location: Joi.string().required(),
});

const createProductReservation = {
  body,
};

const getProductReservations = {
  query: Joi.object().keys({
    customerOrder: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
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
  body: body.min(1),
};

module.exports = {
  createProductReservation,
  getProductReservations,
  getProductReservation,
  updateProductReservation,
};
