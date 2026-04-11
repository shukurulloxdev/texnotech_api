const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    count: { type: String },
    kafolat: { type: String },
    price: { type: Number, required: true },
    top: { type: Boolean },
    discount: { type: Boolean },
    active: { type: Boolean, default: true },
    percent: { type: Number },
    images: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = model("Product", productSchema);
