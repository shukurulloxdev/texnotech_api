const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    avatar: {
      type: String,
      default:
        "https://bxa1fjo71q.ufs.sh/f/dU3lbSWmBykz3dzAEGCjTLIaEAei8wzkc0lYfdnMJWgH9u6b",
    },
  },
  { timestamps: true },
);

module.exports = model("User", userSchema);
