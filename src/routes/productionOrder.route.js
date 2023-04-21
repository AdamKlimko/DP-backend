const express = require('express');
const validate = require('../middlewares/validate');
const productionOrderController = require('../controllers/productionOrder.controller');
const productionOrderValidation = require('../validations/productionOrder.validation');

const router = express.Router();

router
  .route('/')
  .post(validate(productionOrderValidation.createProductionOrder), productionOrderController.createProductionOrder)
  .get(validate(productionOrderValidation.getProductionOrders), productionOrderController.getProductionOrders);

router
  .route('/:id')
  .get(validate(productionOrderValidation.getProductionOrder), productionOrderController.getProductionOrder)
  .patch(validate(productionOrderValidation.updateProductionOrder), productionOrderController.updateProductionOrder)
  .delete(validate(productionOrderValidation.getProductionOrder), productionOrderController.deleteProductionOrder);

module.exports = router;
