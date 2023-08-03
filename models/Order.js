const { Schema, model, Types } = require("mongoose");

const OrderSchema = new Schema(
  {
    customerId: {
      type: Types.ObjectId,
      ref: "User",
    },
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
    cart: {
      type: Types.ObjectId,
      ref: "Cart",
    },
    products: {
      type: Object
    },
    customerName: String
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", OrderSchema);
