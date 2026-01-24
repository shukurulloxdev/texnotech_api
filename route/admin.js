const productCon = require("../controllers/admin/product-con");
const router = require("express").Router();

router.get("/admin-products", productCon.adminProducts);
router.get("/top-products", productCon.topProducts);
router.post("/add-product", productCon.addProduct);
router.put("/update-active", productCon.updateProductActive);
router.delete("/delete-product/:id", productCon.deleteProduct);

module.exports = router;
