const httpStatus = require('http-status');
const { SemiProductReservation, SemiProductStorageItem, SemiProduct, SemiProductOrder } = require('../models');
const ApiError = require('../utils/ApiError');
const { state } = require('../config/state');

const create = async (semiProductReservation) => {
  const semiProductStorageItem = await SemiProductStorageItem.findById(semiProductReservation.semiProductStorageItem);
  // semiProductStorageItem - quantity
  await SemiProductStorageItem.updateOne(
    { _id: semiProductStorageItem.id },
    { $inc: { storedQuantity: -semiProductReservation.reservedQuantity } }
  );
  // semiProduct - quantity
  await SemiProduct.updateOne(
    { _id: semiProductStorageItem.semiProduct },
    { $inc: { storedQuantity: -semiProductReservation.reservedQuantity } }
  );
  // semiProductOrder = processed
  await SemiProductOrder.updateOne({ _id: semiProductReservation.semiProductOrder }, { state: state.PROCESSED });
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
