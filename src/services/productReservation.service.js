const httpStatus = require('http-status');
const { ProductReservation, ProductOrder, Product, ProductStorageItem, CustomerOrder } = require('../models');
const ApiError = require('../utils/ApiError');
const { state } = require('../config/state');

const calculateCustomerOrderCost = async (customerOrderId) => {
  const productReservations = await ProductReservation.find({ customerOrder: customerOrderId }).populate({
    path: 'productStorageItem',
    populate: { path: 'productionOrder', model: 'production-order' },
  });

  let orderCost = 0;
  productReservations.forEach((pr) => {
    orderCost += pr.productStorageItem.productionOrder.cost;
  });

  return orderCost;
};

const create = async (productReservation) => {
  // productOrder state = processed
  const productOrder = await ProductOrder.findById(productReservation.productOrder);
  productOrder.state = state.PROCESSED;
  await productOrder.save();

  // product - storedQuantity
  await Product.updateOne({ _id: productOrder.product }, { $inc: { storedQuantity: -productReservation.reservedQuantity } });

  // productStorageItem - storedQuantity
  await ProductStorageItem.updateOne(
    { _id: productReservation.productStorageItem },
    { $inc: { storedQuantity: -productReservation.reservedQuantity } }
  );

  const newProductReservation = await ProductReservation.create(productReservation);

  // update CustomerOrder cost
  const orderCost = await calculateCustomerOrderCost(productReservation.customerOrder);
  const customerOrder = await CustomerOrder.findById(productReservation.customerOrder);
  customerOrder.orderCost = orderCost;
  customerOrder.orderProfit = customerOrder.price - orderCost;
  await customerOrder.save();

  return newProductReservation;
};

const query = async (filter, options) => {
  const productReservations = await ProductReservation.paginate(filter, options);
  return ProductReservation.populate(productReservations.results, {
    path: 'productOrder',
    populate: { path: 'product', model: 'product' },
  }).then((results) => {
    productReservations.results = results;
    return productReservations;
  });
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
