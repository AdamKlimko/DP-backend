const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { semiProductService } = require('../services');
const pick = require('../utils/pick');

const createSemiProduct = catchAsync(async (req, res) => {
  const semiSemiProduct = await semiProductService.create(req.body);
  res.status(httpStatus.CREATED).send(semiSemiProduct);
});

const getSemiProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['partNumber', 'id']);
  if (filter.partNumber) {
    filter.partNumber = RegExp(filter.partNumber, 'i');
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await semiProductService.query(filter, options);
  res.send(result);
});

const getSemiProduct = catchAsync(async (req, res) => {
  const semiSemiProduct = await semiProductService.getById(req.params.id);
  res.send(semiSemiProduct.toJSON());
});

const updateSemiProduct = catchAsync(async (req, res) => {
  const semiSemiProduct = await semiProductService.updateById(req.params.id, req.body);
  res.send(semiSemiProduct);
});

const deleteSemiProduct = catchAsync(async (req, res) => {
  await semiProductService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSemiProduct,
  getSemiProducts,
  getSemiProduct,
  updateSemiProduct,
  deleteSemiProduct,
};
