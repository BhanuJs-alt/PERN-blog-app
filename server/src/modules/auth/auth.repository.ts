import { UserCreateInput } from "../../generated/prisma/models.ts";
import { prisma } from "../../config/db.ts";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const findUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      createdAt: true,
    },
  });
};

export const createUser = async (data: UserCreateInput) => {
  return await prisma.user.create({
    data: data,
  });
};
