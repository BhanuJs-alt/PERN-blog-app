import * as likeRepository from "./like.repository.js";
import { prisma } from "../../lib/db.ts";

export const likePost = async (userId: string, postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  const existingLike = await likeRepository.findLike(userId, postId);

  if (existingLike) {
    throw new Error("Post already liked");
  }

  return likeRepository.createLike(userId, postId);
};

export const unlikePost = async (userId: string, postId: string) => {
  const existingLike = await likeRepository.findLike(userId, postId);

  if (!existingLike) {
    throw new Error("Post is not liked");
  }

  return likeRepository.deleteLike(userId, postId);
};
