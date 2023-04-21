const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bomItemSchema = mongoose.Schema(
  {
    semiProduct: { type: mongoose.SchemaTypes.ObjectId, ref: 'semi-product', required: true },
    quantity: { type: Number, default: 1, required: true },
  },
  { timestamps: true }
);

bomItemSchema.set('toJSON', {
  transform(doc, ret) {
    const modifiedRet = { ...ret };
    modifiedRet.createdAt = doc.createdAt;
    modifiedRet.updatedAt = doc.updatedAt;
    return modifiedRet;
  },
});

bomItemSchema.plugin(toJSON);
bomItemSchema.plugin(paginate);

const BomItem = mongoose.model('bom-item', bomItemSchema);

module.exports = BomItem;
