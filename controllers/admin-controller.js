const categoryModel = require("../models/category-model");
const orderModel = require("../models/order-model");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
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

  async adminCategories(req, res) {
    try {
      const adminCategory = await categoryModel.find();

      res.json({ categories: adminCategory });
    } catch (err) {
      console.log(err);
    }
  }
  async adminCategory(req, res) {
    try {
      const { id } = req.params;
      const adminCategory = await categoryModel.findById(id);

      res.json({ category: adminCategory });
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

  async adminUpdateProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await productModel.findByIdAndUpdate(
        id,
        req.body, // 🔥 shu yer muhim
        { new: true }, // 🔥 yangilanganini qaytaradi
      );

      if (!product) {
        return res.status(404).json({ failure: "Mahsulot topilmadi" });
      }

      return res.json({ status: 200 });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ failure: "Server error" });
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
  async adminCategoryDelete(req, res) {
    try {
      const { id } = req.params;

      const deletedCategory = await categoryModel.findByIdAndDelete(id);

      if (!deletedCategory) {
        return res.json({
          failure: "Katigoriya o'chirilmadi ❌, Hato yuz berdi!",
        });
      }
      return res.json({ status: 200 });
    } catch (err) {
      console.log(err);
    }
  }
  async adminCategoryUpdate(req, res) {
    try {
      const { id } = req.params;
      const { title, image, slug, seoTitle, seoDescription } = req.body;

      let updatedCategory;
      if (image) {
        updatedCategory = await categoryModel.findByIdAndUpdate(
          id,
          {
            image,
          },
          { new: true },
        );
      } else {
        updatedCategory = await categoryModel.findByIdAndUpdate(
          id,
          {
            title,
            slug,
            seoTitle,
            seoDescription,
          },
          { new: true },
        );
      }

      if (!updatedCategory) {
        return res.json({
          failure: "Mahsulot o'zgarmadi ❌, Hato yuz berdi!",
        });
      }
      return res.json({ status: 200 });
    } catch (err) {
      console.log(err);
    }
  }
  async getStatistics(req, res) {
    try {
      const result = await orderModel.aggregate([
        {
          $unwind: "$products",
        },
        {
          $group: {
            _id: null,
            totalPrice: { $sum: "$totalPrice" },
            ordersCount: { $sum: "$products.count" },
          },
        },
      ]);

      const totalOrderPrice = result[0]?.totalPrice ?? 0;
      const totalOrder = result[0]?.ordersCount ?? 0;

      const totalProduct = await productModel.countDocuments({ active: true });
      const totalUser = await userModel.countDocuments();

      return res.json({
        totalOrder,
        totalOrderPrice,
        totalProduct,
        totalUser,
      });
    } catch (err) {
      console.log(err);
    }
  }
  async getAdminProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await productModel.findById(id);

      return res.json({ product });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new AdminController();
