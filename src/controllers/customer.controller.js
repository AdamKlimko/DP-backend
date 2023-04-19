const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { customerService } = require('../services');
const pick = require('../utils/pick');

const createCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.create(req.body);
  res.status(httpStatus.CREATED).send(customer);
});

const getCustomers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  if (filter.name) {
    filter.name = RegExp(filter.name, 'i');
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await customerService.query(filter, options);
  res.send(result);
});

const getCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.getById(req.params.id);
  res.send(customer.toJSON());
});

const updateCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.updateById(req.params.id, req.body);
  res.send(customer);
});

const deleteCustomer = catchAsync(async (req, res) => {
  await customerService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
