const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { state } = require('../config/state');
const { priority } = require('../config/priority');

const productionOrderSchema = mongoose.Schema(
  {
    productOrder: { type: mongoose.SchemaTypes.ObjectId, ref: 'product-order' },
    productionSeq: { type: mongoose.SchemaTypes.ObjectId, required: true },
    state: { type: String, enum: state, default: 'planned', required: true },
    wantedDeliveryDate: { type: Date, required: true },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date },
    priority: { type: String, enum: priority, required: true },
  },
  { timestamps: true }
);

productionOrderSchema.set('toJSON', {
  transform(doc, ret) {
    const modifiedRet = { ...ret };
    modifiedRet.createdAt = doc.createdAt;
    modifiedRet.updatedAt = doc.updatedAt;
    return modifiedRet;
  },
});

productionOrderSchema.plugin(toJSON);
productionOrderSchema.plugin(paginate);

const ProductionOrder = mongoose.model('production-order', productionOrderSchema);

module.exports = ProductionOrder;
