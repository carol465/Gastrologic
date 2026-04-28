// src/services/themealdb.service.js
// src/services/themealdb.service.js
import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

function normalizeApiIngredient(text) {
  if (!text) return "";

  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function extractMealIngredients(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(normalizeApiIngredient(ingredient));
    }
  }

  return ingredients;
}

function ingredientMatches(mealIngredients, targetIngredient) {
  const normalizedTarget = normalizeApiIngredient(targetIngredient);

  return mealIngredients.some((ingredient) => {
    const normalizedIngredient = normalizeApiIngredient(ingredient);

    return (
      normalizedIngredient === normalizedTarget ||
      normalizedIngredient.includes(normalizedTarget) ||
      normalizedTarget.includes(normalizedIngredient)
    );
  });
}

async function searchMealsByIngredient(ingredient) {
  try {
    const response = await axios.get(`${BASE_URL}/filter.php`, {
      params: { i: ingredient }
    });

    return response.data.meals || [];
  } catch (error) {
    console.error("Erro ao pesquisar receitas por ingrediente:", error.message);
    return [];
  }
}

async function getMealDetailsById(idMeal) {
  try {
    const response = await axios.get(`${BASE_URL}/lookup.php`, {
      params: { i: idMeal }
    });

    if (!response.data.meals || response.data.meals.length === 0) {
      return null;
    }

    return response.data.meals[0];
  } catch (error) {
    console.error("Erro ao buscar detalhes da receita:", error.message);
    return null;
  }
}

export {
  searchMealsByIngredient,
  getMealDetailsById,
  extractMealIngredients,
  normalizeApiIngredient,
  ingredientMatches
};