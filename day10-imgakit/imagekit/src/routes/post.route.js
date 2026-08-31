import express from "express";
import { upload } from "../config/multer.config";
import postCreateController, {
  getAllPost,
} from "../controllers/post.controller";

const router = express.Router();

router.post("/create", upload.single("image"), postCreateController);

router.get("/getpost", getAllPost);

export default router;
