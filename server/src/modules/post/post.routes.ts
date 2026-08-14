import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
} from "./post.controller.ts";

import authMiddleware from "../../middleware/auth.middleware.ts";
import { upload } from "../../middleware/upload.middleware.ts";

const router = Router();

router.post("/", authMiddleware, upload.single("image"), createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

router.post(
  "/upload-test",
  authMiddleware,
  upload.single("image"),
  (req, res) => {
    console.log(req.file);

    res.json({
      message: "File received",
      file: req.file
        ? {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
          }
        : null,
    });
  },
);
export default router;
