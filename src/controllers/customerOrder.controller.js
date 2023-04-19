const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { customerOrderService } = require('../services');
const pick = require('../utils/pick');

const createCustomerOrder = catchAsync(async (req, res) => {
  const customerOrder = await customerOrderService.create(req.body);
  res.status(httpStatus.CREATED).send(customerOrder);
});

const getCustomerOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['productionSeq', 'state', 'currency', 'priority']);
  if (filter.productionSeq) {
    filter.productionSeq = RegExp(filter.productionSeq, 'i');
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await customerOrderService.query(filter, options);
  res.send(result);
});

const getCustomerOrder = catchAsync(async (req, res) => {
  const customerOrder = await customerOrderService.getById(req.params.id);
  res.send(customerOrder.toJSON());
});

const updateCustomerOrder = catchAsync(async (req, res) => {
  const customerOrder = await customerOrderService.updateById(req.params.id, req.body);
  res.send(customerOrder);
});

const deleteCustomerOrder = catchAsync(async (req, res) => {
  await customerOrderService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCustomerOrder,
  getCustomerOrders,
  getCustomerOrder,
  updateCustomerOrder,
  deleteCustomerOrder,
};
