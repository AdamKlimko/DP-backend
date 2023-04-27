const httpStatus = require('http-status');
const { PurchaseOrder, PurchaseRequisition, SemiProductStorageItem, SemiProduct } = require('../models');
const ApiError = require('../utils/ApiError');
const { state } = require('../config/state');

const create = async (purchaseOrder) => {
  const newPurchaseOrder = purchaseOrder;
  newPurchaseOrder.price = 0;
  return PurchaseOrder.create(newPurchaseOrder);
};

const query = async (filter, options) => {
  return PurchaseOrder.paginate(filter, options);
};

const getById = async (id) => {
  const purchaseOrder = await PurchaseOrder.findById(id);
  if (!purchaseOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Purchase Order not found');
  }
  return purchaseOrder;
};

const updateById = async (id, updateBody) => {
  const purchaseOrder = await getById(id);
  if (updateBody.state === state.RELEASED) {
    const purchaseRequisitions = await PurchaseRequisition.find({ purchaseOrder: purchaseOrder.id });
    await Promise.all(
      purchaseRequisitions.map((pr) => {
        return PurchaseRequisition.updateOne({ _id: pr.id }, { state: state.RELEASED });
      })
    );
  }

  Object.assign(purchaseOrder, updateBody);
  await purchaseOrder.save();
  return purchaseOrder;
};

const deleteById = async (id) => {
  const purchaseOrder = await getById(id);
  await purchaseOrder.deleteOne();
  return purchaseOrder;
};

const processById = async (id, body) => {
  const purchaseOrder = await getById(id);
  const purchaseRequisitions = await PurchaseRequisition.find({ purchaseOrder: purchaseOrder.id }).populate('semiProduct');
  await Promise.all(
    purchaseRequisitions.map((pr) => {
      const semiProductStorageItem = new SemiProductStorageItem({
        semiProduct: pr.semiProduct.id,
        purchaseRequisition: pr.id,
        storedQuantity: pr.quantity,
        location: body.location,
      });
      return Promise.all([
        SemiProductStorageItem.create(semiProductStorageItem),
        SemiProduct.updateOne({ _id: pr.semiProduct.id }, { $inc: { storedQuantity: pr.quantity } }),
        PurchaseRequisition.updateOne({ _id: pr.id }, { state: state.PROCESSED }),
      ]);
    })
  );
  purchaseOrder.state = state.PROCESSED;
  await purchaseOrder.save();
  return purchaseOrder;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
  processById,
};
