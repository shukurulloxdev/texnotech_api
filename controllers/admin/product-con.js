const productModel = require("../../models/product-model");

class ProductController {
  async addProduct(req, res) {
    try {
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
}

module.exports = new ProductController();
