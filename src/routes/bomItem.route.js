const express = require('express');
const validate = require('../middlewares/validate');
const bomItemController = require('../controllers/bomItem.controller');
const bomItemValidation = require('../validations/bomItem.validation');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/:productId')
  .get(auth(), validate(bomItemValidation.getBomItem), bomItemController.getBomItems)
  .post(auth(), validate(bomItemValidation.createBomItem), bomItemController.createBomItem)
  .patch(auth(), validate(bomItemValidation.updateBomItem), bomItemController.updateBomItem);

router
  .route('/:productId/:id')
  .get(auth(), validate(bomItemValidation.getBomItem), bomItemController.getBomItem)
  .delete(auth(), validate(bomItemValidation.getBomItem), bomItemController.deleteBomItem);

module.exports = router;
