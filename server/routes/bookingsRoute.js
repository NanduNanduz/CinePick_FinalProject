const router = require("express").Router();
const stripe = require("stripe")(process.env.stripe_key);
const authMiddleware = require("../middlewares/authMiddleware");

//make Payment
router.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;
    // Create a customer
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    // Create a charge
    const charge = await stripe.charges.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: "Purchased the movie ticket",
    });
    const transactionId = charge.id;

    res.send({
      success: true,
      message: "Payment Successful",
      data: transactionId,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
