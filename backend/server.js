import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.get("/products", (req, res) => {
  res.send("products")
})

app.listen(port, ()=>{
  connectDB()
  console.log(`server up & running on http://localhost:${port}`);
})