const Joi = require('joi');
const { objectId } = require('./custom.validation');

const body = Joi.object().keys({
  semiProduct: Joi.string().custom(objectId).required(),
  purchaseRequisition: Joi.string().custom(objectId).required(),
  storedQuantity: Joi.number().required(),
  location: Joi.string(),
});

const createSemiProductStorageItem = {
  body,
};

const getSemiProductStorageItems = {
  query: Joi.object().keys({
    populate: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSemiProductStorageItem = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateSemiProductStorageItem = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: body.min(1),
};

module.exports = {
  createSemiProductStorageItem,
  getSemiProductStorageItems,
  getSemiProductStorageItem,
  updateSemiProductStorageItem,
};
