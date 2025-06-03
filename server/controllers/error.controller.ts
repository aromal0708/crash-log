//Controller for handling error ingestion in the application.

//Import necessary modules
import { Request, Response } from "express";
import { Error } from "../models/Error";

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


