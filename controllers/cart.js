const CustomError = require("../helpers/error/CustomError");
const errorWrapper = require("express-async-handler");
const Cart = require("../models/Cart");

const createCart = errorWrapper(async (req, res, next) => {
  const { product, customer, total } = req.body;
  const cart = await new Cart();

  cart.products.push(product);
  cart.customer = customer;
  cart.quantity = cart.products.length;
  cart.total = total;

  await cart.save();

  return res.status(201).json({ cart });
});

const updateCart = errorWrapper(async (req, res, next) => {
  const { product, customer, total } = req.body;
  const updatedCart = await Cart.findById(req.params.id);

  updatedCart.customer = customer;
  updatedCart.products.push(product);
  updatedCart.total = updatedCart.total + total;
  updatedCart.quantity = updatedCart.products.length;

  await updatedCart.save();

  if (!updatedCart) return next(new CustomError("Cart not found", 404));

  return res.status(200).json({ updatedCart });
});

const deleteCart = errorWrapper(async (req, res, next) => {
  const cart = await Cart.findByIdAndDelete(req.params.id);

  if (!cart) return next(new CustomError("Cart not found", 404));

  return res.status(200).json({ cart });
});

const getCart = errorWrapper(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id).populate("products");

  if (!cart) return next(new CustomError("Cart not found", 404));

  return res.status(200).json({ cart });
});

const deleteItemInCart = errorWrapper(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);
  const { productId } = req.query;

  const removedProduct = cart.products.find((product) => product._id === productId);
  const removedProductPrice = removedProduct ? removedProduct.price : 0;

  cart.total -= removedProductPrice;

  cart.products = cart.products.filter((product) => product._id !== productId);
  cart.quantity = cart.products.length;

  await cart.save();

  return res.status(200).json({ cart });
});

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  deleteItemInCart,
};
