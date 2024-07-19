import express from "express";
import { createCheckoutSession } from "../controllers/session";

const router = express.Router();

// router.post("/create-checkout-session", createCheckoutSession);
router.post("/create-checkout-session", (req, res) => {
  res.json({ url: "Hi" });
});

export default router;
