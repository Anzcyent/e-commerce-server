const CustomError = require("../helpers/error/CustomError");
const errorWrapper = require("express-async-handler");
const Cart = require("../models/Cart");

const createCart = errorWrapper(async (req, res, next) => {
  const cart = await new Cart();

  cart.products.push(req.body.product);
  cart.customer = req.body.customer;

  await cart.save();

  return res.status(201).json({ cart });
});

const updateCart = errorWrapper(async (req, res, next) => {
  const updatedCart = await Cart.findById(req.params.id);

  updatedCart.customer = req.body.customer;
  updatedCart.products.push(req.body.product);

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
  const cart = await Cart.findOne({ userId: req.params.id });

  if (!cart) return next(new CustomError("Cart not found", 404));

  return res.status(200).json({ cart });
});

const getAllCarts = errorWrapper(async (req, res, next) => {
  const carts = await Cart.find();
  return res.status(200).json({ carts });
});

module.exports = { createCart, updateCart, deleteCart, getCart, getAllCarts };
