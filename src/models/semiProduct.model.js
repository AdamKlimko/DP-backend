const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const semiSemiProductSchema = mongoose.Schema(
  {
    partNumber: { type: String, required: true },
    description: { type: String },
    manufacturer: { type: String, required: true },
    storedQuantity: { type: Number, default: 0, required: true },
  },
  { timestamps: true }
);

semiSemiProductSchema.set('toJSON', {
  transform(doc, ret) {
    const modifiedRet = { ...ret };
    modifiedRet.createdAt = doc.createdAt;
    modifiedRet.updatedAt = doc.updatedAt;
    return modifiedRet;
  },
});

semiSemiProductSchema.plugin(toJSON);
semiSemiProductSchema.plugin(paginate);

const SemiProduct = mongoose.model('semiSemiProduct', semiSemiProductSchema);

module.exports = SemiProduct;
