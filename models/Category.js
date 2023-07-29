const { Schema, model, Types } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category must have a name."],
      maxlength: [35, "Category name is too long!"],
      unique: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", CategorySchema);
