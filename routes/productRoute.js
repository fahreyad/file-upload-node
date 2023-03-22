const express = require("express");
const router = express.Router();
const {
  getProduct,
  createProduct,
} = require("../controllers/productController");
const { uploadProductImage } = require("../controllers/uploadController");

router.route("/").get(getProduct).post(createProduct);
router.route("/uploads").post(uploadProductImage);

module.exports = router;
