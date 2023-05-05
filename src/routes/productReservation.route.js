const express = require('express');
const validate = require('../middlewares/validate');
const productReservationController = require('../controllers/productReservation.controller');
const productReservationValidation = require('../validations/productReservation.validation');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(
    auth(),
    validate(productReservationValidation.createProductReservation),
    productReservationController.createProductReservation
  )
  .get(
    auth(),
    validate(productReservationValidation.getProductReservations),
    productReservationController.getProductReservations
  );

router
  .route('/:id')
  .get(
    auth(),
    validate(productReservationValidation.getProductReservation),
    productReservationController.getProductReservation
  )
  .patch(
    auth(),
    validate(productReservationValidation.updateProductReservation),
    productReservationController.updateProductReservation
  )
  .delete(
    auth(),
    validate(productReservationValidation.getProductReservation),
    productReservationController.deleteProductReservation
  );

module.exports = router;
