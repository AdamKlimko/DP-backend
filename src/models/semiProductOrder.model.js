const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { CustomerOrder } = require('./index');
const { state } = require('../config/state');

const semiProductOrderSchema = mongoose.Schema(
  {
    productionOrder: { type: mongoose.SchemaTypes.ObjectId, ref: 'production-order' },
    bomItem: { type: mongoose.SchemaTypes.ObjectId, ref: 'bom-item' },
    state: { type: String, enum: state, default: 'planned', required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

semiProductOrderSchema.set('toJSON', {
  transform(doc, ret) {
    const modifiedRet = { ...ret };
    modifiedRet.createdAt = doc.createdAt;
    modifiedRet.updatedAt = doc.updatedAt;
    return modifiedRet;
  },
});

semiProductOrderSchema.plugin(toJSON);
semiProductOrderSchema.plugin(paginate);

semiProductOrderSchema.post('findOneAndDelete', async function (doc) {
  await CustomerOrder.updateMany({ semiProductOrders: doc._id }, { $pull: { semiProductOrders: doc._id } });
});

const SemiProductOrder = mongoose.model('semi-product-order', semiProductOrderSchema);

module.exports = SemiProductOrder;
