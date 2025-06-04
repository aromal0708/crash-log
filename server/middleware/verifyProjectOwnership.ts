//Description: Middleware to verify if the user owns the project they are trying to access
// This middleware checks if the user is authorized to access the project based on their ownership.


//Import necessary modules
import { NextFunction, Response } from "express";
import { authRequest } from "../types/global";
import { Project } from "../models/Project";


export const verifyProjectOwnership = async (
  req: authRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    // Extract projectId from the request query parameters
    // Ensure that the projectId is provided in the request
    const projectId = req.query.projectId;

    // If projectId is not provided, return a 400 Bad Request response
    if (!projectId) {
      res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
      return;
    }

    //Extract userId from the request object
    // This assumes that the user is authenticated and their ID is stored in req.user
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    // Find the project by its ID and userId
    const project = await Project.findOne({ _id: projectId, userId });

    // If the project is not found, return a 404 Not Found response
    // This ensures that the user can only access projects they own
    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    next();

  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};