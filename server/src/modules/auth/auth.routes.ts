import { Router } from "express";
import { register, login, getCurrentUser, logout } from "./auth.controller.ts";
import authMiddleware from "../../middleware/auth.middleware.ts";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", authMiddleware, getCurrentUser);
router.post("/logout", logout);

export default router;
