const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { state } = require('../config/state');
const { currency } = require('../config/currency');

const purchaseRequisition = mongoose.Schema(
  {
    purchaseOrder: { type: mongoose.SchemaTypes.ObjectId, ref: 'purchase-order' },
    productionOrder: { type: mongoose.SchemaTypes.ObjectId, ref: 'production-order' },
    semiProductOrder: { type: mongoose.SchemaTypes.ObjectId, ref: 'semi-product-order' },
    semiProduct: { type: mongoose.SchemaTypes.ObjectId, ref: 'semi-product' },
    state: { type: String, enum: state, default: 'planned', required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    price: { type: Number, required: true, default: 0 },
    currency: { type: String, enum: currency, required: true },
  },
  {
    timestamps: true,
  }
);

purchaseRequisition.plugin(toJSON);
purchaseRequisition.plugin(paginate);

const PurchaseRequisition = mongoose.model('purchase-requisition', purchaseRequisition);

module.exports = PurchaseRequisition;
