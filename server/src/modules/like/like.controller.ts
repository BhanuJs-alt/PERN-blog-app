import { Request, Response } from "express";
import * as likeService from "./like.service.ts";

export const likePost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { postId } = req.params;

    const like = await likeService.likePost(req.user.id, postId);

    return res.status(200).json({
      message: "Post liked successfully",
      like,
    });
  } catch (error) {
    console.error(error);

    const message =
      error instanceof Error ? error.message : "Failed to like post";

    const status = message === "Post not found" ? 404 : 400;

    return res.status(status).json({
      message,
    });
  }
};

export const unlikePost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { postId } = req.params;

    const unlike = await likeService.unlikePost(req.user.id, postId);

    return res.status(200).json({
      message: "Post unliked successfully",
      unlike,
    });
  } catch (error) {
    console.error(error);

    const message =
      error instanceof Error ? error.message : "Failed to unlike post";

    const status = message === "Post not found" ? 404 : 400;

    return res.status(status).json({
      message,
    });
  }
};
