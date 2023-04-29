const httpStatus = require('http-status');
const {
  Shipment,
  PurchaseRequisition,
  CustomerOrder,
  ProductOrder,
  ProductionOrder,
  SemiProductOrder,
} = require('../models');
const ApiError = require('../utils/ApiError');
const { state } = require('../config/state');

const create = async (shipment) => {
  return Shipment.create(shipment);
};

const query = async (filter, options) => {
  return Shipment.paginate(filter, options);
};

const getById = async (id) => {
  const shipment = await Shipment.findById(id).populate('customer').populate('customerOrders');
  if (!shipment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shipment not found');
  }
  return shipment;
};

const updateById = async (id, updateBody) => {
  const shipment = await getById(id);

  if (updateBody.state === state.CLOSED) {
    await Promise.all(
      shipment.customerOrders.map(async (customerOrder) => {
        const productionOrders = await ProductionOrder.find({ productionSeq: customerOrder.productionSeq });
        return Promise.all([
          CustomerOrder.updateOne({ _id: customerOrder.id }, { state: state.CLOSED }),
          ProductOrder.updateMany({ customerOrder: customerOrder.id }, { state: state.CLOSED }),
          ProductionOrder.updateMany({ productionSeq: customerOrder.productionSeq }, { state: state.CLOSED }),
          productionOrders.map(async (productionOrder) => {
            await SemiProductOrder.updateMany({ productionOrder: productionOrder.id }, { state: state.CLOSED });
            await PurchaseRequisition.updateMany({ productionOrder: productionOrder.id }, { state: state.CLOSED });
          }),
        ]);
      })
    );
  }

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
