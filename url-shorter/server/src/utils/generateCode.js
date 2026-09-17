import crypto from "crypto";

/**
 * Generate a 6 character code to generate the unique code
 */

const generateCode = () => {
  const mainString =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let shortCode = "";
  for (let i = 0; i < 6; i++) {
    shortCode += mainString.charAt(Math.floor(Math.random() * 62));
  }
  return shortCode;
};
export default generateCode;
