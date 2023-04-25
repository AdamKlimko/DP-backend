const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const semiProductReservationSchema = mongoose.Schema(
  {
    semiProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'semi-product', required: true },
    productionOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'production-order', required: true },
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
