import urlModel from "../model/url.model.js";
import generateCode from "../utils/generateCode.js";

export const getUrlShortcodeController = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: "Please enter a URL",
    });
  }

  if (
    !url.startWith("http://") == false &&
    !url.startWith("https://") == false
  ) {
    return res.status(400).json({
      error: "Please enter a valid URL start with http:// or https://",
    });
  }

  if (url.length > 2048) {
    return res.status(400).json({ error: "URL is to long" });
  }
};
