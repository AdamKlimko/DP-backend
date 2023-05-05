const express = require('express');
const validate = require('../middlewares/validate');
const productController = require('../controllers/product.controller');
const productValidation = require('../validations/product.validation');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(productValidation.createProduct), productController.createProduct)
  .get(auth(), validate(productValidation.getProducts), productController.getProducts);

router
  .route('/:id')
  .get(auth(), validate(productValidation.getProduct), productController.getProduct)
  .patch(auth(), validate(productValidation.updateProduct), productController.updateProduct)
  .delete(auth(), validate(productValidation.getProduct), productController.deleteProduct);

module.exports = router;
