const Joi = require('joi');
const { objectId } = require('./custom.validation');

const body = Joi.object().keys({
  semiProduct: Joi.string().custom(objectId),
  productionOrder: Joi.string().custom(objectId),
  reservedQuantity: Joi.number().integer().required(),
  location: Joi.string().required(),
});

const createSemiProductReservation = {
  body,
};

const getSemiProductReservations = {
  query: Joi.object().keys({
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
