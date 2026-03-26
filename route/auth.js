const authController = require("../controllers/auth-controller");

const router = require("express").Router();

router.get("/me", authController.getMe);
router.post("/register", authController.register);
router.post("/logout", authController.logout);

module.exports = router;
