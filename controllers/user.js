const errorWrapper = require("express-async-handler");
const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");

const updateUser = errorWrapper(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  if (!updatedUser) return next(new CustomError("User not found", 404));

  return res.status(200).json({ updatedUser });
});

const deleteUser = errorWrapper(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new CustomError("User not found", 404));

  return res.status(200).json({ user });
});

const getUser = errorWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new CustomError("User not found", 404));

  return res.status(200).json({ user: { ...user._doc, password: undefined } });
});

const getAllUsers = errorWrapper(async (req, res, next) => {
  const latestUsersRequest = req.query.newUsers;

  const users = latestUsersRequest
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find();

  return res.status(200).json({ users });
});

module.exports = { updateUser, deleteUser, getUser, getAllUsers };
