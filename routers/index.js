const router = require("express").Router();
const auth = require("./auth");
const product = require("./product");
const user = require("./user");

router.use("/auth", auth);
router.use("/product", product);
router.use("/user", user);

module.exports = router;
