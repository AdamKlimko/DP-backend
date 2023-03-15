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
    supplier: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'supplier',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

purchaseOrderSchema.plugin(toJSON);
purchaseOrderSchema.plugin(paginate);

/**
 * @typedef PurchaseOrder
 */
const PurchaseOrder = mongoose.model('purchase-order', purchaseOrderSchema);

module.exports = PurchaseOrder;
