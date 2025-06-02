// Description: Routes for error handling in the application.
// This module defines the routes for error ingestion, linking them to their respective controller functions.

// Import necessary modules
import { RequestHandler, Router } from "express";
import { ingestError } from "../controllers/error.controller";
import { verifyApiKey } from "../middleware/verifyApiKey";

const router = Router();

router.post("/", verifyApiKey as RequestHandler, ingestError);

export default router;
