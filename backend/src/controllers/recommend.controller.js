import { recommendRecipes } from "../services/recommend/recommend.service.js";

export async function recommend(req, res) {
  try {
    const { ingredients, diet, profile } = req.body;

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        error: "ingredients deve ser um array com pelo menos 1 item"
      });
    }

    const selectedProfile = diet || profile || "balanced";

    const result = await recommendRecipes({
      ingredients,
      profile: selectedProfile
    });

    res.json(result);
  } catch (err) {
    console.error("🔥 ERRO NO BACKEND:", err);

    res.status(500).json({
      error: err.message || "Erro interno"
    });
  }
}

