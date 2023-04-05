const express = require('express');
const validate = require('../middlewares/validate');
const customerOrderController = require('../controllers/customerOrder.controller');
const customerOrderValidation = require('../validations/customerOrder.validation');

const router = express.Router();

router
  .route('/')
  .post(validate(customerOrderValidation.createCustomerOrder), customerOrderController.createCustomerOrder)
  .get(validate(customerOrderValidation.getCustomerOrders), customerOrderController.getCustomerOrders);

router
  .route('/:id')
  .get(validate(customerOrderValidation.getCustomerOrder), customerOrderController.getCustomerOrder)
  .patch(validate(customerOrderValidation.updateCustomerOrder), customerOrderController.updateCustomerOrder)
  .delete(validate(customerOrderValidation.getCustomerOrder), customerOrderController.deleteCustomerOrder);

module.exports = router;
