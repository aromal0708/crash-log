import { RequestHandler, Router } from "express";
import { ingestError } from "../controllers/error.controller";
import { verifyApiKey } from "../middleware/verifyApiKey";

const router = Router();

router.post("/", verifyApiKey as RequestHandler, ingestError);

export default router;
