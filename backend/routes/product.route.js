import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

// Get All Products
router.get("/", getProducts);

// Create Product
router.post("/", createProduct);

// Update a Product by id
router.put("/:id", updateProduct);

// Delete Product By id
router.delete("/:id", deleteProduct);

export default router;
