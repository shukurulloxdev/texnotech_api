const productModel = require("../../models/product-model");

class ProductController {
  async addProduct(req, res) {
    try {
      console.log(req.body);
      const product = await productModel.create(req.body);
      return res.status(201).json(product);
    } catch (err) {
      if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((e) => e.message);

        return res.status(400).json({
          success: false,
          type: "ValidationError",
          errors,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }

  async topProducts(req, res) {
    try {
      const topProducts = await productModel.find({ top: true });
      res.json(topProducts);
      console.log("Hamma top lar", topProducts);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new ProductController();
