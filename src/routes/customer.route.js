const express = require('express');
const validate = require('../middlewares/validate');
const customerController = require('../controllers/customer.controller');
const customerValidation = require('../validations/customer.validation');

const router = express.Router();

router
  .route('/')
  .post(validate(customerValidation.createCustomer), customerController.createCustomer)
  .get(validate(customerValidation.getCustomers), customerController.getCustomers);

router
  .route('/:id')
  .get(validate(customerValidation.getCustomer), customerController.getCustomer)
  .patch(validate(customerValidation.updateCustomer), customerController.updateCustomer)
  .delete(validate(customerValidation.getCustomer), customerController.deleteCustomer);

module.exports = router;
