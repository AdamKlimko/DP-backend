const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const semiProductSchema = mongoose.Schema(
  {
    partNumber: { type: String, required: true },
    description: { type: String },
    manufacturer: { type: String, required: true },
    storedQuantity: { type: Number, default: 0, required: true },
    uom: { type: String, required: true },
  },
  { timestamps: true }
);

semiProductSchema.set('toJSON', {
  transform(doc, ret) {
    const modifiedRet = { ...ret };
    modifiedRet.createdAt = doc.createdAt;
    modifiedRet.updatedAt = doc.updatedAt;
    return modifiedRet;
  },
});

semiProductSchema.plugin(toJSON);
semiProductSchema.plugin(paginate);

const SemiProduct = mongoose.model('semi-product', semiProductSchema);

module.exports = SemiProduct;
