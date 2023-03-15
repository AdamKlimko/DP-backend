const express = require('express');
const { purchaseRequisitionController } = require('../controllers');

const router = express.Router();

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .post(purchaseRequisitionController.createPurchaseRequisition)
  .get(purchaseRequisitionController.getPurchaseRequisitions);

module.exports = router;
