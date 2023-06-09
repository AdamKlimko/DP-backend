const Joi = require('joi');
const { objectId } = require('./custom.validation');

const body = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  country: Joi.string(),
});

const createCustomer = {
  body,
};

const getCustomers = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCustomer = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateCustomer = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body,
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
};
