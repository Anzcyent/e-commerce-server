const router = require("express").Router();
const { updateUser, deleteUser, getUser, getAllUsers } = require("../controllers/user");
const {
  getAccessToRoute,
  adminCanOperateUser,
  onlyAdminCanOperate,
} = require("../middlewares/auth/auth");

router.put("/update/:id", [getAccessToRoute, adminCanOperateUser], updateUser);
router.delete(
  "/delete/:id",
  [getAccessToRoute, onlyAdminCanOperate],
  deleteUser
);

router.get("/:id", [getAccessToRoute, onlyAdminCanOperate], getUser);
router.get("/", [getAccessToRoute, onlyAdminCanOperate], getAllUsers);

module.exports = router;
