const mongoose = require('mongoose');




export   const serviceSchema = new mongoose.Schema({
    name: String,
    price: Number
  }, { _id: true });

const PackageSchema = new mongoose.Schema({
  from: String,
  to: String,
  startDate: Date,
  endDate: Date,
  basePrice: Number,
  includedServices: [serviceSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Package', PackageSchema);
