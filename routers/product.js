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
  adminCanOperateProduct,
} = require("../middlewares/auth/auth");

router.post("/create", getAccessToRoute, createProduct);
router.put("/update/:id", [getAccessToRoute, adminCanOperateProduct], updateProduct);
router.delete(
  "/delete/:id",
  [getAccessToRoute, adminCanOperateProduct],
  deleteProduct
);

router.get("/:id", getProduct);
router.get("/", getAllProducts)

module.exports = router;
