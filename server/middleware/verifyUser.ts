import { RequestHandler } from "express";

export const verifyUser: RequestHandler = async (req, res, next) => {
  try {
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized access. Please Login to continue",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User verified successfully",
      user:{
        id: user._id,
        name: user.name,
        email: user.email,
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      return;
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
      return;
    }
  }
}