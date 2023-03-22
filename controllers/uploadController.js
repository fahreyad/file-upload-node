const { StatusCodes } = require("http-status-codes");
const path = require("path");
const fs = require("fs");
const customError = require("../errors");
const cloudinary = require("cloudinary").v2;
const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new customError.BadRequest("no image to upload");
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new customError.BadRequest("only image suported");
  }
  if (productImage.size > 1024 * 1024) {
    throw new customError.BadRequest("image size is more then 1k");
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: { src: `/uploads/${productImage.name}` } });
};
const uploadProductImage = async (req, res) => {
  const { public_id } = req.body;
  if (public_id) {
    await cloudinary.uploader.destroy(public_id);
  }
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-uploads",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: { src: result.secure_url, public_id: result.public_id } });
};

module.exports = {
  uploadProductImage,
  uploadProductImageLocal,
};
