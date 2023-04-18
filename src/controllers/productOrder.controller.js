const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { productOrderService } = require('../services');
const pick = require('../utils/pick');

const createProductOrder = catchAsync(async (req, res) => {
  const productOrder = await productOrderService.create(req.params.customerOrderId, req.body);
  res.status(httpStatus.CREATED).send(productOrder);
});

const getProductOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await productOrderService.query(filter, options);
  res.send(result);
});

const getProductOrder = catchAsync(async (req, res) => {
  const productOrder = await productOrderService.getById(req.params.id);
  res.send(productOrder.toJSON());
});

const updateProductOrder = catchAsync(async (req, res) => {
  const productOrder = await productOrderService.updateById(req.params.id, req.body);
  res.send(productOrder);
});

const deleteProductOrder = catchAsync(async (req, res) => {
  await productOrderService.deleteById(req.params.customerOrderId, req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProductOrder,
  getProductOrders,
  getProductOrder,
  updateProductOrder,
  deleteProductOrder,
};
