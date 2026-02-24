const productModel = require("../models/product-model");

class UserController {
  async topProducts(req, res) {
    try {
      const topProducts = await productModel.find({ top: true, active: true });
      res.json({ products: topProducts });
    } catch (err) {
      console.log(err);
    }
  }

  async getProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await productModel.findById(id);

      res.status(200).json({ product });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new UserController();
