const httpStatus = require('http-status');
const { CustomerOrder } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (customerOrder) => {
  return CustomerOrder.create(customerOrder);
};

const query = async (filter, options) => {
  return CustomerOrder.paginate(filter, options);
};

const getById = async (id) => {
  const customerOrder = await CustomerOrder.findById(id)
    .populate({
      path: 'productOrders',
      populate: { path: 'product', model: 'product' },
    })
    .populate({
      path: 'productReservations',
      populate: { path: 'productOrder', model: 'product-order' },
    })
    .populate('customer');
  if (!customerOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer Order not found');
  }
  return customerOrder;
};

const updateById = async (id, updateBody) => {
  const customerOrder = await getById(id);
  Object.assign(customerOrder, updateBody);
  await customerOrder.save();
  return customerOrder;
};

const deleteById = async (id) => {
  const customerOrder = await getById(id);
  await customerOrder.deleteOne();
  return customerOrder;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};
