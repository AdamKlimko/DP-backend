const httpStatus = require('http-status');
const { ProductStorageItem, ProductionOrder, Product } = require('../models');
const ApiError = require('../utils/ApiError');
const { state } = require('../config/state');

const create = async (productStorageItem) => {
  await ProductionOrder.updateOne({ _id: productStorageItem.productionOrder }, { state: state.PROCESSED });
  await Product.updateOne(
    { _id: productStorageItem.product },
    { $inc: { storedQuantity: productStorageItem.storedQuantity } }
  );
  return ProductStorageItem.create(productStorageItem);
};

const query = async (filter, options) => {
  return ProductStorageItem.paginate(filter, options);
};

const getById = async (id) => {
  const productStorageItem = await ProductStorageItem.findById(id);
  if (!productStorageItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Storage Item not found');
  }
  return productStorageItem;
};

const updateById = async (id, updateBody) => {
  const productStorageItem = await getById(id);
  Object.assign(productStorageItem, updateBody);
  await productStorageItem.save();
  return productStorageItem;
};

const deleteById = async (id) => {
  const productStorageItem = await getById(id);
  await productStorageItem.deleteOne();
  return productStorageItem;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};
