const { Schema, model, Types } = require("mongoose");

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Prodcut must have an title"],
      maxlength: [100, "Please provide maximum 100 characters for title."],
      unique: true,
    },
    description: {
      type: String,
      maxlength: [
        500,
        "Please provide maximum 500 characters for description.",
      ],
    },
    seller: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Prodcut must have a owner"],
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: [true, "Product must have a category"],
    },
    price: {
      type: Number,
      required: [true, "Product must have a price"],
    },
    unitsInStock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    image: {
      type: String,
      default: "/assets/product.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", ProductSchema);
