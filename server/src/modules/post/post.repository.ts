import { prisma } from "../../lib/db.ts";
import { CreatePostInput } from "../../types/post.types.ts";

export const createPost = async (data: CreatePostInput) => {
  return await prisma.post.create({
    data,
  });
};
export const findAllPosts = () => {
  return prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findPostById = (id: string) => {
  return prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
};
export const updatePost = async (
  id: string,
  data: Partial<CreatePostInput>,
) => {
  return await prisma.post.update({
    where: {
      id,
    },
    data,
  });
};

export const deletePost = async (id: string) => {
  return await prisma.post.delete({
    where: { id },
  });
};

export const findPostOwner = async (postId: string) => {
  return await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true },
  });
};
