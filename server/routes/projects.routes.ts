import { RequestHandler, Router } from "express";
import { getProjects,createProject } from "../controllers/projects.controller";
import { verifyToken } from "../middleware/authenticateToken";

const router = Router();

router.get("/projects", verifyToken as RequestHandler, getProjects);
router.post("/projects",verifyToken as RequestHandler,createProject);

export default router;
