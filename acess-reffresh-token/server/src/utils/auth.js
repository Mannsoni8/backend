import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = ({ userId }) => {
  const accessToken = jwt.sign({ id: userId }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id: userId }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export function verifyAccessToken(token) {
  return jwt.verify(token, config.ACCESS_TOKEN_SECRET);
}

// Backward compatibility alias for any existing typo
export const verifyAcessToken = verifyAccessToken;

export function verifyRefreshToken(token) {
  return jwt.verify(token, config.REFRESH_TOKEN_SECRET);
}
