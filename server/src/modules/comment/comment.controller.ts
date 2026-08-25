import * as commentServices from "./comment.service.ts";
import { Request, Response } from "express";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const userId = req.user?.id;
    const { postId } = req.params;

    const comment = await commentServices.createComment({
      content,
      userId,
      postId,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const comments = await commentServices.getCommentsByPostId(postId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?.id;

    await commentServices.deleteComment(commentId, userId);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
