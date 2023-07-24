const errorWrapper = require("express-async-handler");
const Product = require("../models/Product");
const CustomError = require("../helpers/error/CustomError");

const createProduct = errorWrapper(async (req, res, next) => {
  const product = await Product.create({ ...req.body, owner: req.user._id });

  return res.status(201).json({
    product,
  });
});

const updateProduct = errorWrapper(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  if (!updatedProduct) return next(new CustomError("Product not found", 404));

  return res.status(200).json({ updatedProduct });
});

const deleteProduct = errorWrapper(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) return next(new CustomError("Product not found", 404));

  return res.status(200).json({ product });
});

const getProduct = errorWrapper(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new CustomError("Product not found", 404));

  return res.status(200).json({
    product,
  });
});

const getAllProducts = errorWrapper(async (req, res, next) => {
  const products = await Product.find();

  return res.status(200).json({ products });
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
