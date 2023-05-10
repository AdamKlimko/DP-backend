const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { dashboardController } = require('../controllers');
const { dashboardValidation } = require('../validations');

const router = express.Router();

router.route('/').get(auth(), dashboardController.getDashboardData);
router.route('/storage').get(auth(), dashboardController.getStorageData);
router
  .route('/profitBarChart/:timeFrame')
  .get(auth(), validate(dashboardValidation.getProfitBarChart), dashboardController.getProfitBarChart);
router
  .route('/customerOrderChart/:timeFrame')
  .get(auth(), validate(dashboardValidation.getOrderBarChart), dashboardController.getCustomerOrderChart);

module.exports = router;
