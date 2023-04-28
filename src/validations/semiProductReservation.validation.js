const Joi = require('joi');
const { objectId } = require('./custom.validation');

const body = Joi.object().keys({
  semiProductStorageItem: Joi.string().custom(objectId).required(),
  productionOrder: Joi.string().custom(objectId).required(),
  semiProductOrder: Joi.string().custom(objectId).required(),
  reservedQuantity: Joi.number().integer().required(),
  location: Joi.string().required(),
});

const createSemiProductReservation = {
  body,
};

const getSemiProductReservations = {
  query: Joi.object().keys({
    productionOrder: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

const getSemiProductReservation = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateSemiProductReservation = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: body.min(1),
};

module.exports = {
  createSemiProductReservation,
  getSemiProductReservations,
  getSemiProductReservation,
  updateSemiProductReservation,
};
