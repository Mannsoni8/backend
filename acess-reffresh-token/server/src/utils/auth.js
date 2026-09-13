import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = ({ userId }) => {
  const accessToken = jwt.sign({ id: userId }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id: userId }, config.REFRESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  return { accessToken, refreshToken };
};

export function verifyAcessToken(token) {
  const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
  return decoded;
}

export function verifyRefreshToekn(token) {
  const decoded = jwt.verify(token, config.REFRESS_TOKEN_SECRET);
  return decoded;
}
