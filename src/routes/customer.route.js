const express = require('express');
const validate = require('../middlewares/validate');
const customerController = require('../controllers/customer.controller');
const customerValidation = require('../validations/customer.validation');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(customerValidation.createCustomer), customerController.createCustomer)
  .get(auth(), validate(customerValidation.getCustomers), customerController.getCustomers);

router
  .route('/:id')
  .get(auth(), validate(customerValidation.getCustomer), customerController.getCustomer)
  .patch(auth(), validate(customerValidation.updateCustomer), customerController.updateCustomer)
  .delete(auth(), validate(customerValidation.getCustomer), customerController.deleteCustomer);

module.exports = router;
