const mongoose = require("mongoose");

const packageSchema = mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: [true, "date is required"],
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
    // image: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Packages = mongoose.model("Packages", packageSchema);

module.exports = Packages;
