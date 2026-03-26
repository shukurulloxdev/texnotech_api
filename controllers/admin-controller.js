const categoryModel = require("../models/category-model");
const productModel = require("../models/product-model");
//salom
class AdminController {
  async addProduct(req, res) {
    try {
      console.log(req.body);
      const product = await productModel.create(req.body);
      return res.status(201).json({ status: 200 });
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
  async addCategory(req, res) {
    try {
      console.log(req.body);
      await categoryModel.create(req.body);
      return res.status(201).json({ status: 200 });
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

  async adminProducts(req, res) {
    try {
      const adminProducts = await productModel.find();

      res.json({ products: adminProducts });
    } catch (err) {
      console.log(err);
    }
  }
  async adminCategory(req, res) {
    try {
      const adminCategory = await categoryModel.find();

      res.json({ categories: adminCategory });
    } catch (err) {
      console.log(err);
    }
  }

  async updateProductActive(req, res) {
    try {
      const { id } = req.params;
      const product = await productModel.findById(id);

      product.active = !product.active;
      await product.save();

      return res.status(200).json({ product });
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      const deletedProduct = await productModel.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.json({
          failure: "Mahsulot o'chirilmadi ❌, Hato yuz berdi!",
        });
      }
      return res.json({ status: 200 });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new AdminController();
