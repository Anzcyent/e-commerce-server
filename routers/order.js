const router = require("express").Router();

const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAllOrders,
  getMonthlyIncome,
} = require("../controllers/order");
const {
  getAccessToRoute,
  adminCanOperateOrder,
  onlyAdminCanOperate,
} = require("../middlewares/auth/auth");

router.post("/create", getAccessToRoute, createOrder);
router.put(
  "/update/:id",
  [getAccessToRoute, adminCanOperateOrder],
  updateOrder
);
router.delete(
  "/delete/:id",
  [getAccessToRoute, adminCanOperateOrder],
  deleteOrder
);
router.get("/userId", [getAccessToRoute, onlyAdminCanOperate], getUserOrders);
router.get("/", [getAccessToRoute, onlyAdminCanOperate], getAllOrders);

router.get(
  "/income",
  [getAccessToRoute, onlyAdminCanOperate],
  getMonthlyIncome
);

module.exports = router;
