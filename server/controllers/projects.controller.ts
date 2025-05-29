import { Response } from "express";
import { authRequest } from "../types/global";
import { Project } from "../models/Project";
import { User } from "../models/User";
import { generateApiKey } from "../utils/generateApiKey";

export const getProjects = async (
  req: authRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;

    const user = await User.findById(userId);
    console.log({ "User ID:": userId, user: user });

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "User not found. Please login to continue",
      });
      return;
    }
    const projects = await Project.find({ userId });
    // console.log(projects);
    if (!projects || projects.length === 0) {
      res.status(404).json({
        success: false,
        message: "No Projects found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      projects,
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

export const createProject = async (
  req: authRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(400).json({
        success: false,
        message: "User not found. Please login to continue",
      });
      return;
    }

    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
      return;
    }

    const existingProject = await Project.find({ name, user: userId });
    if (existingProject && existingProject.length > 0) {
      res.status(400).json({
        success: false,
        message: "Project with this name already exists",
      });
      return;
    }

    //Generate a unique API key for the project
    const apiKey: string = generateApiKey();

    const project = new Project({
      name,
      description,
      userId,
      apiKey,
    });

    await project.save();

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { projects: project._id },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
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

export const getProjectById = async (
  req: authRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(400).json({
        success: false,
        message: "User not found. Please login to continue",
      });
      return;
    }
    const projectId: string = req.params.id;
    if (!projectId) {
      res.status(400).json({
        success: false,
        message: "No such project found",
      });
      return;
    }
    const project = await Project.findOne({ _id: projectId, userId: userId });
    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "project fetched successfully",
      project,
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

export const updateProject = async (
  req: authRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "User not found. Please login to continue",
      });
      return;
    }
    const projectId: string = req.params.id;
    if (!projectId) {
      res.status(400).json({
        success: false,
        message: "Invalid request.",
      });
      return;
    }

    const existingProject = await Project.findOne({
      _id: projectId,
      userId: userId,
    });
    if (!existingProject) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
      return;
    }
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId, userId: userId },
      { name, description },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
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

export const deleteProject = async (
  req: authRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(400).json({
        success: false,
        message: "User not found. Please login to continue",
      });
      return;
    }
    const projectId: string = req.params.id;
    if (!projectId) {
      res.status(400).json({
        success: false,
        message: "Invalid request.",
      });
      return;
    }
    const exisingProject = await Project.findOne({
      __id: projectId,
      userId: userId,
    });
    if (!exisingProject) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }
    await Project.findOneAndDelete({ _id: projectId, userId: userId });
    await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { projects: projectId } }
    );

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
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
export const getProjectByApiKey = async (
  req: authRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "User not found. Please login to continue",
      });
      return;
    }
    const apiKey: string = req.params.apiKey;
    if (!apiKey) {
      res.status(400).json({
        success: false,
        message: "API key is required",
      });
      return;
    }
    const project = await Project.findOne({ apiKey: apiKey, userId: userId });
    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      project,
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
