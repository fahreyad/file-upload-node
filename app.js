require("dotenv").config();
const express = require("express");
const app = express();
require("express-async-errors");
const connectDB = require("./db/connection");
const notFound = require("./middlewares/not-found");
const errorHandlerMiddelware = require("./middlewares/errorHandler");
const productRouter = require("./routes/productRoute");
const PORT = process.env.PORT || 3000;
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.static("./public"));
app.get("/", (req, res) => {
  res.send("file upload");
});
//route
app.use("/api/v1/products", productRouter);

app.use(notFound);
app.use(errorHandlerMiddelware);

//listen
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listen at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
