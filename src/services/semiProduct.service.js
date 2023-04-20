const httpStatus = require('http-status');
const { SemiProduct } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (semiProduct) => {
  return SemiProduct.create(semiProduct);
};

const query = async (filter, options) => {
  return SemiProduct.paginate(filter, options);
};

const getById = async (id) => {
  const semiProduct = await SemiProduct.findById(id);
  if (!semiProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SemiProduct not found');
  }
  return semiProduct;
};

const updateById = async (id, updateBody) => {
  const semiProduct = await getById(id);
  Object.assign(semiProduct, updateBody);
  await semiProduct.save();
  return semiProduct;
};

const deleteById = async (id) => {
  const semiProduct = await getById(id);
  await semiProduct.remove();
  return semiProduct;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};
