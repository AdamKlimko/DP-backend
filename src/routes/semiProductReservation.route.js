const express = require('express');
const validate = require('../middlewares/validate');
const semiProductReservationController = require('../controllers/semiProductReservation.controller');
const semiProductReservationValidation = require('../validations/semiProductReservation.validation');

const router = express.Router();

router
  .route('/')
  .post(
    validate(semiProductReservationValidation.createSemiProductReservation),
    semiProductReservationController.createSemiProductReservation
  )
  .get(
    validate(semiProductReservationValidation.getSemiProductReservations),
    semiProductReservationController.getSemiProductReservations
  );

router
  .route('/:id')
  .get(
    validate(semiProductReservationValidation.getSemiProductReservation),
    semiProductReservationController.getSemiProductReservation
  )
  .patch(
    validate(semiProductReservationValidation.updateSemiProductReservation),
    semiProductReservationController.updateSemiProductReservation
  )
  .delete(
    validate(semiProductReservationValidation.getSemiProductReservation),
    semiProductReservationController.deleteSemiProductReservation
  );

module.exports = router;
