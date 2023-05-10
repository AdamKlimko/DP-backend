const httpStatus = require('http-status');
const { CustomerOrder, ProductOrder } = require('../models');
const ApiError = require('../utils/ApiError');

const calculatePrice = async (customerOrderId) => {
  const productOrders = await ProductOrder.find({ customerOrder: customerOrderId });
  let price = 0;
  productOrders.forEach((po) => {
    price += po.unitPrice * po.quantity;
  });
  return price;
};

const create = async (customerOrder) => {
  return CustomerOrder.create(customerOrder);
};

const query = async (filter, options) => {
  return CustomerOrder.paginate(filter, options);
};

const getById = async (id) => {
  const customerOrder = await CustomerOrder.findById(id).populate('customer');
  if (!customerOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer Order not found');
  }
  return customerOrder;
};

const updateById = async (id, updateBody) => {
  const customerOrder = await getById(id);
  customerOrder.price = await calculatePrice(id);
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
