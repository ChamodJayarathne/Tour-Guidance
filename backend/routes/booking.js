const express = require("express");
const { getCheckoutSession } = require("../controllers/bookingController.js");

const router = express.Router();

router.get("/checkout-session/:packageId", getCheckoutSession);

module.exports = router;
