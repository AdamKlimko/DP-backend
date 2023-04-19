const httpStatus = require('http-status');
const { ProductReservation, CustomerOrder, ProductOrder, Product } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (reservation) => {
  const productOrder = await ProductOrder.findById(reservation.productOrder);
  if (!productOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Order not found');
  }
  const product = await Product.findById(productOrder.product);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const customerOrder = await CustomerOrder.findById(reservation.customerOrder);
  if (!customerOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer Order not found');
  }

  const newProductReservation = await ProductReservation.create(reservation);

  productOrder.processed = true;
  await productOrder.save();

  product.storedQuantity -= reservation.reservedQuantity;
  await product.save();

  customerOrder.productReservations.push(newProductReservation);
  await customerOrder.save();

  return newProductReservation;
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
