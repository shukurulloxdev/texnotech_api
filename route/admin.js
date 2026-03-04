const productCon = require("../controllers/admin/product-con");
const router = require("express").Router();

router.post("/add-product", productCon.addProduct);

module.exports = router;
