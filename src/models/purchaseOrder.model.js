const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const purchaseOrderSchema = mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    promisedDeliveryDate: {
      type: Date,
    },
    wantedDeliveryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
purchaseOrderSchema.plugin(toJSON);
purchaseOrderSchema.plugin(paginate);

/**
 * @typedef PurchaseOrder
 */
const PurchaseOrder = mongoose.model('purchase-order', purchaseOrderSchema);

module.exports = PurchaseOrder;
