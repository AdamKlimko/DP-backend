const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const purchaseRequisitionService = require('../services/purchaseRequisition.service');
const pick = require('../utils/pick');

const createPurchaseRequisition = catchAsync(async (req, res) => {
  const purchaseRequisition = await purchaseRequisitionService.create(req.body);
  res.status(httpStatus.CREATED).send(purchaseRequisition);
});

const getPurchaseRequisitions = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await purchaseRequisitionService.query(filter, options);
  res.send(result);
});

module.exports = {
  createPurchaseRequisition,
  getPurchaseRequisitions,
};
