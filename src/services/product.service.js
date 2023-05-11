const httpStatus = require('http-status');
const { Product, ProductOrder } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (product) => {
  return Product.create(product);
};

const query = async (filter, options) => {
  return Product.paginate(filter, options);
};

const getById = async (id) => {
  const product = await Product.findById(id).populate({
    path: 'billOfMaterials',
    populate: { path: 'semiProduct', model: 'semi-product' },
  });
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
};

const updateById = async (id, updateBody) => {
  const product = await getById(id);
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

const deleteById = async (id) => {
  const productOrder = await ProductOrder.findOne({ product: id });
  if (productOrder) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Product is used in production seq: ${productOrder.productionSeq}`);
  }
  const product = await getById(id);
  await product.deleteOne();
  return product;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};
