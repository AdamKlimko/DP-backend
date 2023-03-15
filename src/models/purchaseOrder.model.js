const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const purchaseOrderSchema = mongoose.Schema(
  {
    state: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    promisedDeliveryDate: { type: Date },
    wantedDeliveryDate: { type: Date },
    supplier: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'supplier',
      required: true,
    },
    purchaseRequisitions: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'purchase-requisition',
      },
    ],
  },
  {
    timestamps: true,
  }
);

purchaseOrderSchema.plugin(toJSON);
purchaseOrderSchema.plugin(paginate);

const PurchaseOrder = mongoose.model('purchase-order', purchaseOrderSchema);

module.exports = PurchaseOrder;
