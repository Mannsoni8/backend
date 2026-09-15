import userModel from "../model/auth.model.js";
import { generateToken, verifyRefreshToken } from "../utils/auth.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token is missing or not provided",
    });
  }

  try {
    // 1. Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // 2. Find user by id
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 3. Compare cookie token with stored token (token reuse detection / revocation)
    if (refreshToken !== user.refreshToken) {
      // Possible token reuse or revoked token
      return res.status(403).json({
        message: "Invalid or revoked refresh token",
      });
    }

    // 4. Generate new pair of tokens (Token Rotation)
    const { accessToken, refreshToken: newRefreshToken } = generateToken({
      userId: user._id,
    });

    // 5. Store new refresh token in DB
    user.refreshToken = newRefreshToken;
    await user.save();

    // 6. Send new refresh token as HTTP-only cookie
    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);

    return res.status(200).json({
      message: "Tokens refreshed successfully",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in refreshTokenController:", error);

    return res.status(401).json({
      message: "Invalid or expired refresh token",
      error: error.message,
    });
  }
};
