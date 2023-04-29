const { ObjectId } = require('mongoose').Types;
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { semiProductReservationService } = require('../services');
const pick = require('../utils/pick');

const createSemiProductReservation = catchAsync(async (req, res) => {
  const semiProductReservation = await semiProductReservationService.create(req.body);
  res.status(httpStatus.CREATED).send(semiProductReservation);
});

const getSemiProductReservations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['productionOrder']);
  if (filter.productionOrder) {
    filter.productionOrder = ObjectId(filter.productionOrder);
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await semiProductReservationService.query(filter, options);
  res.send(result);
});

const getSemiProductReservation = catchAsync(async (req, res) => {
  const semiProductReservation = await semiProductReservationService.getById(req.params.id);
  res.send(semiProductReservation.toJSON());
});

const updateSemiProductReservation = catchAsync(async (req, res) => {
  const semiProductReservation = await semiProductReservationService.updateById(req.params.id, req.body);
  res.send(semiProductReservation);
});

const deleteSemiProductReservation = catchAsync(async (req, res) => {
  await semiProductReservationService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSemiProductReservation,
  getSemiProductReservations,
  getSemiProductReservation,
  updateSemiProductReservation,
  deleteSemiProductReservation,
};
