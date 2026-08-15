import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.ts";
import { likePost, unlikePost } from "./like.controller.ts";

const router = Router();

router.post("/like/:postId", authMiddleware, likePost);
router.delete("/unlike/:postId", authMiddleware, unlikePost);

export default router;
