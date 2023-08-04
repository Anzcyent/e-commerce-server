const router = require("express").Router();

const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAllOrders,
  getMonthlyIncome,
  getOrder,
} = require("../controllers/order");
const {
  getAccessToRoute,
  adminCanOperateOrder,
  onlyAdminCanOperate,
} = require("../middlewares/auth/auth");

router.post("/create", createOrder);
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

router.get("/:id", getOrder);
router.get("/:userId", [getAccessToRoute, onlyAdminCanOperate], getUserOrders);
router.get("/", [getAccessToRoute, onlyAdminCanOperate], getAllOrders);

router.get(
  "/income",
  [getAccessToRoute, onlyAdminCanOperate],
  getMonthlyIncome
);

module.exports = router;
