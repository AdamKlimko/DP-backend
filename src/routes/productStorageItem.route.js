const express = require('express');
const validate = require('../middlewares/validate');
const productStorageItemController = require('../controllers/productStorageItem.controller');
const productStorageItemValidation = require('../validations/productStorageItem.validation');

const router = express.Router();

router
  .route('/')
  .post(
    validate(productStorageItemValidation.createProductStorageItem),
    productStorageItemController.createProductStorageItem
  )
  .get(validate(productStorageItemValidation.getProductStorageItems), productStorageItemController.getProductStorageItems);

router
  .route('/:id')
  .get(validate(productStorageItemValidation.getProductStorageItem), productStorageItemController.getProductStorageItem)
  .patch(
    validate(productStorageItemValidation.updateProductStorageItem),
    productStorageItemController.updateProductStorageItem
  )
  .delete(
    validate(productStorageItemValidation.getProductStorageItem),
    productStorageItemController.deleteProductStorageItem
  );

module.exports = router;
