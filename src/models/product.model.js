const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    partNumber: { type: String, required: true },
    description: { type: String },
    storedQuantity: { type: Number, default: 0, required: true },
    uom: { type: String, required: true },
    size: { type: String },
    billOfMaterials: [{ type: String }],
  },
  { timestamps: true }
);

productSchema.set('toJSON', {
  transform(doc, ret) {
    const modifiedRet = { ...ret };
    modifiedRet.createdAt = doc.createdAt;
    modifiedRet.updatedAt = doc.updatedAt;
    return modifiedRet;
  },
});

productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const Product = mongoose.model('product', productSchema);

module.exports = Product;
