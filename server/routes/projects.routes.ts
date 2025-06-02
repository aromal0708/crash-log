// Description: Routes for user authentication in the application.
// This module defines the routes for user registration and login, linking them to their respective controller functions.


//Import necessary modules
import { RequestHandler, Router } from "express";
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectByApiKey,
} from "../controllers/projects.controller";
import { verifyToken } from "../middleware/authenticateToken";

const router = Router();

router.post("/", verifyToken as RequestHandler, createProject);
router.get("/", verifyToken as RequestHandler, getProjects);
router.get("/:id", verifyToken as RequestHandler, getProjectById);
router.get("/get/:apiKey", verifyToken as RequestHandler, getProjectByApiKey);
router.put("/update/:id", verifyToken as RequestHandler, updateProject);
router.delete("/delete/:id", verifyToken as RequestHandler, deleteProject);

export default router;
