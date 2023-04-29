const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { state } = require('../config/state');
const { currency } = require('../config/currency');
const { priority } = require('../config/priority');

const customerOrderSchema = mongoose.Schema(
  {
    state: { type: String, enum: state, default: 'planned', required: true },
    currency: { type: String, enum: currency, required: true },
    orderDate: { type: Date, required: true },
    productionSeq: { type: mongoose.SchemaTypes.ObjectId, default: mongoose.Types.ObjectId, required: true },
    priority: { type: String, enum: priority, required: true },
    price: { type: Number },
    orderCost: { type: Number },
    orderProfit: { type: Number },
    customer: { type: mongoose.SchemaTypes.ObjectId, ref: 'customer' },
  },
  { timestamps: true }
);

customerOrderSchema.set('toJSON', {
  transform(doc, ret) {
    const modifiedRet = { ...ret };
    modifiedRet.createdAt = doc.createdAt;
    modifiedRet.updatedAt = doc.updatedAt;
    return modifiedRet;
  },
});

customerOrderSchema.plugin(toJSON);
customerOrderSchema.plugin(paginate);

const CustomerOrder = mongoose.model('customer-order', customerOrderSchema);

module.exports = CustomerOrder;
