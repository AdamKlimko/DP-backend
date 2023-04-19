const httpStatus = require('http-status');
const { CustomerOrder, ProductOrder } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (customerOrder) => {
  const productOrderPromises = customerOrder.productOrders.map(async (productOrder) => {
    const newProductOrder = await ProductOrder.create(productOrder);
    return newProductOrder._id;
  });

  const productOrderIds = await Promise.all(productOrderPromises);

  const newCustomerOrder = customerOrder;
  newCustomerOrder.productOrders = productOrderIds;
  return CustomerOrder.create(newCustomerOrder);
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
