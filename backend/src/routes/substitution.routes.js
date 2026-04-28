import { Router } from "express";
import { getSubstitutes } from "../services/substitution/substitution.service.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { ingredient, profile, userIngredients } = req.body;

    if (!ingredient) {
      return res.status(400).json({ error: "ingredient is required" });
    }

    const substitutes = await getSubstitutes(
      ingredient,
      profile,
      userIngredients || []
    );

    res.json(substitutes || []);
  } catch (error) {
    console.error("🔥 ERROR /substitutes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;