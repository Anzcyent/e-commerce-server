const errorWrapper = require("express-async-handler");
const Product = require("../models/Product");
const Category = require("../models/Category");
const CustomError = require("../helpers/error/CustomError");

const search = errorWrapper(async (req, res, next) => {
    const { query } = req.query;

    const category = await Category.findOne({ name: { $regex: new RegExp(query, "i") } });

    let productsQuery = Product.find();

    if (query) {
        const queryRegex = new RegExp(query, "i");
        productsQuery = productsQuery.or([
            { title: { $regex: queryRegex } },
            { description: { $regex: queryRegex } },
            { category }
        ]);
    }

    const products = await productsQuery.exec();

    res.json({products});
});

module.exports = {search}
