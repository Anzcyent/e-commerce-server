const router = require("express").Router();

const {
  getAccessToRoute,
  adminCanOperateCart,
  onlyAdminCanOperate,
} = require("../middlewares/auth/auth");

const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
} = require("../controllers/cart");

router.post("/create", getAccessToRoute, createCart);

router.put("/update/:id", [getAccessToRoute, adminCanOperateCart], updateCart);

router.delete(
  "/delete/:id",
  [getAccessToRoute, adminCanOperateCart],
  deleteCart
);

router.get("/:id", getAccessToRoute, getCart);
router.get("/", [getAccessToRoute, onlyAdminCanOperate], getAllCarts);

module.exports = router;
