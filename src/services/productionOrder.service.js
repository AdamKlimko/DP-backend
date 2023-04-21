const httpStatus = require('http-status');
const { ProductionOrder, Product } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (productionOrder) => {
  return ProductionOrder.create(productionOrder);
};

const query = async (filter, options) => {
  return ProductionOrder.paginate(filter, options);
};

const getById = async (id) => {
  const productionOrder = await ProductionOrder.findById(id).populate('productOrder');
  if (!productionOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Production Order not found');
  }
  productionOrder.productOrder.product = await Product.findById(productionOrder.productOrder.product).populate({
    path: 'billOfMaterials',
    populate: { path: 'semiProduct', model: 'semi-product' },
  });
  return productionOrder;
};

const updateById = async (id, updateBody) => {
  const productionOrder = await getById(id);
  Object.assign(productionOrder, updateBody);
  await productionOrder.save();
  return productionOrder;
};

const deleteById = async (id) => {
  const productionOrder = await getById(id);
  await productionOrder.deleteOne();
  return productionOrder;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};
