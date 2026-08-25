import * as commentRepository from "./comment.repository.ts";
import { findPostById } from "../post/post.repository.ts";

export const createComment = async (data: {
  content: string;
  userId: string;
  postId: string;
}) => {
  const post = await findPostById(data.postId);

  if (!post) {
    throw new Error("Post not found");
  }

  return commentRepository.createComment(data);
};

export const getCommentsByPostId = async (postId: string) => {
  const post = await findPostById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  return commentRepository.getCommentsByPostId(postId);
};

export const deleteComment = async (commentId: string, userId: string) => {
  const comment = await commentRepository.commentOwner(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }
  if (comment.authorId !== userId) {
    throw new Error("You are not authorized to delete this comment");
  }
  return commentRepository.deleteComment(commentId);
};
