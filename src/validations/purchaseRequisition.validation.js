const Joi = require('joi');
const { objectId } = require('./custom.validation');

const body = Joi.object().keys({
  purchaseOrder: Joi.string().custom(objectId),
  productionOrder: Joi.string().custom(objectId).required(),
  semiProduct: Joi.string().custom(objectId).required(),
  state: Joi.string().valid('planned', 'released', 'processed', 'closed', 'canceled').required(),
  quantity: Joi.number().min(1).required(),
  unitPrice: Joi.number().min(0).required(),
  currency: Joi.string().valid('usd', 'eur', 'gbp').required(),
});

const createPurchaseRequisition = {
  body,
};

const getPurchaseRequisitions = {
  query: Joi.object().keys({
    state: Joi.string().valid('planned', 'released', 'processed', 'closed', 'canceled'),
    currency: Joi.string().valid('usd', 'eur', 'gbp'),
    productionOrder: Joi.string(),
    purchaseOrder: Joi.string(),
    populate: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPurchaseRequisition = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updatePurchaseRequisition = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: body.min(1),
};

module.exports = {
  createPurchaseRequisition,
  getPurchaseRequisitions,
  getPurchaseRequisition,
  updatePurchaseRequisition,
};
