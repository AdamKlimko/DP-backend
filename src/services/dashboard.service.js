const httpStatus = require('http-status');
const moment = require('moment');
const {
  CustomerOrder,
  Customer,
  Shipment,
  ProductionOrder,
  ProductReservation,
  SemiProductReservation,
  PurchaseOrder,
  PurchaseRequisition,
  Product,
  SemiProduct,
  ProductStorageItem,
  SemiProductStorageItem,
} = require('../models');
const ApiError = require('../utils/ApiError');

const getProductStorageCount = async (model) => {
  return model.aggregate([
    {
      $group: {
        _id: null,
        totalStored: { $sum: '$storedQuantity' },
      },
    },
  ]);
};

const getTotalCounts = async () => {
  const customerRelationsSummary = [
    { title: 'Customer Orders', value: await CustomerOrder.countDocuments() },
    { title: 'Customers', value: await Customer.countDocuments() },
    { title: 'Shipments', value: await Shipment.countDocuments() },
  ];
  const manufacturingSummary = [
    { title: 'Production Orders', value: await ProductionOrder.countDocuments() },
    { title: 'Product Reservations', value: await ProductReservation.countDocuments() },
    { title: 'Semi-Product Reservations', value: await SemiProductReservation.countDocuments() },
  ];
  const procurementSummary = [
    { title: 'Purchase Orders', value: await PurchaseOrder.countDocuments() },
    { title: 'Purchase Requisitions', value: await PurchaseRequisition.countDocuments() },
  ];

  const productStorage = await getProductStorageCount(ProductStorageItem);
  const semiProductStorage = await getProductStorageCount(SemiProductStorageItem);
  const storageSummary = {
    products: [
      { title: 'Products', value: await Product.countDocuments() },
      { title: 'Stored items', value: productStorage[0].totalStored },
    ],
    semiProducts: [
      { title: 'Semi-Products', value: await SemiProduct.countDocuments() },
      { title: 'Stored items', value: semiProductStorage[0].totalStored },
    ],
  };

  return {
    customerRelationsSummary,
    manufacturingSummary,
    procurementSummary,
    storageSummary,
  };
};

const getOrderStates = async (model) => {
  const states = ['planned', 'released', 'processed', 'closed'];
  const counts = {};

  await Promise.all(
    states.map((s) => {
      return model
        .countDocuments({ state: s })
        .exec()
        .then((count) => {
          counts[s] = count;
        })
        .catch(() => {
          throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to fetch order states');
        });
    })
  );

  const sortedCounts = [];
  states.forEach((s) => {
    sortedCounts.push({ name: s, value: counts[s] });
  });

  return sortedCounts;
};

const getDashboardData = async () => {
  const [customerOrderStates, productionOrderStates, purchaseOrderStates, purchaseRequisitionStates, totalCounts] =
    await Promise.all([
      getOrderStates(CustomerOrder),
      getOrderStates(ProductionOrder),
      getOrderStates(PurchaseOrder),
      getOrderStates(PurchaseRequisition),
      getTotalCounts(),
    ]);

  return {
    customerOrderStates,
    productionOrderStates,
    purchaseOrderStates,
    purchaseRequisitionStates,
    totalCounts,
  };
};

const getProfitBarChart = async (timeFrame) => {
  let groupBy;
  let dateFormatFrom;
  let dateFormatTo;

  if (timeFrame === 'week') {
    groupBy = { $week: '$orderDate' };
    dateFormatFrom = 'YYYY-[W]WW';
  } else if (timeFrame === 'month') {
    groupBy = { $month: '$orderDate' };
    dateFormatFrom = 'MM';
    dateFormatTo = 'MMM';
  } else if (timeFrame === 'year') {
    groupBy = { $year: '$orderDate' };
    dateFormatFrom = 'YYYY';
    dateFormatTo = 'YYYY';
  } else {
    throw new Error('Invalid time frame');
  }

  const results = await CustomerOrder.aggregate([
    {
      $group: {
        _id: groupBy,
        totalProfit: { $sum: '$orderProfit' },
        totalPrice: { $sum: '$price' },
        totalCost: { $sum: '$orderCost' },
      },
    },
  ]);

  const formattedResults = results.map((r) => ({
    date: r._id,
    totalProfit: r.totalProfit,
    totalPrice: r.totalPrice,
    totalCost: r.totalCost,
  }));

  formattedResults.sort((a, b) => a.date - b.date);

  const chartLabel = formattedResults.map((r) => moment(r.date, dateFormatFrom).format(dateFormatTo));

  const data = [
    formattedResults.map((r) => r.totalPrice),
    formattedResults.map((r) => r.totalCost),
    formattedResults.map((r) => r.totalProfit),
  ];

  return { chartLabel, data };
};

function normalizeArrays(arrays) {
  const uniqueIds = new Set();
  arrays.forEach((array) => {
    array.forEach((item) => {
      uniqueIds.add(item._id);
    });
  });

  return arrays.map((array) => {
    const arrayItemsById = new Map(array.map((item) => [item._id, item]));
    return Array.from(uniqueIds).map((id) => arrayItemsById.get(id) || { _id: id, count: 0 });
  });
}

const getCustomerOrderChart = async (period) => {
  let groupBy;
  let groupByCO;
  let dateFormatFrom;
  let match;
  let matchCO;

  let dateFormatTo;
  if (period === 'week') {
    groupBy = { $week: '$createdAt' };
    groupByCO = { $week: '$orderDate' };
    match = { createdAt: { $gte: moment().subtract(1, 'month').startOf('month').toDate() } };
    matchCO = { orderDate: { $gte: moment().subtract(1, 'month').startOf('month').toDate() } };
    dateFormatFrom = 'YYYY-[W]WW';
    dateFormatTo = 'YYYY-[W]WW';
  } else if (period === 'month') {
    groupBy = { $month: '$createdAt' };
    groupByCO = { $month: '$orderDate' };
    match = { createdAt: { $gte: moment().subtract(1, 'year').startOf('year').toDate() } };
    matchCO = { orderDate: { $gte: moment().subtract(1, 'year').startOf('year').toDate() } };
    dateFormatFrom = 'MM';
    dateFormatTo = 'MMM';
  } else if (period === 'year') {
    groupBy = { $year: '$createdAt' };
    groupByCO = { $year: '$orderDate' };
    match = { createdAt: { $gte: new Date(null) } };
    matchCO = { orderDate: { $gte: new Date(null) } };
    dateFormatFrom = 'YYYY';
    dateFormatTo = 'YYYY';
  } else {
    throw new Error('Invalid period');
  }

  let results = await Promise.all([
    CustomerOrder.aggregate([
      {
        $match: matchCO,
      },
      {
        $group: {
          _id: groupByCO,
          count: { $sum: 1 },
        },
      },
    ]),
    ProductionOrder.aggregate([
      {
        $match: match,
      },
      {
        $group: {
          _id: groupBy,
          count: { $sum: 1 },
        },
      },
    ]),
    PurchaseOrder.aggregate([
      {
        $match: match,
      },
      {
        $group: {
          _id: groupBy,
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  results = normalizeArrays(results);
  const counts = {
    customerOrder: results[0],
    productionOrder: results[1],
    purchaseOrder: results[2],
  };

  const formattedCounts = {};

  Object.entries(counts).forEach(([model, result]) => {
    formattedCounts[model] = result.map((r) => ({
      date: r._id,
      count: r.count,
    }));

    formattedCounts[model].sort((a, b) => a.date - b.date);
  });

  const chartLabel = formattedCounts.customerOrder.map((r) => moment(r.date, dateFormatFrom).format(dateFormatTo));

  const linesData = [
    formattedCounts.customerOrder.map((r) => r.count),
    formattedCounts.productionOrder.map((r) => r.count),
    formattedCounts.purchaseOrder.map((r) => r.count),
  ];

  return { chartLabel, linesData };
};

const aggregateStorageData = async (model) => {
  return model.aggregate([
    {
      $group: {
        _id: '$location',
        totalStored: { $sum: '$storedQuantity' },
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $project: {
        _id: 0,
        location: '$_id',
        totalStored: 1,
        count: 1,
      },
    },
  ]);
};

const getStorageData = async () => {
  const [productStorage, semiProductStorage] = await Promise.all([
    aggregateStorageData(ProductStorageItem),
    aggregateStorageData(SemiProductStorageItem),
  ]);

  return {
    productStorage,
    semiProductStorage,
  };
};

module.exports = {
  getDashboardData,
  getProfitBarChart,
  getCustomerOrderChart,
  getStorageData,
};
