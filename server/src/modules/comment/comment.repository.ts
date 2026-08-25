import { prisma } from "../../config/db.ts";

export const createComment = async (data: {
  content: string;
  userId: string;
  postId: string;
}) => {
  return await prisma.comment.create({
    data: {
      content: data.content,

      author: {
        connect: {
          id: data.userId,
        },
      },

      post: {
        connect: {
          id: data.postId,
        },
      },
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

export const getCommentsByPostId = async (postId: string) => {
  return await prisma.comment.findMany({
    where: {
      postId,
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
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deleteComment = async (commentId: string) => {
  return await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
};

export const commentOwner = async (commentId: string) => {
  return await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    select: {
      id: true,
      authorId: true,
    },
  });
};
