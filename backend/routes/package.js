const express = require("express");
const {
  addPackageController,
  getAllPackageController,
  updatePackageController,
  deletepackageController,
  getPackageController,
  // braintreeTokenController,
  // brainTreePaymentController,
} = require("../controllers/packageConytroller.js");

const router = express.Router();

//add package
router.post("/add-package", addPackageController);

//get package
router.get("/packages", getAllPackageController);

//get package by id
router.get("/get-package/:id", getPackageController);

//update package
router.put("/update-package/:id", updatePackageController);

//delete package
router.delete("/delete-package/:id", deletepackageController);

//payments routes
//token
// router.get("/braintree/client-token", braintreeTokenController);

// //payments
// router.post("/braintree/payment", brainTreePaymentController);

module.exports = router;
