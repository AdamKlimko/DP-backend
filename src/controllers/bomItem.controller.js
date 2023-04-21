const { ObjectId } = require('mongoose').Types;
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { bomItemService } = require('../services');
const pick = require('../utils/pick');

const createBomItem = catchAsync(async (req, res) => {
  const bomItem = await bomItemService.create(req.params.productId, req.body);
  res.status(httpStatus.CREATED).send(bomItem);
});

const getBomItems = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  if (req.params.productId) {
    filter.product = ObjectId(req.params.productId);
  }
  const result = await bomItemService.query(filter, options);
  res.send(result);
});

const getBomItem = catchAsync(async (req, res) => {
  const bomItem = await bomItemService.getById(req.params.id);
  res.send(bomItem.toJSON());
});

const updateBomItem = catchAsync(async (req, res) => {
  const bomItem = await bomItemService.updateById(req.params.id, req.body);
  res.send(bomItem);
});

const deleteBomItem = catchAsync(async (req, res) => {
  await bomItemService.deleteById(req.params.productId, req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBomItem,
  getBomItems,
  getBomItem,
  updateBomItem,
  deleteBomItem,
};
