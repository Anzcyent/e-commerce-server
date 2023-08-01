const { Schema, model, Types } = require("mongoose");

const CartSchema = new Schema(
  {
    customer: {
      type: Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        type: Object,
      },
    ],
    total: Number,
    quantity: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cart", CartSchema);
