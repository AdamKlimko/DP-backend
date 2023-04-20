const express = require('express');
const validate = require('../middlewares/validate');
const shipmentController = require('../controllers/shipment.controller');
const shipmentValidation = require('../validations/shipment.validation');

const router = express.Router();

router
  .route('/')
  .post(validate(shipmentValidation.createShipment), shipmentController.createShipment)
  .get(validate(shipmentValidation.getShipments), shipmentController.getShipments);

router
  .route('/:id')
  .get(validate(shipmentValidation.getShipment), shipmentController.getShipment)
  .patch(validate(shipmentValidation.updateShipment), shipmentController.updateShipment)
  .delete(validate(shipmentValidation.getShipment), shipmentController.deleteShipment);

module.exports = router;
