const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");

const getProduct = async (req, res) => {
  const products = await Product.find();
  res.status(StatusCodes.OK).json({ success: "success", data: products });
};
const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json(product);
};

module.exports = {
  getProduct,
  createProduct,
};
