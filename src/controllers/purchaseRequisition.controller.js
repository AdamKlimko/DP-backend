const { ObjectId } = require('mongoose').Types;
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { purchaseRequisitionService } = require('../services');
const pick = require('../utils/pick');

const createPurchaseRequisition = catchAsync(async (req, res) => {
  const purchaseRequisition = await purchaseRequisitionService.create(req.body);
  res.status(httpStatus.CREATED).send(purchaseRequisition);
});

const getPurchaseRequisitions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['purchaseOrder']);
  if (filter.purchaseOrder) {
    filter.purchaseOrder = ObjectId(filter.purchaseOrder);
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await purchaseRequisitionService.query(filter, options);
  res.send(result);
});

const getPurchaseRequisition = catchAsync(async (req, res) => {
  const purchaseRequisition = await purchaseRequisitionService.getById(req.params.id);
  res.send(purchaseRequisition.toJSON());
});

const updatePurchaseRequisition = catchAsync(async (req, res) => {
  const purchaseRequisition = await purchaseRequisitionService.updateById(req.params.id, req.body);
  res.send(purchaseRequisition);
});

const deletePurchaseRequisition = catchAsync(async (req, res) => {
  await purchaseRequisitionService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPurchaseRequisition,
  getPurchaseRequisitions,
  getPurchaseRequisition,
  updatePurchaseRequisition,
  deletePurchaseRequisition,
};
