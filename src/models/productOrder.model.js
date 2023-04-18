const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { CustomerOrder } = require('./index');

const productOrderSchema = mongoose.Schema(
  {
    product: { type: mongoose.SchemaTypes.ObjectId, ref: 'product' },
    quantity: { type: Number, required: true },
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
