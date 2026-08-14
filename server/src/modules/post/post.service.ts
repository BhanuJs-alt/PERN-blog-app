import * as postRepository from "./post.repository.js";
import { CreatePostInput } from "../../types/post.types.ts";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.ts";

export const createPost = async (data: CreatePostInput) => {
  const { title, content, image, authorId } = data;

  if (!title.trim()) {
    throw new Error("Title is required");
  }

  if (!content.trim()) {
    throw new Error("Content is required");
  }
  let imageUrl: string | undefined;

  if (image) {
    const uploadedImage = await uploadToCloudinary(
      image.buffer,
      "blog-app/posts",
    );

    imageUrl = uploadedImage.secure_url;
  }

  return postRepository.createPost({
    title: title.trim(),
    content: content.trim(),
    imageUrl,
    authorId,
  });
};

export const getAllPosts = () => {
  return postRepository.findAllPosts();
};

export const getPostById = async (id: string) => {
  const post = await postRepository.findPostById(id);

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

export const updatePost = async (
  postId: string,
  userId: string,
  data: {
    title?: string;
    content?: string;
    imageUrl?: string;
  },
) => {
  const post = await postRepository.findPostOwner(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.authorId !== userId) {
    throw new Error("You are not allowed to edit this post");
  }

  if (data.title !== undefined && !data.title.trim()) {
    throw new Error("Title cannot be empty");
  }

  if (data.content !== undefined && !data.content.trim()) {
    throw new Error("Content cannot be empty");
  }

  return postRepository.updatePost(postId, {
    ...(data.title !== undefined && {
      title: data.title.trim(),
    }),
    ...(data.content !== undefined && {
      content: data.content.trim(),
    }),
    ...(data.imageUrl !== undefined && {
      imageUrl: data.imageUrl,
    }),
  });
};
export const deletePost = async (postId: string, userId: string) => {
  const post = await postRepository.findPostOwner(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.authorId !== userId) {
    throw new Error("You are not allowed to delete this post");
  }

  return postRepository.deletePost(postId);
};
