const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const semiProductReservationSchema = mongoose.Schema(
  {
    semiProductStorageItem: { type: mongoose.Schema.Types.ObjectId, ref: 'semi-product-storage-item', required: true },
    productionOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'production-order', required: true },
    semiProductOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'semi-product-order', required: true },
    reservedQuantity: { type: Number, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

semiProductReservationSchema.set('toJSON', {
  transform(doc, ret) {
    const modifiedRet = { ...ret };
    modifiedRet.createdAt = doc.createdAt;
    modifiedRet.updatedAt = doc.updatedAt;
    return modifiedRet;
  },
});

semiProductReservationSchema.plugin(toJSON);
semiProductReservationSchema.plugin(paginate);

const SemiProductReservation = mongoose.model('semi-product-reservation', semiProductReservationSchema);

module.exports = SemiProductReservation;
