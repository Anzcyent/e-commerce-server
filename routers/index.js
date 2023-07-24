const router = require("express").Router();
const auth = require("./auth");
const product = require("./product");
const user = require("./user");
const cart = require("./cart");
const order = require("./order");

router.use("/auth", auth);
router.use("/product", product);
router.use("/user", user);
router.use("/cart", cart);
router.use("/order", order);

module.exports = router;
