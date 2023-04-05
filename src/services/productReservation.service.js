const httpStatus = require('http-status');
const { ProductReservation } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (reservation) => {
  return ProductReservation.create(reservation);
};

const query = async (filter, options) => {
  return ProductReservation.paginate(filter, options);
};

const getById = async (id) => {
  const reservation = await ProductReservation.findById(id);
  if (!reservation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product reservation not found');
  }
  return reservation;
};

const updateById = async (id, updateBody) => {
  const reservation = await getById(id);
  Object.assign(reservation, updateBody);
  await reservation.save();
  return reservation;
};

const deleteById = async (id) => {
  const reservation = await getById(id);
  await reservation.remove();
  return reservation;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};
