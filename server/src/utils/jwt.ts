import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

export const createToken = (userId: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "2d",
    },
  );

  return token;
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
};
