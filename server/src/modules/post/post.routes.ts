import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
} from "./post.controller.ts";

import authMiddleware from "../../middleware/auth.middleware.ts";

const router = Router();

router.post("/", authMiddleware, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
