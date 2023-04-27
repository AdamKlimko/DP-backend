const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productStorageItemSchema = mongoose.Schema(
  {
    product: { type: mongoose.SchemaTypes.ObjectId, ref: 'product' },
    productionOrder: { type: mongoose.SchemaTypes.ObjectId, ref: 'production-order' },
    storedQuantity: { type: Number, default: 0, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

productStorageItemSchema.set('toJSON', {
  transform(doc, ret) {
    const modifiedRet = { ...ret };
    modifiedRet.createdAt = doc.createdAt;
    modifiedRet.updatedAt = doc.updatedAt;
    return modifiedRet;
  },
});

productStorageItemSchema.plugin(toJSON);
productStorageItemSchema.plugin(paginate);

const ProductStorageItem = mongoose.model('product-storage-item', productStorageItemSchema);

module.exports = ProductStorageItem;
