const productCon = require("../controllers/admin/product-con");
const router = require("express").Router();

router.get("/top-products", productCon.topProducts);
router.post("/add-product", productCon.addProduct);

module.exports = router;
