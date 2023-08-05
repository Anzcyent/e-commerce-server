const router = require("express").Router();
const { search } = require("../controllers/app");

router.get("/search", search);

module.exports = router;
