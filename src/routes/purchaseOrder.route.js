const express = require('express');
const validate = require('../middlewares/validate');
const purchaseOrderController = require('../controllers/purchaseOrder.controller');
const purchaseOrderValidation = require('../validations/purchaseOrder.validation');

const router = express.Router();

router
  .route('/')
  .post(validate(purchaseOrderValidation.createPurchaseOrder), purchaseOrderController.createPurchaseOrder)
  .get(validate(purchaseOrderValidation.getPurchaseOrders), purchaseOrderController.getPurchaseOrders);

router
  .route('/:id')
  .get(validate(purchaseOrderValidation.getPurchaseOrder), purchaseOrderController.getPurchaseOrder)
  .patch(validate(purchaseOrderValidation.updatePurchaseOrder), purchaseOrderController.updatePurchaseOrder)
  .delete(validate(purchaseOrderValidation.getPurchaseOrder), purchaseOrderController.deletePurchaseOrder);

router
  .route('/:id/process')
  .patch(validate(purchaseOrderValidation.processPurchaseOrder), purchaseOrderController.processPurchaseOrder);

module.exports = router;
