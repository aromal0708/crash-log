// Description: Routes for user authentication in the application.
// This module defines the routes for user registration and login, linking them to their respective controller functions.

// Import necessary modules
import { Router, RequestHandler } from "express";
import { register, login } from "../controllers/auth.controller";

const router = Router();



router.post("/register", register as RequestHandler);
router.post("/login", login as RequestHandler);

export default router;
