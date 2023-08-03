const router = require("express").Router();

const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  deleteItemInCart,
} = require("../controllers/cart");

router.post("/create", createCart);

router.put("/update/:id", updateCart);

router.delete("/delete/:id", deleteCart);
router.delete("/deleteItem/:id", deleteItemInCart);

router.get("/:id", getCart);

module.exports = router;
