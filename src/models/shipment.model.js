const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { state } = require('../config/state');
const { priority } = require('../config/priority');

const shipmentSchema = mongoose.Schema(
  {
    state: { type: String, enum: state, default: 'planned', required: true },
    customer: { type: mongoose.SchemaTypes.ObjectId, ref: 'customer', required: true },
    priority: { type: String, enum: priority, required: true },
    address: { type: String, required: true },
    customerOrders: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'customer-order' }],
  },
  { timestamps: true }
);

shipmentSchema.set('toJSON', {
  transform(doc, ret) {
    const modifiedRet = { ...ret };
    modifiedRet.createdAt = doc.createdAt;
    modifiedRet.updatedAt = doc.updatedAt;
    return modifiedRet;
  },
});

shipmentSchema.plugin(toJSON);
shipmentSchema.plugin(paginate);

const Shipment = mongoose.model('shipment', shipmentSchema);

module.exports = Shipment;
