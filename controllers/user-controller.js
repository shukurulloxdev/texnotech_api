const categoryModel = require("../models/category-model");
const orderModel = require("../models/order-model");
const productModel = require("../models/product-model");
const jwt = require("jsonwebtoken");

class UserController {
  async getProducts(req, res) {
    try {
      const { searchQuery, filter, category, page, pageSize } = req.query;

      const skipAmount = (+page - 1) * +pageSize;

      let query = {};

      if (searchQuery.trim()) {
        const escapedSearchQuery = searchQuery.replace(
          /[.*+?^{}()|[\]\\]/g,
          "\\$&",
        );

        query.$or = [{ name: { $regex: new RegExp(escapedSearchQuery, "i") } }];
      }

      if (category === "tops") {
        query.top = true;
      } else if (category === "discounts") {
        query.discount = true;
      } else if (category) {
        const escapedCategory = category.replace(/[.*+?^{}()|[\]\\]/g, "\\$&");

        query.category = { $regex: new RegExp(escapedCategory, "i") };
      }

      let sortOptions = { createdAt: -1 };

      if (filter === "newest") {
        sortOptions = { createdAt: -1 };
      } else if (filter === "oldest") {
        sortOptions = { createdAt: 1 };
      }

      const products = await productModel
        .find(query)
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(+pageSize);

      const totalProduct = await productModel.countDocuments(query);

      const isNext = totalProduct > skipAmount + products.length;

      return res.json({ products, isNext, totalProduct });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
  }

  async getAllProducts(req, res) {
    try {
      const { searchQuery } = req.query;

      let query = {};
      if (searchQuery && searchQuery.trim()) {
        const escapedSearchQuery = searchQuery.replace(
          /[.*+?^{}()|[\]\\]/g,
          "\\$&",
        );

        query.$or = [{ name: { $regex: new RegExp(escapedSearchQuery, "i") } }];
      }

      const products = await productModel.find({ ...query, active: true });

      return res.json({ products });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async getCategories(req, res) {
    try {
      console.log(req);
      const categories = await categoryModel.find({ active: true });
      res.json({ categories });
    } catch (err) {
      console.log(err);
    }
  }

  async getFavorites(req, res) {
    try {
      const { ids } = req.body;

      const products = await productModel.find({ _id: { $in: ids } });
      res.json({ products });
    } catch (err) {
      console.log(err);
    }
  }
  async getBasketProducts(req, res) {
    try {
      const { ids } = req.body;

      const products = await productModel.find({ _id: { $in: ids } });
      res.json({ products });
    } catch (err) {
      console.log(err);
    }
  }
  async topProducts(req, res) {
    try {
      const topProducts = await productModel
        .find({ top: true, active: true })
        .sort({ createdAt: -1 });
      res.json({ products: topProducts });
    } catch (err) {
      console.log(err);
    }
  }
  async discountProducts(req, res) {
    try {
      const discountProducts = await productModel
        .find({ discount: true, active: true })
        .sort({ createdAt: -1 });
      res.json({ products: discountProducts });
    } catch (err) {
      console.log(err);
    }
  }

  async getProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await productModel.findById(id);

      if (!product) return res.json({ failure: "Mahsulot topilmadi" });

      const byCategory = await productModel.find({
        category: product.category,
        active: true,
        _id: { $ne: product._id },
      });

      res.status(200).json({ product, products: byCategory });
    } catch (err) {
      console.log(err);
    }
  }
  async newOrders(req, res) {
    try {
      const token = req.cookies.token;
      if (!token) return res.json({ failure: "Token not found" });

      const jwtUser = jwt.verify(token, process.env.JWT_SECRET);
      if (!jwtUser) return res.json({ failure: "Invalid token" });
      const orders = await orderModel
        .find({
          userId: jwtUser._id,
          status: { $in: ["new", "process"] },
        })
        .sort({ createdAt: -1 })
        .populate({
          path: "products.productId",
          model: productModel,
          select: "name category images discount percent brand price percent",
        });

      return res.json({ orders });
    } catch (err) {
      console.log(err);
    }
  }
  async finishedOrders(req, res) {
    try {
      const token = req.cookies.token;
      if (!token) return res.json({ failure: "Token not found" });

      const jwtUser = jwt.verify(token, process.env.JWT_SECRET);
      if (!jwtUser) return res.json({ failure: "Invalid token" });

      const orders = await orderModel
        .find({
          userId: jwtUser._id,
          status: "finished",
        })
        .sort({ createdAt: -1 })
        .populate({
          path: "products.productId",
          model: productModel,
        });

      return res.json({ orders });
    } catch (err) {
      console.log(err);
    }
  }
  async getProductsByCategory(req, res) {
    try {
      const { category } = req.params;

      const products = await productModel.find({ category, active: true });

      return res.json({ products });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new UserController();
