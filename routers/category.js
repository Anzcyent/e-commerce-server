const {
  createCategory,
  updateCategory,
  getAllCategories,
} = require("../controllers/category");
const {
  getAccessToRoute,
  onlyFounderCanOperate,
} = require("../middlewares/auth/auth");

const router = require("express").Router();

router.post(
  "/create",
  [getAccessToRoute, onlyFounderCanOperate],
  createCategory
);
router.put(
  "/update/:id",
  [getAccessToRoute, onlyFounderCanOperate],
  updateCategory
);
router.get("/", getAllCategories);

module.exports = router;
