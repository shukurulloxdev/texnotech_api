const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  top: { type: Boolean },
  discount: { type: Boolean },
  percent: { type: Number },
  images: [{ type: String }],
});

module.exports = model("Product", productSchema);
