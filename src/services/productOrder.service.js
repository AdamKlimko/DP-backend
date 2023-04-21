const httpStatus = require('http-status');
const { ProductOrder, CustomerOrder } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (customerOrderId, productOrder) => {
  const newProductOrder = await ProductOrder.create(productOrder);

  const customerOrder = await CustomerOrder.findById(customerOrderId);
  if (!customerOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer Order not found');
  }

  customerOrder.productOrders.push(newProductOrder);
  await customerOrder.save();

  return newProductOrder;
};

const query = async (filter, options) => {
  return ProductOrder.paginate(filter, options);
};

const getById = async (id) => {
  const productOrder = await ProductOrder.findById(id);
  if (!productOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ProductOrder not found');
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

  const customerOrder = await CustomerOrder.findById(customerOrderId);
  if (!customerOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer Order not found');
  }

  await CustomerOrder.findByIdAndUpdate(customerOrder._id, {
    $pull: { productOrders: productOrder._id },
  });

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
