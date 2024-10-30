import express from "express";
import {
  getUsers,
  deleteUser,
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.post("/", protect, createUser);
router.get("/", protect, getUsers);
// router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

export default router;
