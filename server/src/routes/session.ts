import express from "express";
import { createCheckoutSession } from "../controllers/session";

const router = express.Router();

router.post("/", createCheckoutSession);

export default router;
