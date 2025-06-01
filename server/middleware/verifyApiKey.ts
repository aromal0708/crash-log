import { NextFunction, Request, Response } from "express";
import { Project } from "../models/Project";

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
