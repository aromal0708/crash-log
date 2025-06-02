// Description: Controller for handling error ingestion in the application.


//Import necessary modules
import { NextFunction, Request, Response } from "express";
import { Project } from "../models/Project";

/**
 * Middleware to verify API key from request headers.
 * It checks if the API key is present and valid,
 * and attaches the project to the request object if valid.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Next function to call the next middleware
 */
export const verifyApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const apiKey = req.headers["x-api-key"] as string;

  if (!apiKey) {
    res.status(401).json({
      success: false,
      message: "API key is required",
    });
    return;
  }

  const project = await Project.findOne({ apiKey });
  if(!project){
    res.status(401).json({
        success: false,
        message: "Invalid API key",
    });
    return;
  }

  (req as any).project = project;
  
  next();;


}
