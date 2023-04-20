const httpStatus = require('http-status');
const { Customer } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (customer) => {
  return Customer.create(customer);
};

const query = async (filter, options) => {
  return Customer.paginate(filter, options);
};

const getById = async (id) => {
  const customer = await Customer.findById(id);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }
  return customer;
};

const updateById = async (id, updateBody) => {
  const customer = await getById(id);
  Object.assign(customer, updateBody);
  await customer.save();
  return customer;
};

const deleteById = async (id) => {
  const customer = await getById(id);
  await customer.remove();
  return customer;
};

const findCustomersByName = async (name) => {
  return Customer.find({ name: { $regex: name, $options: 'i' } }).exec();
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
  findCustomersByName,
};
