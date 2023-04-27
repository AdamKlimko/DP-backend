const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { semiProductStorageItemService } = require('../services');
const pick = require('../utils/pick');

const createSemiProductStorageItem = catchAsync(async (req, res) => {
  const semiProductStorageItem = await semiProductStorageItemService.create(req.body);
  res.status(httpStatus.CREATED).send(semiProductStorageItem);
});

const getSemiProductStorageItems = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await semiProductStorageItemService.query(filter, options);
  res.send(result);
});

const getSemiProductStorageItem = catchAsync(async (req, res) => {
  const semiProductStorageItem = await semiProductStorageItemService.getById(req.params.id);
  res.send(semiProductStorageItem.toJSON());
});

const updateSemiProductStorageItem = catchAsync(async (req, res) => {
  const semiProductStorageItem = await semiProductStorageItemService.updateById(req.params.id, req.body);
  res.send(semiProductStorageItem);
});

const deleteSemiProductStorageItem = catchAsync(async (req, res) => {
  await semiProductStorageItemService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSemiProductStorageItem,
  getSemiProductStorageItems,
  getSemiProductStorageItem,
  updateSemiProductStorageItem,
  deleteSemiProductStorageItem,
};
