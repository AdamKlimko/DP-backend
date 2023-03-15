const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const supplierService = require('../services/supplier.service');
const pick = require('../utils/pick');

const createSupplier = catchAsync(async (req, res) => {
  const supplier = await supplierService.create(req.body);
  res.status(httpStatus.CREATED).send(supplier);
});

const getSuppliers = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await supplierService.query(filter, options);
  res.send(result);
});

module.exports = {
  createSupplier,
  getSuppliers,
};
