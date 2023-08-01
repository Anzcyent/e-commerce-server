const router = require("express").Router();

const {
  getAccessToRoute,
  onlyAdminCanOperate,
} = require("../middlewares/auth/auth");

const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
  deleteItemInCart,
} = require("../controllers/cart");

router.post("/create", createCart);

router.put("/update/:id", updateCart);

router.delete("/delete/:id", deleteCart);
router.delete("/deleteItem/:id", deleteItemInCart )

router.get("/:id", getCart);
router.get("/", [getAccessToRoute, onlyAdminCanOperate], getAllCarts);

module.exports = router;
