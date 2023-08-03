const errorWrapper = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const CustomError = require("../helpers/error/CustomError");

const payment = errorWrapper(async (req, res, next) => {
  const [tokenId, amount] = req.body;
  stripe.charges.create(
    {
      source: tokenId,
      amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        return next(new CustomError(stripeErr, 500));
      } else {
        return res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = { payment };