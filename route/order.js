const orderController = require("../controllers/order-controller");

const router = require("express").Router();

router.post("/create", orderController.createOrder);
router.get("/admin-orders", orderController.adminOrders);

module.exports = router;
