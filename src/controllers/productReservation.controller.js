const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { productReservationService } = require('../services');
const pick = require('../utils/pick');

const createProductReservation = catchAsync(async (req, res) => {
  const productReservation = await productReservationService.create(req.body);
  res.status(httpStatus.CREATED).send(productReservation);
});

const getProductReservations = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await productReservationService.query(filter, options);
  res.send(result);
});

const getProductReservation = catchAsync(async (req, res) => {
  const productReservation = await productReservationService.getById(req.params.id);
  res.send(productReservation.toJSON());
});

const updateProductReservation = catchAsync(async (req, res) => {
  const productReservation = await productReservationService.updateById(req.params.id, req.body);
  res.send(productReservation);
});

const deleteProductReservation = catchAsync(async (req, res) => {
  await productReservationService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProductReservation,
  getProductReservations,
  getProductReservation,
  updateProductReservation,
  deleteProductReservation,
};
