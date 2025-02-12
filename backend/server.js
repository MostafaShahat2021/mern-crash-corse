import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config();
import Product from "./models/product.model.js";

const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json()); // to access json data in req.body

// Create Product endpoint
app.post("/api/products", async (req, res) => {
  const product = await req.body;
  //console.log(product);
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error Create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.listen(port, () => {
  connectDB();
  console.log(`server up & running on http://localhost:${port}`);
});
