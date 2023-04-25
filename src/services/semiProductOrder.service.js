const httpStatus = require('http-status');
const { SemiProductOrder } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (semiProductOrder) => {
  return SemiProductOrder.create(semiProductOrder);
};

const query = async (filter, options) => {
  return SemiProductOrder.paginate(filter, options);
};

const getById = async (id) => {
  const semiProductOrder = await SemiProductOrder.findById(id);
  if (!semiProductOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Semi-Product Order not found');
  }
  return semiProductOrder;
};

const updateById = async (id, updateBody) => {
  const semiProductOrder = await getById(id);
  Object.assign(semiProductOrder, updateBody);
  await semiProductOrder.save();
  return semiProductOrder;
};

const deleteById = async (id) => {
  const semiProductOrder = await getById(id);
  await semiProductOrder.deleteOne();
  return semiProductOrder;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};
