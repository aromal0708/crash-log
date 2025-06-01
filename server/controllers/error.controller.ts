import { Request, Response } from "express";
import { Error } from "../models/Error";
import { Project } from "../models/Project";

export const ingestError = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const project = (req as any).project;
    if (!project) {
      res.status(400).json({
        success: false,
        message: "No project found",
      });
      return;
    }
    const {
      message,
      stack,
      timestamp,
      filename,
      severity,
      path,
      method,
      file,
      metadata,
    } = req.body;

    if (!message || !timestamp || !filename || !path || !method || !file) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }

    const error = new Error({
      projectId: project._id,
      apiKey: project.apiKey,
      message,
      stack,
      timestamp,
      fileName: filename,
      severity: severity || "error",
      path,
      method,
      file,
      metadata: metadata || {},
    });

    await error.save();

    await Project.findByIdAndUpdate(
      { _id: project._id },
      { $push: { errorRefs: error._id } }
    );
    
    res.status(201).json({
      success: true,
      message: "Error ingested successfully",
      data: {
        errorId: error._id,
        projectId: project._id,
      },
    });
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
};
