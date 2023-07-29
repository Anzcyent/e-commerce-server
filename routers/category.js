const { createCategory } = require("../controllers/category");
const {
  getAccessToRoute,
  onlyFounderCanOperate,
} = require("../middlewares/auth/auth");

const router = require("express").Router();

router.post("/create", [getAccessToRoute, onlyFounderCanOperate], createCategory);

module.exports = router;
