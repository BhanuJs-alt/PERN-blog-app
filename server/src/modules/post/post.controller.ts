import * as postRepository from "./post.repository.ts";
import { Request, Response } from "express";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, imageUrl } = req.body;
    const authorId = req.user?.id;

    if (!authorId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const post = await postRepository.createPost({
      title: title.trim(),
      content: content.trim(),
      imageUrl,
      authorId,
    });
    res.status(201).json(post);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
