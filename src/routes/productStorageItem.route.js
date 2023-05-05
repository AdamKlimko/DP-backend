const express = require('express');
const validate = require('../middlewares/validate');
const productStorageItemController = require('../controllers/productStorageItem.controller');
const productStorageItemValidation = require('../validations/productStorageItem.validation');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(
    auth(),
    validate(productStorageItemValidation.createProductStorageItem),
    productStorageItemController.createProductStorageItem
  )
  .get(
    auth(),
    validate(productStorageItemValidation.getProductStorageItems),
    productStorageItemController.getProductStorageItems
  );

router
  .route('/:id')
  .get(
    auth(),
    validate(productStorageItemValidation.getProductStorageItem),
    productStorageItemController.getProductStorageItem
  )
  .patch(
    auth(),
    validate(productStorageItemValidation.updateProductStorageItem),
    productStorageItemController.updateProductStorageItem
  )
  .delete(
    auth(),
    validate(productStorageItemValidation.getProductStorageItem),
    productStorageItemController.deleteProductStorageItem
  );

module.exports = router;
