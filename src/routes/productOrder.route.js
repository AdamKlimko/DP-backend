const express = require('express');
const validate = require('../middlewares/validate');
const productOrderController = require('../controllers/productOrder.controller');
const productOrderValidation = require('../validations/productOrder.validation');

const router = express.Router();

router
  .route('/:customerOrderId')
  .post(validate(productOrderValidation.createProductOrder), productOrderController.createProductOrder)
  .get(validate(productOrderValidation.getProductOrders), productOrderController.getProductOrders);

router
  .route('/:id')
  .get(validate(productOrderValidation.getProductOrder), productOrderController.getProductOrder)
  .patch(validate(productOrderValidation.updateProductOrder), productOrderController.updateProductOrder);

router
  .route('/:customerOrderId/:id')
  .delete(validate(productOrderValidation.getProductOrder), productOrderController.deleteProductOrder);

module.exports = router;
