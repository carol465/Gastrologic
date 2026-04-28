import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authenticateToken, (req, res) => {
  res.json({
    message: "Acesso autorizado.",
    user: req.user
  });
});

export default router;