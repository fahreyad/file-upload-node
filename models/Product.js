const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Product", productSchema);
