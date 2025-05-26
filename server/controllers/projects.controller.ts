import { Response } from "express";
import { authRequest } from "../types/global";
import { Project } from "../models/Project";
import { User } from "../models/User";

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

    const project = new Project({
      name,
      description,
      userId,
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
