import { RequestHandler, Router } from "express";
import { getProjects, createProject } from "../controllers/projects.controller";
import { verifyToken } from "../middleware/authenticateToken";

const router = Router();

router.post("/", verifyToken as RequestHandler, createProject);
router.get("/", verifyToken as RequestHandler, getProjects);

export default router;
