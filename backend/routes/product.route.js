import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

const router = express.Router();

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    // console.log(products);
    res.status(200).json({
      success: true,
      message: "Fetch All Products Successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error Fetching products:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error Fetching Products!" });
  }
});

// Create Product
router.post("/", async (req, res) => {
  const product = await req.body;
  //console.log(product);
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide All Fields" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error Create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Update a Product by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Invalid Product id!");
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product id!" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: `Product with id: ${id} is Uptaed Successfully`,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error Updating product:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error Updating the product!" });
  }
});

// Delete Product By id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: `Product with id: ${id} is Deleted Successfully`,
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(404).json({ success: false, message: "Product Not Found!" });
  }
});

export default router;
