const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const purchaseOrderRoute = require('./purchaseOrder.route');
const purchaseRequisitionRoute = require('./purchaseRequisition.route');
const customerRoute = require('./customer.route');
const customerOrderRoute = require('./customerOrder.route');
const productRoute = require('./product.route');
const productReservationRoute = require('./productReservation.route');
const productOrderRoute = require('./productOrder.route');
const productionOrderRoute = require('./productionOrder.route');
const supplierRoute = require('./supplier.route');
const shipmentRoute = require('./shipment.route');
const semiProductRoute = require('./semiProduct.route');
const bomItemRoute = require('./bomItem.route');
const config = require('../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/purchaseOrders',
    route: purchaseOrderRoute,
  },
  {
    path: '/suppliers',
    route: supplierRoute,
  },
  {
    path: '/shipments',
    route: shipmentRoute,
  },
  {
    path: '/semiProducts',
    route: semiProductRoute,
  },
  {
    path: '/bomItems',
    route: bomItemRoute,
  },
  {
    path: '/purchaseRequisitions',
    route: purchaseRequisitionRoute,
  },
  {
    path: '/customers',
    route: customerRoute,
  },
  {
    path: '/customerOrders',
    route: customerOrderRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/productReservations',
    route: productReservationRoute,
  },
  {
    path: '/productOrders',
    route: productOrderRoute,
  },
  {
    path: '/productionOrders',
    route: productionOrderRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
