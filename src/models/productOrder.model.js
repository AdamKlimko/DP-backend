const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { CustomerOrder } = require('./index');
const { state } = require('../config/state');

const productOrderSchema = mongoose.Schema(
  {
    customerOrder: { type: mongoose.SchemaTypes.ObjectId, ref: 'customer-order' },
    product: { type: mongoose.SchemaTypes.ObjectId, ref: 'product' },
    productionSeq: { type: mongoose.SchemaTypes.ObjectId, required: true },
    state: { type: state, default: 'planned', required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

productOrderSchema.set('toJSON', {
  transform(doc, ret) {
    const modifiedRet = { ...ret };
    modifiedRet.createdAt = doc.createdAt;
    modifiedRet.updatedAt = doc.updatedAt;
    return modifiedRet;
  },
});

productOrderSchema.plugin(toJSON);
productOrderSchema.plugin(paginate);

productOrderSchema.post('findOneAndDelete', async function (doc) {
  await CustomerOrder.updateMany({ productOrders: doc._id }, { $pull: { productOrders: doc._id } });
});

const ProductOrder = mongoose.model('product-order', productOrderSchema);

module.exports = ProductOrder;
