import { prisma } from "../../lib/db.ts";
import { CreatePostInput } from "../../types/post.types.ts";

export const findPostById = async (id: string) => {
  return await prisma.post.findUnique({
    where: { id },
  });
};

export const createPost = async (data: CreatePostInput) => {
  return await prisma.post.create({
    data,
  });
};
