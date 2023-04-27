const httpStatus = require('http-status');
const { Shipment } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (shipment) => {
  return Shipment.create(shipment);
};

const query = async (filter, options) => {
  return Shipment.paginate(filter, options);
};

const getById = async (id) => {
  const shipment = await Shipment.findById(id);
  if (!shipment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shipment not found');
  }
  return shipment;
};

const updateById = async (id, updateBody) => {
  const shipment = await getById(id);
  Object.assign(shipment, updateBody);
  await shipment.save();
  return shipment;
};

const deleteById = async (id) => {
  const shipment = await getById(id);
  await shipment.deleteOne();
  return shipment;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};
