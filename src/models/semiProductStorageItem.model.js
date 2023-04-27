const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const semiProductStorageItemSchema = mongoose.Schema(
  {
    semiProduct: { type: mongoose.SchemaTypes.ObjectId, ref: 'semi-product' },
    purchaseRequisition: { type: mongoose.SchemaTypes.ObjectId, ref: 'purchase-requisition' },
    storedQuantity: { type: Number, default: 0, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

semiProductStorageItemSchema.set('toJSON', {
  transform(doc, ret) {
    const modifiedRet = { ...ret };
    modifiedRet.createdAt = doc.createdAt;
    modifiedRet.updatedAt = doc.updatedAt;
    return modifiedRet;
  },
});

semiProductStorageItemSchema.plugin(toJSON);
semiProductStorageItemSchema.plugin(paginate);

const SemiProductStorageItem = mongoose.model('semi-product-storage-item', semiProductStorageItemSchema);

module.exports = SemiProductStorageItem;
