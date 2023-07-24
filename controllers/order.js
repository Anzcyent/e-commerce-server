const CustomError = require("../helpers/error/CustomError");
const errorWrapper = require("express-async-handler");
const Order = require("../models/Order");

const createOrder = errorWrapper(async (req, res, next) => {
  const order = await Order.create(req.body);

  return res.status(201).json({ order });
});

const updateOrder = errorWrapper(async (req, res, next) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  if (!updatedOrder) return next(new CustomError("Order not found", 404));

  return res.status(200).json({ updatedOrder });
});

const deleteOrder = errorWrapper(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) return next(new CustomError("Order not found", 404));

  return res.status(200).json({ order });
});

const getUserOrders = errorWrapper(async (req, res, next) => {
  const orders = await Order.find({ userId: req.params.userId });

  return res.status(200).json({ orders });
});

const getAllOrders = errorWrapper(async (req, res, next) => {
  const orders = await Order.find();
  return res.status(200).json({ orders });
});

const getMonthlyIncome = errorWrapper(async (req, res, next) => {
  const date = new Date();

  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

  const income = await Order.aggregate([
    { $match: { createdAt: { $gte: previousMonth } } },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$amount",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ]);

  return res.status(200).json({ income });
});

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAllOrders,
  getMonthlyIncome
};
