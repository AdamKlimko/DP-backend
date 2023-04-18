const httpStatus = require('http-status');
const { CustomerOrder, ProductOrder } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (customerOrder) => {
  // Create an array of Promises that resolve to new ProductOrder objects
  const productOrderPromises = customerOrder.productOrders.map(async (productOrder) => {
    const newProductOrder = await ProductOrder.create(productOrder);
    return newProductOrder._id;
  });

  // Wait for all Promises to resolve and collect the _id values in a new array
  const productOrderIds = await Promise.all(productOrderPromises);

  const newCustomerOrder = customerOrder;
  newCustomerOrder.productOrders = productOrderIds;
  return CustomerOrder.create(newCustomerOrder);
};

const query = async (filter, options) => {
  return CustomerOrder.paginate(filter, options);
};

const getById = async (id) => {
  const customerOrder = await CustomerOrder.findById(id).populate({
    path: 'productOrders',
    populate: { path: 'product', model: 'product' },
  });
  if (!customerOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer Order not found');
  }
  return customerOrder;
};

const updateById = async (id, updateBody) => {
  const customerOrder = await getById(id);
  const newCustomerOrder = updateBody;
  newCustomerOrder.productOrders = customerOrder.productOrders;
  Object.assign(customerOrder, newCustomerOrder);
  await customerOrder.save();
  return customerOrder;
};

const deleteById = async (id) => {
  const customerOrder = await getById(id);
  await customerOrder.remove();
  return customerOrder;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};
