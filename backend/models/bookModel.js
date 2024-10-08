const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // doctor: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Doctor",
    //   required: true,
    // },
    // user: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    price: { type: String, required: true },
    // appointmentDate: {
    //   type: Date,
    //   required: true,
    // },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const bookings = mongoose.model("Booking", bookingSchema);

module.exports = bookings;