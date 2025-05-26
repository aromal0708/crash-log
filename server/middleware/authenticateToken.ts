import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authRequest } from "../types/global";
import { User } from "../models/User";

export const verifyToken = async (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Please Login to continue",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Please Login to continue",
      });
    }
    const user = await User.findById(decoded.userId).select("-password -__v");
    if (!user) {
      throw new Error("User not found");
    }
    req.user = { _id: decoded.userId, name: user.name, email: user.email };
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
