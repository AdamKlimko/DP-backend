const { ObjectId } = require('mongoose').Types;
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { productStorageItemService } = require('../services');
const pick = require('../utils/pick');
const { Product } = require('../models');

const createProductStorageItem = catchAsync(async (req, res) => {
  const productStorageItem = await productStorageItemService.create(req.body);
  res.status(httpStatus.CREATED).send(productStorageItem);
});

const getProductStorageItems = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['product']);
  if (filter.product) {
    const partNumber = RegExp(filter.product, 'i');
    const product = await Product.findOne({ partNumber });
    filter.product = ObjectId(product ? product.id : null);
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await productStorageItemService.query(filter, options);
  res.send(result);
});

const getProductStorageItem = catchAsync(async (req, res) => {
  const productStorageItem = await productStorageItemService.getById(req.params.id);
  res.send(productStorageItem.toJSON());
});

const updateProductStorageItem = catchAsync(async (req, res) => {
  const productStorageItem = await productStorageItemService.updateById(req.params.id, req.body);
  res.send(productStorageItem);
});

const deleteProductStorageItem = catchAsync(async (req, res) => {
  await productStorageItemService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProductStorageItem,
  getProductStorageItems,
  getProductStorageItem,
  updateProductStorageItem,
  deleteProductStorageItem,
};
