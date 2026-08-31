import postModel from "../model/post.model";
import { sendFiles } from "../services/storage.service";

export const postCreateController = async (req, res) => {
  const { caption } = req.body;
  const image = req.file;

  if (!caption || !image) {
    return res.status(400).json({
      success: false,
      message: "field are required",
    });
  }
  const uploadImage = await sendFiles(file.buffer, file.originalname);

  const post = await postModel.create({
    caption,
    image: uploadImage.url,
  });
  return res.status(201).json({
    success: true,
    message: "Post created",
  });
};

export const getAllPost = async (req, res) => {
  const post = postModel.find();

  return res.status(200).json({ success: true, message: "All post fetched" });
};
