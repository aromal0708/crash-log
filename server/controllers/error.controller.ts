//Controller for handling error ingestion in the application.

//Import necessary modules
import { Request, Response } from "express";
import { Error } from "../models/Error";
import { authRequest } from "../types/global";

// Function to handle error ingestion
// This function will be called when an error is ingested via the API
export const ingestError = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const project = (req as any).project;
    console.log(project);
    if (!project) {
      res.status(400).json({
        success: false,
        message: "No project found",
      });
      return;
    }
    // Extract error details from the request body
    const {
      message,
      stack,
      timestamp,
      fileName,
      severity,
      path,
      method,
      file,
      metadata,
    } = req.body;

    // Validate required fields
    if (!message || !timestamp || !fileName || !path || !method || !file) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }
    // Create a new error document
    const error = new Error({
      projectId: project._id,
      apiKey: project.apiKey,
      message,
      stack,
      timestamp,
      fileName: fileName,
      severity: severity || "error",
      path,
      method,
      file,
      metadata: metadata || {},
    });

    // Save the error document to the database
    await error.save();

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Error ingested successfully",
      data: {
        errorId: error._id,
        projectId: project._id,
      },
    });
  } catch (error) {
    // Handle errors and respond with appropriate status codes
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

//get errors in a project based on filters
export const getError = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId, severity, page = 1, limit = 10, from, to } = req.query;

    if (!projectId || typeof projectId !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid projectId",
      });
      return;
    }

    const query: any = { projectId };

    if (severity) query.severity = severity;

    if (from || to) {
      query.timestamp = {};
      if (from) query.timestamp.$gte = new Date(from as string);
      if (to) query.timestamp.$lte = new Date(to as string);
    }

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const [error, total] = await Promise.all([
      Error.find(query).sort({ timestamp: -1 }).skip(skip).limit(limitNumber),
      Error.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      message: "Errors fetched successfully",
      data: {
        errors: error,
        total: total,
        page: pageNumber,
        limit: limitNumber,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    return;
  }
};

export const getErrorById = async (
  req: authRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { errorId } = req.params;

    if (!errorId) {
      res.status(400).json({
        success: false,
        message: "Invalid errorId",
      });
      return;
    }

    const error = await Error.findById(errorId).populate("projectId");

    if (!error || !error.projectId) {
      res.status(404).json({
        success: false,
        message: "Error not found",
      });
      return;
    }

    //@ts-ignore
    if (error.projectId?.userId !== userId) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to access this error",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Error fetched successfully",
      data: error,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
    return;
  }
};

export const updateErrorStatus = async (
  req: authRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }
    const { errorId } = req.params;

    if (!errorId) {
      res.status(400).json({
        success: false,
        message: "Invalid errorId",
      });
      return;
    }

    const error = await Error.findById(errorId).populate("projectId");

    if (!error || !error.projectId) {
      res.status(404).json({
        success: false,
        message: "Error not found",
      });
      return;
    }

    //@ts-ignore
    if (error.projectId.userId.toString() !== userId.toString()) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to update this error",
      });
      return;
    }

    const { status } = req.body;
    if (!status || (status !== "resolved" && status !== "unresolved")) {
      res.status(400).json({
        success: false,
        message: "Invalid status",
      });
      return;
    }

    error.resolved = status === "resolved";
    await error.save();

    res.status(200).json({
      success: true,
      message: "Error status updated successfully",
      data: error,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
    return;
  }
};
