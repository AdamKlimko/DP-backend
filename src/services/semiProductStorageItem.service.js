const httpStatus = require('http-status');
const { SemiProductStorageItem } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (semiProductStorageItem) => {
  return SemiProductStorageItem.create(semiProductStorageItem);
};

const query = async (filter, options) => {
  return SemiProductStorageItem.paginate(filter, options);
};

const getById = async (id) => {
  const semiProductStorageItem = await SemiProductStorageItem.findById(id);
  if (!semiProductStorageItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Semi-Product Storage Item not found');
  }
  return semiProductStorageItem;
};

const updateById = async (id, updateBody) => {
  const semiProductStorageItem = await getById(id);
  Object.assign(semiProductStorageItem, updateBody);
  await semiProductStorageItem.save();
  return semiProductStorageItem;
};

const deleteById = async (id) => {
  const semiProductStorageItem = await getById(id);
  await semiProductStorageItem.deleteOne();
  return semiProductStorageItem;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};
