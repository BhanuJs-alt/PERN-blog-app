import { Router } from "express";
import { createPost } from "./post.controller.ts";
import authMiddleware from "../../middleware/auth.middleware.ts";

const router = Router();

router.post("/", authMiddleware, createPost);
export default router;
