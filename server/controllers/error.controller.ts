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
    // Extract query parameters from the request
    const { projectId, severity, page = 1, limit = 10, from, to } = req.query;

    // Validate projectId
    if (!projectId || typeof projectId !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid projectId",
      });
      return;
    }

    //Extract and validate other query parameters
    const query: any = { projectId };

    if (severity) query.severity = severity;

    // Validate pagination parameters
    if (from || to) {
      query.timestamp = {};
      if (from) query.timestamp.$gte = new Date(from as string);
      if (to) query.timestamp.$lte = new Date(to as string);
    }

    // Validate page and limit parameters
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // Validate pagination parameters
    const [error, total] = await Promise.all([
      Error.find(query).sort({ timestamp: -1 }).skip(skip).limit(limitNumber),
      Error.countDocuments(query),
    ]);

    //Return success response with the errors and total count
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
    // Handle errors and respond with appropriate status codes
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    return;
  }
};

// Function to get a specific error by its ID
// This function will be called when a specific error is requested via the API
export const getErrorById = async (
  req: authRequest,
  res: Response
): Promise<void> => {
  try {
    // Extract user ID from the request
    const userId = req.user?._id;
    // Check if user ID is present
    // If not, respond with an unauthorized status
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    // Extract error ID from the request parameters
    const { errorId } = req.params;

    // Check if error ID is present
    // If not, respond with a bad request status
    if (!errorId) {
      res.status(400).json({
        success: false,
        message: "Invalid errorId",
      });
      return;
    }

    // Find the error by its ID and populate the projectId field
    const error = await Error.findById(errorId).populate("projectId");


    // Check if the error was found and if it has a projectId
    if (!error || !error.projectId) {
      res.status(404).json({
        success: false,
        message: "Error not found",
      });
      return;
    }

    // Check if the user has permission to access the error
    // If the user ID does not match the projectId's userId, respond with a forbidden status

    //@ts-ignore
    if (error.projectId?.userId !== userId) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to access this error",
      });
      return;
    }

    // Respond with success and the error data
    res.status(200).json({
      success: true,
      message: "Error fetched successfully",
      data: error,
    });
  } catch (err) {
    // Handle errors and respond with appropriate status codes
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
    return;
  }
};

// Function to update the status of an error
// This function will be called when an error's status is updated via the API
export const updateErrorStatus = async (
  req: authRequest,
  res: Response
): Promise<void> => {
  try {
    // Extract user ID from the request
    const userId = req.user?._id;

    // Check if user ID is present
    // If not, respond with an unauthorized status
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    // Extract error ID from the request parameters
    const { errorId } = req.params;

    // Check if error ID is present
    // If not, respond with a bad request status
    if (!errorId) {
      res.status(400).json({
        success: false,
        message: "Invalid errorId",
      });
      return;
    }

    // Find the error by its ID and populate the projectId field
    const error = await Error.findById(errorId).populate("projectId");

    // Check if the error was found and if it has a projectId
    if (!error || !error.projectId) {
      res.status(404).json({
        success: false,
        message: "Error not found",
      });
      return;
    }

    // Check if the user has permission to update the error
    // If the user ID does not match the projectId's userId, respond with a forbidden status
    //@ts-ignore
    if (error.projectId.userId.toString() !== userId.toString()) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to update this error",
      });
      return;
    }


    // Check if the request body contains a valid status
    // If not, respond with a bad request status
    const { status } = req.body;
    if (!status || (status !== "resolved" && status !== "unresolved")) {
      res.status(400).json({
        success: false,
        message: "Invalid status",
      });
      return;
    }

    // Update the error's resolved status based on the provided status
    // If the status is "resolved", set resolved to true; otherwise, set it to false
    error.resolved = status === "resolved";
    await error.save();

    // Respond with success and the updated error data
    res.status(200).json({
      success: true,
      message: "Error status updated successfully",
      data: error,
    });
  } catch (err) {
    // Handle errors and respond with appropriate status codes
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
    return;
  }
};
