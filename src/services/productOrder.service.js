const httpStatus = require('http-status');
const { ProductOrder } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (customerOrderId, productOrder) => {
  return ProductOrder.create(productOrder);
};

const query = async (filter, options) => {
  return ProductOrder.paginate(filter, options);
};

const getById = async (id) => {
  const productOrder = await ProductOrder.findById(id);
  if (!productOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Order not found');
  }
  return productOrder;
};

const updateById = async (id, updateBody) => {
  const productOrder = await getById(id);
  Object.assign(productOrder, updateBody);
  await productOrder.save();
  return productOrder;
};

const deleteById = async (customerOrderId, id) => {
  const productOrder = await getById(id);
  await productOrder.deleteOne();
  return productOrder;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};
