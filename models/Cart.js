const { Schema, model, Types } = require("mongoose");

const CartSchema = new Schema(
  {
    customer: {
      type: Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        type: Types.ObjectId,
        ref: "Product",
      },
    ],
    total: Number,
    quantity: Number
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cart", CartSchema);
