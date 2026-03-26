const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    // totalDiscount: {
    //   type: Number,
    // },
    totalPrice: {
      type: Number,
      required: true,
    },

    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        proTotalPrice: {
          type: Number,
          required: true,
        },
        onePrice: {
          type: Number,
          required: true,
        },
        _id: false,
      },
    ],
    status: {
      type: String,
      enum: ["new", "process", "finished"],
      default: "new",
    },
  },
  { timestamps: true },
);

module.exports = model("Order", orderSchema);
