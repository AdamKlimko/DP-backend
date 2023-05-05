const express = require('express');
const validate = require('../middlewares/validate');
const customerOrderController = require('../controllers/customerOrder.controller');
const customerOrderValidation = require('../validations/customerOrder.validation');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(customerOrderValidation.createCustomerOrder), customerOrderController.createCustomerOrder)
  .get(auth(), validate(customerOrderValidation.getCustomerOrders), customerOrderController.getCustomerOrders);

router
  .route('/:id')
  .get(auth(), validate(customerOrderValidation.getCustomerOrder), customerOrderController.getCustomerOrder)
  .patch(auth(), validate(customerOrderValidation.updateCustomerOrder), customerOrderController.updateCustomerOrder)
  .delete(auth(), validate(customerOrderValidation.getCustomerOrder), customerOrderController.deleteCustomerOrder);

router
  .route('/:id/productOrders')
  .get(auth(), validate(customerOrderValidation.getCustomerOrder), customerOrderController.getProductOrders);

router
  .route('/:id/productReservations')
  .get(auth(), validate(customerOrderValidation.getCustomerOrder), customerOrderController.getProductReservations);

module.exports = router;
