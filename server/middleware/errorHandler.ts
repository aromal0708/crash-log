//File to handle errors in express js

// Import necessary modules
import { Request, Response, NextFunction } from "express";
import { overRideConsoleText } from "../../lib/logger";

//express js middleware for error handling
// this middleware will be used in the express app to handle errors
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {


  overRideConsoleText();
  const statusCode = res.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  // Log the error to the console
  if (console.text) {
    console.text(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
