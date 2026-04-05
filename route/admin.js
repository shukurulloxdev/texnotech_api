const adminController = require("../controllers/admin-controller");
const router = require("express").Router();

router.get("/admin-products", adminController.adminProducts);
router.get("/statistics", adminController.getStatistics);

router.get("/product/:id", adminController.getAdminProduct);
router.put("/update-product/:id", adminController.adminUpdateProduct);

router.get("/admin-categories", adminController.adminCategories);
router.get("/admin-category/:id", adminController.adminCategory);
router.put("/admin-category-update/:id", adminController.adminCategoryUpdate);
router.delete(
  "/admin-category-delete/:id",
  adminController.adminCategoryDelete,
);

router.post("/add-product", adminController.addProduct);
router.post("/add-category", adminController.addCategory);

router.put("/update-active/:id", adminController.updateProductActive);

router.delete("/delete-product/:id", adminController.deleteProduct);

module.exports = router;
