const Joi = require('joi');

const getProfitBarChart = {
  params: Joi.object().keys({
    timeFrame: Joi.string().valid('month', 'year'),
  }),
};

const getOrderBarChart = {
  params: Joi.object().keys({
    timeFrame: Joi.string().valid('week', 'month', 'year', 'all'),
  }),
};

module.exports = {
  getProfitBarChart,
  getOrderBarChart,
};
