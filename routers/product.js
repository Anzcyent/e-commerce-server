const router = require("express").Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../controllers/product");
const {
  getAccessToRoute,
  adminCanOperate,
} = require("../middlewares/auth/auth");

router.post("/create", getAccessToRoute, createProduct);
router.put("/update/:id", [getAccessToRoute, adminCanOperate], updateProduct);
router.delete(
  "/delete/:id",
  [getAccessToRoute, adminCanOperate],
  deleteProduct
);

router.get("/:id", getProduct);
router.get("/", getAllProducts)

module.exports = router;
