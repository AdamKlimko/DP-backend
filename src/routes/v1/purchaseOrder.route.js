const express = require('express');
const { purchaseOrderController } = require('../../controllers');

const router = express.Router();

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .post(purchaseOrderController.createPurchaseOrder)
  .get(purchaseOrderController.getPurchaseOrders);

router
  .route('/:id')
  .get(purchaseOrderController.getPurchaseOrder)
  .patch(purchaseOrderController.updatePurchaseOrder)
  .delete(purchaseOrderController.deletePurchaseOrder);

module.exports = router;
