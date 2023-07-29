const errorWrapper = require("express-async-handler");
const Category = require("../models/Category");
const CustomError = require("../helpers/error/CustomError");

const createCategory = errorWrapper(async (req, res, next) => {
  const category = await Category.create(req.body);

  return res.status(201).json({
    category,
  });
});

const updateCategory = errorWrapper(async (req, res, next) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  if (!updatedCategory) return next(new CustomError("Product not found", 404));

  return res.status(200).json({ updatedCategory });
});

const deleteCategory = errorWrapper(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) return next(new CustomError("Product not found", 404));

  return res.status(200).json({ category });
});

const getAllCategories = errorWrapper(async (req, res, next) => {
  const categories = await Category.find();

  return res.status(200).json({ categories });
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
