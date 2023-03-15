const { PurchaseRequisition } = require('../models');

const create = async (purchaseRequisition) => {
  return PurchaseRequisition.create(purchaseRequisition);
};

const query = async (filter, options) => {
  return PurchaseRequisition.paginate(filter, options);
};

module.exports = {
  create,
  query,
};
