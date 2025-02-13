import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config();
import productRouter from "./routes/product.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json()); // to access json data in req.body

// products route
app.use("/api/products", productRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`server up & running on http://localhost:${PORT}`);
});
