const { Schema, model } = require("mongoose");

const categorySchema = Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    seoTitle: { type: String, required: true },
    seoDescription: { type: String, required: true },
    active: { type: Boolean, default: true },
    image: { type: String, required: true },
  },
  { timestamps: true }, // ✅ createdAt, updatedAt avtomatik bo‘ladi);
);

module.exports = model("Category", categorySchema);
