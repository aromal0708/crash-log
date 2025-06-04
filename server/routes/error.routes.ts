// Description: Routes for error handling in the application.
// This module defines the routes for error ingestion, linking them to their respective controller functions.

// Import necessary modules
import { RequestHandler, Router } from "express";
import {
  getError,
  getErrorById,
  ingestError,
  updateErrorStatus,
} from "../controllers/error.controller";
import { verifyApiKey } from "../middleware/verifyApiKey";
import { verifyToken } from "../middleware/authenticateToken";
import { verifyProjectOwnership } from "../middleware/verifyProjectOwnership";

const router = Router();

router.post("/", verifyApiKey as RequestHandler, ingestError);
router.get(
  "/",
  verifyApiKey as RequestHandler,
  verifyProjectOwnership as RequestHandler,
  getError
);
router.get("/getError/:id", verifyToken as RequestHandler, getErrorById);
router.patch("/:id", verifyToken as RequestHandler, updateErrorStatus);

export default router;
