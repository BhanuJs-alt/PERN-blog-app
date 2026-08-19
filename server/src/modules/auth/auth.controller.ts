import * as authService from "./auth.service.ts";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authService.register(req.body);
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        user,
        token,
        message: "user registered successfully",
      });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authService.login(req.body);
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        user,
        token,
        message: "logged in successfully",
      });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new Error("Unauthorized");
    }

    const user = await authService.getCurrentUser(req.user.id);

    return res.status(200).json({
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
