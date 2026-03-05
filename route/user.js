const userController = require("../controllers/user-controller");

const router = require("express").Router();

router.get("/products", userController.getProducts);
router.get("/top-products", userController.topProducts);
router.get("/product/:id", userController.getProduct);

module.exports = router;
