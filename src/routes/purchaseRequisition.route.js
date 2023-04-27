const express = require('express');
const validate = require('../middlewares/validate');
const purchaseRequisitionController = require('../controllers/purchaseRequisition.controller');
const purchaseRequisitionValidation = require('../validations/purchaseRequisition.validation');

const router = express.Router();

router
  .route('/')
  .post(
    validate(purchaseRequisitionValidation.createPurchaseRequisition),
    purchaseRequisitionController.createPurchaseRequisition
  )
  .get(
    validate(purchaseRequisitionValidation.getPurchaseRequisitions),
    purchaseRequisitionController.getPurchaseRequisitions
  );

router
  .route('/:id')
  .get(validate(purchaseRequisitionValidation.getPurchaseRequisition), purchaseRequisitionController.getPurchaseRequisition)
  .patch(
    validate(purchaseRequisitionValidation.updatePurchaseRequisition),
    purchaseRequisitionController.updatePurchaseRequisition
  )
  .delete(
    validate(purchaseRequisitionValidation.getPurchaseRequisition),
    purchaseRequisitionController.deletePurchaseRequisition
  );

module.exports = router;
