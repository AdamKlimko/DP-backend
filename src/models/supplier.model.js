const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const supplierSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

supplierSchema.plugin(toJSON);
supplierSchema.plugin(paginate);

/**
 * @typedef Supplier
 */
const Supplier = mongoose.model('supplier', supplierSchema);

module.exports = Supplier;
