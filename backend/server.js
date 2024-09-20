const express = require("express");
const mongoose = require("mongoose");
require("colors");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb.js");
// const bookingRoute = require("../Route/Booking.js");

//dotenv config
dotenv.config();

connectDb();

//reset object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//routes
app.use("/packages", require("./routes/package.js"));
app.use("/bookings", require("./routes/booking.js"));
// app.use("/test", (req, res) => {
//   res.send("Server is running!");
// });

const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.bgCyan.white);
});
