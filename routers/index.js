const router = require("express").Router();
const auth = require("./auth");
const product = require("./product");
const user = require("./user");
const cart = require("./cart");

router.use("/auth", auth);
router.use("/product", product);
router.use("/user", user);
router.use("/cart", cart);

module.exports = router;
