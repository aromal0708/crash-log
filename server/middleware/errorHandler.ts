import { Request, Response, NextFunction } from "express";
import { overRideConsoleText } from "../../lib/logger";
import { extractFileName } from "../../lib/extractFileName";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const fileName = extractFileName(err.stack);
  overRideConsoleText();
  const statusCode = res.statusCode || 500;
  const message = err.message || "Internal Server Error";
  if (console.text) {
    console.text(
      `[${req.method}] ${req.originalUrl} (${
        fileName ? fileName : undefined
      }) -> ${message}`
    );
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
