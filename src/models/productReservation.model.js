const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productReservationSchema = mongoose.Schema(
  {
    customerOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'customer-order', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    reservedQuantity: { type: Number, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

productReservationSchema.set('toJSON', {
  transform(doc, ret) {
    const modifiedRet = { ...ret };
    modifiedRet.createdAt = doc.createdAt;
    modifiedRet.updatedAt = doc.updatedAt;
    return modifiedRet;
  },
});

productReservationSchema.plugin(toJSON);
productReservationSchema.plugin(paginate);

const ProductReservation = mongoose.model('product-reservation', productReservationSchema);

module.exports = ProductReservation;
