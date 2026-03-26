const orderModel = require("../models/order-model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const productModel = require("../models/product-model");

class OrderController {
  async createOrder(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.json({ failure: "Cooke token not fount" });

      const jwtUser = jwt.verify(token, process.env.JWT_SECRET);
      if (!jwtUser) return res.json({ failure: "User not fount jwt" });

      const user = await userModel.findById(jwtUser._id);
      if (!user) return res.json({ failure: "User not fount DB" });

      const order = await orderModel.create({
        userId: user._id,
        ...req.body,
      });

      res.json({ order });
    } catch (err) {
      console.log(err);
    }
  }
  async adminOrders(req, res) {
    try {
      const orders = await orderModel.find().sort({ createdAt: -1 }).populate({
        path: "products.productId",
        model: productModel,
      });
      return res.json({ orders });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ failure: "Server error" });
    }
  }
  async adminOrderUpdate(req, res) {
    try {
      const orders = await orderModel
        .findByIdAndUpdate()
        .sort({ createdAt: -1 })
        .populate({
          path: "products.productId",
          model: productModel,
        });
      return res.json({ orders });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ failure: "Server error" });
    }
  }
}

module.exports = new OrderController();
