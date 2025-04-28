const mongoose = require("mongoose");
const { serviceSchema } = require("../package/travelPackage.model");

const BookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    selectedOptionalServices: [{ type: mongoose.Schema.Types.ObjectId }],  
    selectedOptionalServicesDetails: [{ name: String, price: Number }], 
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    heldUntil: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
