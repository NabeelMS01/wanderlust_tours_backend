const { serviceSchema } = require("../package/travelPackage.model");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    package: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
    selectedServiceIds: [{ type: mongoose.Schema.Types.ObjectId }],
    selectedservices:[serviceSchema],
    status: {
      type: String,
      enum: ["pending", "accepted", "cancelled"],
      default: "pending",
    },
    totalPrice: Number,
    heldUntil: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
