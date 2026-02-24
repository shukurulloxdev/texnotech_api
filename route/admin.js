const adminController = require("../controllers/admin-controller");
const router = require("express").Router();

router.get("/admin-products", adminController.adminProducts);

router.post("/add-product", adminController.addProduct);

router.put("/update-active/:id", adminController.updateProductActive);

router.delete("/delete-product/:id", adminController.deleteProduct);

module.exports = router;
