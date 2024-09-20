const packageModel = require("../models/packageModel.js");
const braintree = require("braintree");
// const dotenv = require("dotenv");
const { gateway } = require("../config/braintree.js");

// //Payment gateway
// const gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: process.env.BRAINTREE_MERCHANT_ID,
//   publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//   privateKey: process.env.BRAINTREE_PRIVATE_KEY,
// });

// Add package
const addPackageController = async (req, res) => {
  try {
    const newPackage = new packageModel(req.body);
    await newPackage.save();
    res
      .status(201)
      .json({ message: "Package created successfully", data: newPackage });
  } catch (error) {
    console.error("Error adding package:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all packages
const getAllPackageController = async (req, res) => {
  try {
    const packages = await packageModel.find().exec();
    return res.status(200).json({
      success: true,
      existingPackages: packages,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

// Get package by ID
const getPackageController = async (req, res) => {
  try {
    let packageId = req.params.id;
    const package = await packageModel.findById(packageId);
    if (!package) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }
    return res.status(200).json({
      success: true,
      package,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// Update package
const updatePackageController = async (req, res) => {
  try {
    const packages = await packageModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    return res.status(200).json({
      success: "Updated Successfully",
      // updatedPost: post,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

// Delete package
const deletepackageController = async (req, res) => {
  try {
    const deletedPackage = await packageModel.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    return res.status(200).json({
      success: "Deleted Successfully",
      deletedPackage,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Delete unsuccessful",
      error: err.message,
    });
  }
};

// //payment gateway api
// //token
// const braintreeTokenController = async (req, res) => {
//   try {
//     const clientToken = await gateway.clientToken.generate({});
//     res.json({ clientToken });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// //payment
// const brainTreePaymentController = async (req, res) => {
//   const { nonce, destination } = req.body;

//   if (!destination) {
//     console.error("Destination not provided");
//     return res
//       .status(400)
//       .json({ success: false, message: "Destination not provided" });
//   }

//   const calculatePrice = (destination) => {
//     switch (destination) {
//       case "Mirissa":
//         return 1000;
//       case "Sigiriya":
//         return 1500;
//       case "Ella":
//         return 2000;
//       default:
//         console.error("Unknown destination:", destination);
//         return -1; // Return an invalid price for unknown destinations
//     }
//   };

//   try {
//     const amount = calculatePrice(destination);

//     if (amount <= 0) {
//       console.error("Invalid amount:", amount);
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid amount" });
//     }
//     const result = await gateway.transaction.sale({
//       amount: amount, // Implement calculatePrice function
//       paymentMethodNonce: nonce,
//       options: {
//         submitForSettlement: true,
//       },
//     });

//     if (result.success) {
//       // Payment successful, save reservation details or perform other actions
//       return res.json({ success: true, message: "Payment successful" });
//     } else {
//       // Payment failed, handle accordingly
//       console.error(result.message);
//       return res
//         .status(400)
//         .json({ success: false, message: "Payment failed" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

module.exports = {
  getAllPackageController,
  addPackageController,
  updatePackageController,
  deletepackageController,
  getPackageController,
  // braintreeTokenController,
  // brainTreePaymentController,
};
