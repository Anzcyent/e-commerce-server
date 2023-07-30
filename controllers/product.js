const errorWrapper = require("express-async-handler");
const Product = require("../models/Product");
const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");

const createProduct = errorWrapper(async (req, res, next) => {
  const product = await Product.create({ ...req.body, owner: req.user._id });
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: {
        products: product._id,
      },
    },
    {
      new: true,
    }
  );

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

  const seller = await User.findByIdAndUpdate(
    product.seller,
    {
      $pull: {
        products: product._id,
      },
    },
    {
      new: true,
    }
  );

  return res.status(200).json({ product });
});

const getProduct = errorWrapper(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate("category")
    .populate({ path: "seller", select: "username" });

  if (!product) return next(new CustomError("Product not found", 404));

  return res.status(200).json({
    product,
  });
});

const getAllProducts = errorWrapper(async (req, res, next) => {
  const { sort, category } = req.query;

  const products =
    sort === "new"
      ? await Product.find().sort({ _id: -1 }).limit(15)
      : category
      ? await Product.find({ category }).limit(15)
      : await Product.find();

  return res.status(200).json({ products, result: products.length });
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
