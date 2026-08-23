import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.ts";
import { getLikeStatus, likePost, unlikePost } from "./like.controller.ts";

const router = Router();

router.post("/like/:postId", authMiddleware, likePost);
router.delete("/unlike/:postId", authMiddleware, unlikePost);
router.get("/status/:postId", authMiddleware, getLikeStatus);

export default router;
