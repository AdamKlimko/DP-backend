const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { state } = require('../config/state');
const { currency } = require('../config/currency');
const { priority } = require('../config/priority');

const purchaseOrderSchema = mongoose.Schema(
  {
    supplier: { type: String, required: true },
    state: { type: String, enum: state, default: 'planned', required: true },
    price: { type: Number, required: true },
    currency: { type: String, enum: currency, required: true },
    priority: { type: String, enum: priority, required: true },
    wantedDeliveryDate: { type: Date, required: true },
  },
  { timestamps: true }
);

purchaseOrderSchema.set('toJSON', {
  transform(doc, ret) {
    const modifiedRet = { ...ret };
    modifiedRet.createdAt = doc.createdAt;
    modifiedRet.updatedAt = doc.updatedAt;
    return modifiedRet;
  },
});

purchaseOrderSchema.plugin(toJSON);
purchaseOrderSchema.plugin(paginate);

const PurchaseOrder = mongoose.model('purchase-order', purchaseOrderSchema);

module.exports = PurchaseOrder;
