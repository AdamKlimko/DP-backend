const { ObjectId } = require('mongoose').Types;
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { productionOrderService } = require('../services');
const pick = require('../utils/pick');

const createProductionOrder = catchAsync(async (req, res) => {
  const productionOrder = await productionOrderService.create(req.body);
  res.status(httpStatus.CREATED).send(productionOrder);
});

const getProductionOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['productOrder', 'state', 'priority']);
  if (filter.productOrder) {
    filter.productOrder = ObjectId(filter.productOrder);
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await productionOrderService.query(filter, options);
  res.send(result);
});

const getProductionOrder = catchAsync(async (req, res) => {
  const productionOrder = await productionOrderService.getById(req.params.id);
  res.send(productionOrder.toJSON());
});

const getSemiProductOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  filter.productionOrder = ObjectId(req.params.id);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await productionOrderService.getSemiProductOrders(filter, options);
  res.send(result);
});

const getSemiProductReservations = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  filter.productionOrder = ObjectId(req.params.id);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await productionOrderService.getSemiProductReservations(filter, options);
  res.send(result);
});

const updateProductionOrder = catchAsync(async (req, res) => {
  const productionOrder = await productionOrderService.updateById(req.params.id, req.body);
  res.send(productionOrder);
});

const deleteProductionOrder = catchAsync(async (req, res) => {
  await productionOrderService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProductionOrder,
  getProductionOrders,
  getProductionOrder,
  updateProductionOrder,
  deleteProductionOrder,
  getSemiProductOrders,
  getSemiProductReservations,
};
