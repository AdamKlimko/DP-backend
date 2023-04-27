const httpStatus = require('http-status');
const { PurchaseRequisition, PurchaseOrder } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (purchaseRequisition) => {
  const newPurchaseRequisition = purchaseRequisition;
  newPurchaseRequisition.price = purchaseRequisition.unitPrice * purchaseRequisition.quantity;
  return PurchaseRequisition.create(newPurchaseRequisition);
};

const query = async (filter, options) => {
  return PurchaseRequisition.paginate(filter, options);
};

const getById = async (id) => {
  const purchaseRequisition = await PurchaseRequisition.findById(id);
  if (!purchaseRequisition) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Purchase Requisition not found');
  }
  return purchaseRequisition;
};

const updateById = async (id, updateBody) => {
  const purchaseRequisition = await getById(id);
  Object.assign(purchaseRequisition, updateBody);
  await purchaseRequisition.save();

  if (purchaseRequisition.purchaseOrder !== undefined) {
    const purchaseRequisitions = await PurchaseRequisition.find({ purchaseOrder: purchaseRequisition.purchaseOrder });
    let price = 0;
    purchaseRequisitions.forEach((pr) => {
      price += pr.price;
    });
    const purchaseOrder = await PurchaseOrder.findById(purchaseRequisition.purchaseOrder);
    purchaseOrder.price = price;
    await purchaseOrder.save();
  }

  return purchaseRequisition;
};

const deleteById = async (id) => {
  const purchaseRequisition = await getById(id);
  await purchaseRequisition.deleteOne();
  return purchaseRequisition;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};
