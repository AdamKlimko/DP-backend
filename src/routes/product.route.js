const express = require('express');
const validate = require('../middlewares/validate');
const productController = require('../controllers/product.controller');
const productValidation = require('../validations/product.validation');

const router = express.Router();

router
  .route('/')
  .post(validate(productValidation.createProduct), productController.createProduct)
  .get(validate(productValidation.getProducts), productController.getProducts);

router
  .route('/:id')
  .get(validate(productValidation.getProduct), productController.getProduct)
  .patch(validate(productValidation.updateProduct), productController.updateProduct)
  .delete(validate(productValidation.getProduct), productController.deleteProduct);

module.exports = router;
