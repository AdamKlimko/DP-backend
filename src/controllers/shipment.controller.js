const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { shipmentService, customerService } = require('../services');
const pick = require('../utils/pick');

const createShipment = catchAsync(async (req, res) => {
  const shipment = await shipmentService.create(req.body);
  res.status(httpStatus.CREATED).send(shipment);
});

const getShipments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['customer']);
  if (filter.customer) {
    const customers = await customerService.findCustomersByName(filter.customer);
    const customerIds = customers.map((customer) => customer.id);
    filter.customer = { $in: customerIds };
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await shipmentService.query(filter, options);
  res.send(result);
});

const getShipment = catchAsync(async (req, res) => {
  const shipment = await shipmentService.getById(req.params.id);
  res.send(shipment.toJSON());
});

const updateShipment = catchAsync(async (req, res) => {
  const shipment = await shipmentService.updateById(req.params.id, req.body);
  res.send(shipment);
});

const deleteShipment = catchAsync(async (req, res) => {
  await shipmentService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createShipment,
  getShipments,
  getShipment,
  updateShipment,
  deleteShipment,
};
