import { prisma } from "../../config/db.ts";

export const findLike = (userId: string, postId: string) => {
  return prisma.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });
};

export const createLike = (userId: string, postId: string) => {
  return prisma.like.create({
    data: {
      userId,
      postId,
    },
  });
};

export const deleteLike = (userId: string, postId: string) => {
  return prisma.like.delete({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });
};
