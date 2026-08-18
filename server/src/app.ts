import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.ts";
import postRoutes from "./modules/post/post.routes.ts";
import likeRoutes from "./modules/like/like.routes.ts";
import commentRoutes from "./modules/comment/comment.routes.ts";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
));

app.get("/", (_req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);

export default app;
