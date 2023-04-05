const express = require('express');
const validate = require('../middlewares/validate');
const productReservationController = require('../controllers/productReservation.controller');
const productReservationValidation = require('../validations/productReservation.validation');

const router = express.Router();

router
  .route('/')
  .post(
    validate(productReservationValidation.createProductReservation),
    productReservationController.createProductReservation
  )
  .get(validate(productReservationValidation.getProductReservations), productReservationController.getProductReservations);

router
  .route('/:id')
  .get(validate(productReservationValidation.getProductReservation), productReservationController.getProductReservation)
  .patch(
    validate(productReservationValidation.updateProductReservation),
    productReservationController.updateProductReservation
  )
  .delete(
    validate(productReservationValidation.getProductReservation),
    productReservationController.deleteProductReservation
  );

module.exports = router;
