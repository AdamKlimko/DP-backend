const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const purchaseOrderService = require('../services/purchaseOrder.service');
const pick = require('../utils/pick');

const createPurchaseOrder = catchAsync(async (req, res) => {
  const purchaseOrder = await purchaseOrderService.create(req.body);
  res.status(httpStatus.CREATED).send(purchaseOrder);
});

const getPurchaseOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await purchaseOrderService.query(filter, options);
  res.send(result);
});

const getPurchaseOrder = catchAsync(async (req, res) => {
  const purchaseOrder = await purchaseOrderService.getById(req.params.id);
  res.send(purchaseOrder.toJSON());
});

const updatePurchaseOrder = catchAsync(async (req, res) => {
  const purchaseOrder = await purchaseOrderService.updateById(req.params.id, req.body);
  res.send(purchaseOrder);
});

const deletePurchaseOrder = catchAsync(async (req, res) => {
  await purchaseOrderService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
};
