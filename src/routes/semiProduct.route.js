const express = require('express');
const validate = require('../middlewares/validate');
const semiProductController = require('../controllers/semiProduct.controller');
const semiProductValidation = require('../validations/semiProduct.validation');

const router = express.Router();

router
  .route('/')
  .post(validate(semiProductValidation.createSemiProduct), semiProductController.createSemiProduct)
  .get(validate(semiProductValidation.getSemiProducts), semiProductController.getSemiProducts);

router
  .route('/:id')
  .get(validate(semiProductValidation.getSemiProduct), semiProductController.getSemiProduct)
  .patch(validate(semiProductValidation.updateSemiProduct), semiProductController.updateSemiProduct)
  .delete(validate(semiProductValidation.getSemiProduct), semiProductController.deleteSemiProduct);

module.exports = router;
