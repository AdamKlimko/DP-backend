const express = require('express');
const validate = require('../middlewares/validate');
const semiProductStorageItemController = require('../controllers/semiProductStorageItem.controller');
const semiProductStorageItemValidation = require('../validations/semiProductStorageItem.validation');

const router = express.Router();

router
  .route('/')
  .post(
    validate(semiProductStorageItemValidation.createSemiProductStorageItem),
    semiProductStorageItemController.createSemiProductStorageItem
  )
  .get(
    validate(semiProductStorageItemValidation.getSemiProductStorageItems),
    semiProductStorageItemController.getSemiProductStorageItems
  );

router
  .route('/:id')
  .get(
    validate(semiProductStorageItemValidation.getSemiProductStorageItem),
    semiProductStorageItemController.getSemiProductStorageItem
  )
  .patch(
    validate(semiProductStorageItemValidation.updateSemiProductStorageItem),
    semiProductStorageItemController.updateSemiProductStorageItem
  )
  .delete(
    validate(semiProductStorageItemValidation.getSemiProductStorageItem),
    semiProductStorageItemController.deleteSemiProductStorageItem
  );

module.exports = router;
