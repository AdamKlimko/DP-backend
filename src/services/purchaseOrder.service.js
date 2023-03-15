const httpStatus = require('http-status');
const { PurchaseOrder } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (purchaseOrder) => {
  return PurchaseOrder.create(purchaseOrder);
};

const query = async (filter, options) => {
  // eslint-disable-next-line no-console
  console.log(options);
  return PurchaseOrder.paginate(filter, options);
};

const getById = async (id) => {
  const purchaseOrder = await PurchaseOrder.findById(id);
  if (!purchaseOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Purchase Order not found');
  }
  return purchaseOrder;
};

const updateById = async (id, updateBody) => {
  const purchaseOrder = await getById(id);
  Object.assign(purchaseOrder, updateBody);
  await purchaseOrder.save();
  return purchaseOrder;
};

const deleteById = async (id) => {
  const purchaseOrder = await getById(id);
  await purchaseOrder.remove();
  return purchaseOrder;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};
