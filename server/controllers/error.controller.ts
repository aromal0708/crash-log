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
