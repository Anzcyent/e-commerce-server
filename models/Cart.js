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
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cart", CartSchema);
