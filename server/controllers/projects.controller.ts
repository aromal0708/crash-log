// Controller for handling error ingestion in the application.

//Import necessary modules
import { Response } from "express";
import { authRequest } from "../types/global";
import { Project } from "../models/Project";
import { User } from "../models/User";
import { generateApiKey } from "../utils/generateApiKey";
import { Error } from "../models/Error";

// Endpoint to get all projects for a user
// This endpoint retrieves all projects associated with the authenticated user
export const getProjects = async (
  req: authRequest,
  res: Response
): Promise<void> => {
  try {
    // Get the user ID from the request object
    const userId = req.user?._id;
    // Validate the user ID
    if (!userId) {
      res.status(400).json({
        success: false,
        message: "User not found. Please login to continue",
      });
      return;
    }

    // Find the user by ID and log the user details
    const user = await User.findById(userId);

    // If the user is not found, return a 404 error
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // Find all projects associated with the user
    const projects = await Project.find({ userId });

    // If no projects are found, return a 404 error
    if (!projects || projects.length === 0) {
      res.status(404).json({
        success: false,
        message: "No Projects found",
      });
      return;
    }

    // Return the projects in the response
    res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    // Handle errors and respond with appropriate status code and message
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

// Controller for creating a new project
export const createProject = async (
  req: authRequest,
  res: Response
): Promise<void> => {
  try {
    // Get the user ID from the request object
    const userId = req.user?._id;

    // Validate the user ID
    if (!userId) {
      res.status(400).json({
        success: false,
        message: "User not found. Please login to continue",
      });
      return;
    }

    //Get the project details from the request body
    const { name, description } = req.body;

    // Validate the project details
    if (!name || !description) {
      res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
      return;
    }

    // Check if a project with the same name already exists for the user
    const existingProject = await Project.find({ name, user: userId });

    // If a project with the same name exists, return an error
    if (existingProject && existingProject.length > 0) {
      res.status(400).json({
        success: false,
        message: "Project with this name already exists",
      });
      return;
    }

    //Generate a unique API key for the project
    const apiKey: string = generateApiKey();

    // Create a new project instance
    const project = new Project({
      name,
      description,
      userId,
      apiKey,
    });

    // Save the project to the database
    await project.save();

    // Update the user document to include the new project
    // This will push the new project ID into the user's projects array
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { projects: project._id },
      },
      { new: true }
    );

    // Respond with success message and the created project
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    // Handle errors and respond with appropriate status code and message
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

// Controller for fetching a project by its ID
export const getProjectById = async (
  req: authRequest,
  res: Response
): Promise<void> => {
  try {
    // Get the user ID from the request object
    const userId = req.user?._id;

    // Validate the user ID
    if (!userId) {
      res.status(400).json({
        success: false,
        message: "User not found. Please login to continue",
      });
      return;
    }

    // Get the project ID from the request parameters
    const projectId: string = req.params.id;

    // Validate the project ID
    if (!projectId) {
      res.status(400).json({
        success: false,
        message: "No such project found",
      });
      return;
    }

    // Find the project by ID and user ID
    const project = await Project.findOne({ _id: projectId, userId: userId });

    // If the project is not found, return a 404 error
    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    // Return the project in the response
    res.status(200).json({
      success: true,
      message: "project fetched successfully",
      project,
    });
  } catch (error) {
    // Handle errors and respond with appropriate status code and message
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

// Controller for updating a project
export const updateProject = async (
  req: authRequest,
  res: Response
): Promise<void> => {
  try {
    // Get the user ID from the request object
    const userId = req.user?._id;

    // Validate the user ID
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "User not found. Please login to continue",
      });
      return;
    }

    // Get the project ID from the request parameters
    const projectId: string = req.params.id;

    // Validate the project ID
    if (!projectId) {
      res.status(400).json({
        success: false,
        message: "Invalid request.",
      });
      return;
    }

    // Check if the project exists for the user
    // This will ensure that the user can only update their own projects
    const existingProject = await Project.findOne({
      _id: projectId,
      userId: userId,
    });

    // If the project does not exist, return a 404 error
    if (!existingProject) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    // Get the updated project details from the request body
    const { name, description } = req.body;

    // Validate the updated project details
    if (!name || !description) {
      res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
      return;
    }

    // Update the project in the database
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId, userId: userId },
      { name, description },
      { new: true }
    );

    // If the project could not be updated, return a 404 error
    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {

    // Handle errors and respond with appropriate status code and message
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


// Controller for deleting a project
export const deleteProject = async (
  req: authRequest,
  res: Response
): Promise<void> => {
  try {

    // Get the user ID from the request object
    const userId = req.user?._id;

    // Validate the user ID
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "User not found. Please login to continue",
      });
      return;
    }

    // Get the project ID from the request parameters
    const projectId: string = req.params.id;

    // Validate the project ID
    // This will ensure that the user can only delete their own projects
    if (!projectId) {
      res.status(400).json({
        success: false,
        message: "Invalid request.",
      });
      return;
    }
    // Check if the project exists for the user 
    const existingProject = await Project.findOne({
      _id: projectId,
      userId: userId,
    });

    // If the project does not exist, return a 404 error
    if (!existingProject) {
      res.status(404).json({
        success: false,
        message: "Project not found or you do not have permission to delete it",
      });
      return;
    }

    // Delete the project from the database
    // This will remove the project from the user's projects array as well
    await Project.findOneAndDelete({ _id: projectId, userId: userId });
    await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { projects: projectId } }
    );

    // Delete all errors associated with the project
    await Error.deleteMany({ projectId: projectId });


    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {

    // Handle errors and respond with appropriate status code and message
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

// Controller for fetching a project by its API key
export const getProjectByApiKey = async (
  req: authRequest,
  res: Response
): Promise<void> => {
  try {
    // Get the user ID from the request object
    const userId = req.user?._id;

    // Validate the user ID
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "User not found. Please login to continue",
      });
      return;
    }

    // Get the API key from the request parameters
    const apiKey: string = req.params.apiKey;
    // Validate the API key
    if (!apiKey) {
      res.status(400).json({
        success: false,
        message: "API key is required",
      });
      return;
    }

    // Check if the project exists for the user with the given API key
    const project = await Project.findOne({ apiKey: apiKey, userId: userId });
    // If the project does not exist, return a 404 error
    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }
    // Return the project in the response
    res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      project,
    });
  } catch (error) {
    // Handle errors and respond with appropriate status code and message
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
