const packageModel = require("../models/packageModel.js");
const bookModel = require("../models/bookModel.js");
const { Stripe } = require("stripe");

const getCheckoutSession = async (req, res) => {
  try {
    const pacakage = await packageModel.findById(req.params.packageId);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/packages/${pacakge.id}`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: pacakge.name,
            },
            unit_amount: pacakge.price,
          },
          quantity: 1,
        },
      ],
    });

    const booking = new bookModel({
      package: pacakage._id,
      price: pacakage.price,
      session: session.id,
      // user: req.user._id,
    });
    await booking.save();

    res
      .send(200)
      .json({ success: true, message: "Successfully Paid", session });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session" });
  }
};

module.exports = {
  getCheckoutSession,
  // braintreeTokenController,
  // brainTreePaymentController,
};
