const express = require('express');
const validate = require('../middlewares/validate');
const bomItemController = require('../controllers/bomItem.controller');
const bomItemValidation = require('../validations/bomItem.validation');

const router = express.Router();

router
  .route('/:productId')
  .get(validate(bomItemValidation.getBomItem), bomItemController.getBomItems)
  .post(validate(bomItemValidation.createBomItem), bomItemController.createBomItem)
  .patch(validate(bomItemValidation.updateBomItem), bomItemController.updateBomItem);

router
  .route('/:productId/:id')
  .get(validate(bomItemValidation.getBomItem), bomItemController.getBomItem)
  .delete(validate(bomItemValidation.getBomItem), bomItemController.deleteBomItem);

module.exports = router;
