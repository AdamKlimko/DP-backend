const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const purchaseRequisition = mongoose.Schema(
  {
    partNumber: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

purchaseRequisition.plugin(toJSON);
purchaseRequisition.plugin(paginate);

const PurchaseRequisition = mongoose.model('purchase-requisition', purchaseRequisition);

module.exports = PurchaseRequisition;
