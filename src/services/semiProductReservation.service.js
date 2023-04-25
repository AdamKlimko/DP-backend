const httpStatus = require('http-status');
const { SemiProductReservation } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (semiProductReservation) => {
  return SemiProductReservation.create(semiProductReservation);
};

const query = async (filter, options) => {
  return SemiProductReservation.paginate(filter, options);
};

const getById = async (id) => {
  const semiProductReservation = await SemiProductReservation.findById(id);
  if (!semiProductReservation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Semi-Product Reservation not found');
  }
  return semiProductReservation;
};

const updateById = async (id, updateBody) => {
  const semiProductReservation = await getById(id);
  Object.assign(semiProductReservation, updateBody);
  await semiProductReservation.save();
  return semiProductReservation;
};

const deleteById = async (id) => {
  const semiProductReservation = await getById(id);
  await semiProductReservation.remove();
  return semiProductReservation;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};
