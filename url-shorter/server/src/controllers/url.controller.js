import urlModel from "../model/url.model.js";
import generateCode from "../utils/generateCode.js";

export const getUrlShortcodeController = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: "Please enter a URL",
    });
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return res.status(400).json({
      error: "Please enter a valid URL starting with http:// or https://",
    });
  }

  if (url.length > 2048) {
    return res.status(400).json({
      error: "URL is too long",
    });
  }

  const code = generateCode();

  const newUrl = await urlModel.create({
    originalUrl: url,
    shortCode: code,
  });

  return res.status(201).json({
    message: "URL shortened successfully",
    data: {
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
    },
  });
};

export const getUrl = async (req, res) => {
  const urls = await urlModel.find();

  return res.status(200).json({
    message: "URL fetched successfully",
    data: {
      urls,
    },
  });
};

export const codeUrlController = async (req, res) => {
  const { code } = req.params;

  const url = await urlModel.findOne({
    shortCode: code,
  });

  if (!url) {
    return res.status(404).json({
      error: "Short URL not found",
    });
  }

  res.redirect(302, url.originalUrl);

  await urlModel.findOneAndUpdate(
    {
      shortCode: code,
    },
    {
      $inc: { clicks: 1 },
    },
  );
};

export const deleteUrlController = async (req, res) => {
  const { id } = req.params;

  const url = await urlModel.findById(id);

  if (!url) {
    return res.status(404).json({
      error: "URL not found",
    });
  }

  await urlModel.findByIdAndDelete(id);

  return res.status(200).json({
    message: "URL deleted successfully",
  });
};
