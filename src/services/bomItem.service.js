const httpStatus = require('http-status');
const { BomItem, Product } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (productId, bomItem) => {
  const newBomItem = await BomItem.create(bomItem);
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  product.billOfMaterials.push(newBomItem);
  await product.save();
  return newBomItem;
};

const query = async (filter, options) => {
  return BomItem.paginate(filter, options);
};

const getById = async (id) => {
  const bomItem = await BomItem.findById(id);
  if (!bomItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bom Item not found');
  }
  return bomItem;
};

const updateById = async (id, updateBody) => {
  const bomItem = await getById(id);
  Object.assign(bomItem, updateBody);
  await bomItem.save();
  return bomItem;
};

const deleteById = async (productId, id) => {
  const bomItem = await getById(id);

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  await Product.findByIdAndUpdate(product._id, {
    $pull: { billOfMaterials: bomItem._id },
  });

  await bomItem.deleteOne();

  return bomItem;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};
