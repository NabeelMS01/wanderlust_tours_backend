const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: String,
  price: { type: Number, default: 0 },
}, { _id: true });

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  from: String,
  to: String,
  startDate: Date,
  endDate: Date,
  basePrice: Number,
  image: { type: String },  
  includedServices: [String],
  optionalServices: [serviceSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Package = mongoose.model('Package', PackageSchema);

module.exports = {
  Package,
  serviceSchema,
};
