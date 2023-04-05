const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const purchaseOrderRoute = require('./purchaseOrder.route');
const purchaseRequisitionRoute = require('./purchaseRequisition.route');
const customerOrderRoute = require('./customerOrder.route');
const supplierRoute = require('./supplier.route');
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
    path: '/purchaseRequisitions',
    route: purchaseRequisitionRoute,
  },
  {
    path: '/customerOrders',
    route: customerOrderRoute,
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
