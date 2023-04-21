const Joi = require('joi');
const { objectId } = require('./custom.validation');

const body = Joi.object().keys({
  semiProduct: Joi.string().custom(objectId).required(),
  quantity: Joi.number().min(1),
});

const createBomItem = {
  body,
};

const getBomItems = {
  query: Joi.object().keys({
    partNumber: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBomItem = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
    productId: Joi.string().custom(objectId),
  }),
};

const updateBomItem = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: body.min(1),
};

module.exports = {
  createBomItem,
  getBomItems,
  getBomItem,
  updateBomItem,
};
