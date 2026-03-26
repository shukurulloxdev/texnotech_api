const router = require("express").Router();

router.use("/admin", require("./admin"));
router.use("/user", require("./user"));
router.use("/auth", require("./auth"));
router.use("/otp", require("./otp"));
router.use("/order", require("./order"));

module.exports = router;
