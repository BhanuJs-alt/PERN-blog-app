import { Router } from "express";
import { createComment, getCommentsByPostId, deleteComment } from "./comment.controller.ts";
import authmiddleware from "../../middleware/auth.middleware.ts";

const router = Router();

router.post("/:postId", authmiddleware, createComment);
router.get("/:postId", getCommentsByPostId);
router.delete("/:commentId", authmiddleware, deleteComment);

export default router;