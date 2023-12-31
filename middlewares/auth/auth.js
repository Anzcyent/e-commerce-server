const errorWrapper = require("express-async-handler");
const CustomError = require("../../helpers/error/CustomError");
const { isTokenIncluded } = require("../../helpers/token/tokenHelpers");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Product = require("../../models/Product");
const Cart = require("../../models/Cart");
const Order = require("../../models/Order");

const getAccessToRoute = errorWrapper(async (req, res, next) => {
  if (!isTokenIncluded(req))
    return next(
      new CustomError(
        "You have to login for this operation, no token found.",
        401
      )
    );

  const access_token = req.headers.authorization.split(":")[1];
  const { rf_token } = req.cookies;

  jwt.verify(
    access_token,
    process.env.JWT_ACCESS_SECRET,
    async (err, decoded) => {
      if (err)
        return next(
          new CustomError("You have to login for this operation.", 401)
        );

      const user = await User.findById(decoded._id).select("-password");

      req.user = user;
      req.rf_token = rf_token;

      next();
    }
  );
});

const adminCanOperateProduct = errorWrapper(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (String(product.owner) === String(req.user._id) || req.user.isAdmin) {
    return next();
  } else {
    return next(new CustomError("You can't do this operation.", 403));
  }
});

const adminCanOperateUser = errorWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (String(user._id) === String(req.user._id) || req.user.isAdmin) {
    return next();
  } else {
    return next(new CustomError("You can't do this operation.", 403));
  }
});

const adminCanOperateCart = errorWrapper(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);

  if (String(cart.customer) === String(req.user._id) || req.user.isAdmin) {
    return next();
  } else {
    return next(new CustomError("You can't do this operation.", 403));
  }
});

const adminCanOperateOrder = errorWrapper(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (String(order.customerId) === String(req.user._id) || req.user.isAdmin) {
    return next();
  } else {
    return next(new CustomError("You can't do this operation.", 403));
  }
});

const onlyAdminCanOperate = errorWrapper(async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      new CustomError("Only admins can operate this operation.", 403)
    );
  } else {
    next();
  }
});

const isUserSeller = errorWrapper(async (req, res, next) => {
  if (req.user.isSeller) {
    next();
  } else {
    return next(
      new CustomError("You have to be a seller for this operation.", 403)
    );
  }
});

const onlyFounderCanOperate = errorWrapper(async (req, res, next) => {
  if (req.user.username === "Anzcyent") {
    next();
  } else {
    return next(
      new CustomError("You don't have permission for this operation.", 403)
    );
  }
});

module.exports = {
  getAccessToRoute,
  adminCanOperateProduct,
  adminCanOperateUser,
  adminCanOperateCart,
  adminCanOperateOrder,
  onlyAdminCanOperate,
  onlyFounderCanOperate,
  isUserSeller,
};
