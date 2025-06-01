import { Router } from "express";
import { ingestError } from "../controllers/error.controller";

const router = Router();

router.post("/", ingestError);

export default router;
