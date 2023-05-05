const express = require('express');
const validate = require('../middlewares/validate');
const productOrderController = require('../controllers/productOrder.controller');
const productOrderValidation = require('../validations/productOrder.validation');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/:customerOrderId')
  .post(auth(), validate(productOrderValidation.createProductOrder), productOrderController.createProductOrder)
  .get(auth(), validate(productOrderValidation.getProductOrders), productOrderController.getProductOrders);

router
  .route('/:id')
  .patch(auth(), validate(productOrderValidation.updateProductOrder), productOrderController.updateProductOrder);

router
  .route('/:customerOrderId/:id')
  .delete(auth(), validate(productOrderValidation.getProductOrder), productOrderController.deleteProductOrder);

module.exports = router;
