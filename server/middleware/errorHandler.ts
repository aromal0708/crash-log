import { Request, Response, NextFunction } from "express";
import { overRideConsoleText } from "../../lib/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  overRideConsoleText();
  const statusCode = res.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  if (console.text) {
    console.text(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
