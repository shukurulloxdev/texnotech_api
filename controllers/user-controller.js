const productModel = require("../models/product-model");

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
