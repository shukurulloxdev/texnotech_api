const userController = require("../controllers/user-controller");

const router = require("express").Router();

router.get("/products", userController.getProducts);

router.get("/categories", userController.getCategories);
router.get("/by-category/:category", userController.getProductsByCategory);

router.post("/favorites", userController.getFavorites);
router.post("/basket-products", userController.getBasketProducts);

router.get("/top-products", userController.topProducts);
router.get("/product/:id", userController.getProduct);
router.get("/new-orders", userController.newOrders);
router.get("/finished-orders", userController.finishedOrders);

module.exports = router;
