import * as postService from "./post.service.ts";
import { Request, Response } from "express";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user?.id;

    if (!authorId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const post = await postService.createPost({
      title: title.trim(),
      content: content.trim(),
      image: req.file,
      authorId,
    });
    res.status(201).json(post);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();

    return res.status(200).json({
      posts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch posts",
    });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await postService.getPostById(id);

    return res.status(200).json({
      post,
    });
  } catch (error) {
    console.error(error);

    return res.status(404).json({
      message: error instanceof Error ? error.message : "Post not found",
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { id } = req.params;
    const { title, content, imageUrl } = req.body;

    const post = await postService.updatePost(id, req.user.id, {
      title,
      content,
      imageUrl,
    });

    return res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.error(error);

    const message =
      error instanceof Error ? error.message : "Failed to update post";

    const status =
      message === "Post not found"
        ? 404
        : message.includes("not allowed")
          ? 403
          : 400;

    return res.status(status).json({
      message,
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { id } = req.params;

    await postService.deletePost(id, req.user.id);

    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);

    const message =
      error instanceof Error ? error.message : "Failed to delete post";

    const status =
      message === "Post not found"
        ? 404
        : message.includes("not allowed")
          ? 403
          : 400;

    return res.status(status).json({
      message,
    });
  }
};
