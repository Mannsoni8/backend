import userModel from "../model/auth.model.js";
import { generateToken, verifyRefreshToken } from "../utils/auth.js";

export const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token is required",
    });
  }

  try {
    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Find user
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Compare cookie token with stored token
    if (refreshToken !== user.refreshToken) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateToken({
      userId: user._id,
    });

    // Store new refresh token
    user.refreshToken = newRefreshToken;
    await user.save();

    // Send new refresh token as cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Access token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
};
