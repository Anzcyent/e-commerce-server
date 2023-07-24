const { Schema, model, Types } = require("mongoose");

const OrderSchema = new Schema(
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
    totalPrice: {
      type: Number,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", OrderSchema);
