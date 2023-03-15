const { Supplier } = require('../models');

const create = async (purchaseOrder) => {
  return Supplier.create(purchaseOrder);
};

const query = async (filter, options) => {
  return Supplier.paginate(filter, options);
};

module.exports = {
  create,
  query,
};
