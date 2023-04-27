const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productReservationSchema = mongoose.Schema(
  {
    productStorageItem: { type: mongoose.Schema.Types.ObjectId, ref: 'product-storage-item', required: true },
    customerOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'customer-order', required: true },
    productOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'product-order', required: true },
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
