const adminController = require("../controllers/admin-controller");
const router = require("express").Router();

router.get("/admin-products", adminController.adminProducts);
router.get("/admin-categories", adminController.adminCategory);

router.post("/add-product", adminController.addProduct);
router.post("/add-category", adminController.addCategory);

router.put("/update-active/:id", adminController.updateProductActive);

router.delete("/delete-product/:id", adminController.deleteProduct);

module.exports = router;
