const express = require('express');
const validate = require('../middlewares/validate');
const productionOrderController = require('../controllers/productionOrder.controller');
const productionOrderValidation = require('../validations/productionOrder.validation');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(productionOrderValidation.createProductionOrder), productionOrderController.createProductionOrder)
  .get(auth(), validate(productionOrderValidation.getProductionOrders), productionOrderController.getProductionOrders);

router
  .route('/:id')
  .get(auth(), validate(productionOrderValidation.getProductionOrder), productionOrderController.getProductionOrder)
  .patch(auth(), validate(productionOrderValidation.updateProductionOrder), productionOrderController.updateProductionOrder)
  .delete(auth(), validate(productionOrderValidation.getProductionOrder), productionOrderController.deleteProductionOrder);

router
  .route('/:id/semiProductOrders')
  .get(auth(), validate(productionOrderValidation.getProductionOrder), productionOrderController.getSemiProductOrders);

router
  .route('/:id/semiProductReservations')
  .get(auth(), validate(productionOrderValidation.getProductionOrder), productionOrderController.getSemiProductReservations);

module.exports = router;
