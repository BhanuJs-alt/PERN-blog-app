import * as postRepository from "./post.repository.js";
import { CreatePostInput } from "../../types/post.types.ts";

export const createPost = async (data: CreatePostInput) => {
  const { title, content, imageUrl, authorId } = data;

  if (!title.trim()) {
    throw new Error("Title is required");
  }

  if (!content.trim()) {
    throw new Error("Content is required");
  }

  return postRepository.createPost({
    title: title.trim(),
    content: content.trim(),
    imageUrl,
    authorId,
  });
};
