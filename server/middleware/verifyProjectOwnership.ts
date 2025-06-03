import { NextFunction, Response } from "express";
import { authRequest } from "../types/global";
import { Project } from "../models/Project";

export const verifyProjectOwnership = async (
  req: authRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projectId = req.query.projectId || req.params.id;
    if (!projectId) {
      res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
      return;
    }
    const userId = req.user?._id;

    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    next();

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};