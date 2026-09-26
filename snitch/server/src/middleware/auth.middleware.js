import { readAccessToken } from "../utils/auth.utils.js";

export function authenticate(req, res, next) {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(400).json({
      message: "Access token is not found in the request header",
    });
  }

  try {
    const decoded = readAccessToken(accessToken);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or ecpire accesstoken",
    });
  }
}

export function authenticateSeller(req, res) {
  if (req.user.role !== "seller") {
    return res.status(403).json({
      message: "Forbidden access, only a seller can unlist the products",
    });
  }
}
