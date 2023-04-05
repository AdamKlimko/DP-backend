const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const customerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

customerSchema.set('toJSON', {
  transform(doc, ret) {
    const modifiedRet = { ...ret };
    modifiedRet.createdAt = doc.createdAt;
    modifiedRet.updatedAt = doc.updatedAt;
    return modifiedRet;
  },
});

customerSchema.plugin(toJSON);
customerSchema.plugin(paginate);

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;
