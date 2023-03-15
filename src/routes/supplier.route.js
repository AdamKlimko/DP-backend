const express = require('express');
const { supplierController } = require('../controllers');

const router = express.Router();

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .post(supplierController.createSupplier)
  .get(supplierController.getSuppliers);

module.exports = router;
