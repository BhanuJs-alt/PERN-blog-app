import { Request, Response, NextFunction } from "express";
import { findUserById } from "../modules/auth/auth.repository.ts";
import { verifyToken } from "../utils/jwt.ts";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const payload = verifyToken(token);
    if (!payload) {
      throw new Error("Invalid token");
    }
    const user = await findUserById(payload.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch (error: any) {
    next(error);
  }
};

export default authMiddleware;
