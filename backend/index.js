import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import configurePassport from "./config/passport.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

configurePassport();

app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`server up and running on port ${PORT}`);
});
