const httpStatus = require('http-status');
const { ProductionOrder, Product, SemiProductOrder, ProductOrder, SemiProductReservation } = require('../models');
const ApiError = require('../utils/ApiError');
const { state } = require('../config/state');

const create = async (productionOrder) => {
  const productOrder = await ProductOrder.findById(productionOrder.productOrder);

  productOrder.product = await Product.findById(productOrder.product).populate('billOfMaterials');

  const newProductionOrder = await ProductionOrder.create(productionOrder);
  productOrder.product.billOfMaterials.forEach((bomItem) => {
    const semiProductOrder = new SemiProductOrder({
      productionOrder: newProductionOrder.id,
      bomItem: bomItem.id,
      state: state.PLANNED,
      quantity: bomItem.quantity * productOrder.quantity,
    });
    SemiProductOrder.create(semiProductOrder);
  });
  return newProductionOrder;
};

const query = async (filter, options) => {
  return ProductionOrder.paginate(filter, options);
};

const getById = async (id) => {
  const productionOrder = await ProductionOrder.findById(id).populate('productOrder');
  if (!productionOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Production Order not found');
  }
  productionOrder.productOrder.product = await Product.findById(productionOrder.productOrder.product);
  return productionOrder;
};

const getSemiProductOrders = async (filter, options) => {
  const semiProductOrders = await SemiProductOrder.paginate(filter, options);
  return SemiProductOrder.populate(semiProductOrders.results, {
    path: 'bomItem',
    populate: { path: 'semiProduct', model: 'semi-product' },
  }).then((results) => {
    semiProductOrders.results = results;
    return semiProductOrders;
  });
};

const getSemiProductReservations = async (filter, options) => {
  return SemiProductReservation.paginate(filter, options);
};

const updateById = async (id, updateBody) => {
  const productionOrder = await getById(id);
  Object.assign(productionOrder, updateBody);
  await productionOrder.save();
  return productionOrder;
};

const deleteById = async (id) => {
  const productionOrder = await getById(id);
  await productionOrder.deleteOne();
  return productionOrder;
};

module.exports = {
  create,
  query,
  getById,
  updateById,
  deleteById,
  getSemiProductOrders,
  getSemiProductReservations,
};
