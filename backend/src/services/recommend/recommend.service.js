import { parseMeasure } from "../nutrition/measureParser.js";
import { getNutrition } from "../nutrition/nutrition.service.js";
import {
  calculateRecipeTotals,
  calculateMacroPercentages,
  calculateMacroScore
} from "./macros.service.js";
import { resolveIngredient } from "./ingredient.service.js";
import {
  searchMealsByIngredient,
  getMealDetailsById,
  extractMealIngredients,
  ingredientMatches
} from "./themealdb.service.js";
import { getSubstitutes } from "../substitution/substitution.service.js";

// Normaliza texto
function normalizeText(text) {
  return (text || "").toLowerCase().trim();
}

// Remove duplicados
function removeDuplicateMeals(meals) {
  return [...new Map(meals.map(meal => [meal.idMeal, meal])).values()];
}

// Conta matches
function countMatchedIngredients(mealIngredients, resolvedIngredients) {
  let matchCount = 0;

  for (const ingredient of resolvedIngredients) {
    if (ingredientMatches(mealIngredients, ingredient.english)) {
      matchCount++;
    }
  }

  return matchCount;
}

// Filtros básicos
function passesBasicFilters(totals, filters = {}) {
  if (filters.maxCalories && totals.calories > filters.maxCalories) return false;
  if (filters.minProtein && totals.protein < filters.minProtein) return false;
  if (filters.maxCarbs && totals.carbs > filters.maxCarbs) return false;
  if (filters.maxFat && totals.fat > filters.maxFat) return false;

  return true;
}

// Score dieta
function getDietScore(mealIngredients, profile) {
  const ingredientsLower = mealIngredients.map(i =>
    normalizeText(i).replace(/[^a-z\s]/g, "")
  );

  const nonVegetarian = [
    "chicken", "beef", "pork", "fish",
    "ham", "bacon", "sausage", "tuna", "salmon"
  ];

  const nonVegan = [
    ...nonVegetarian,
    "milk", "egg", "cheese", "butter", "cream", "honey"
  ];

  for (const ing of ingredientsLower) {
    if (profile === "vegetarian") {
      if (nonVegetarian.some(item => ing.includes(item))) return 0;
    }

    if (profile === "vegan") {
      if (nonVegan.some(item => ing.includes(item))) return 0;
    }
  }

  return 10;
}

function calculateFinalScore(meal) {
  return (
    meal.dietScore * 0.4 +
    meal.macroScore * 0.4 +
    meal.matchCount * 0.2
  );
}

// 🚀 MAIN
export async function recommendRecipes({
  ingredients = [],
  profile = "balanced",
  filters = {}
}) {
  // 1. Resolver ingredientes
  const resolvedIngredients = [];

  for (const input of ingredients) {
    const resolved = await resolveIngredient(input);
    if (resolved?.english) {
      resolvedIngredients.push(resolved);
    }
  }

  // 2. Buscar receitas
  const mealResults = await Promise.all(
    resolvedIngredients.map(async i => {
      const meals = await searchMealsByIngredient(i.english);
      return meals.slice(0, 10);
    })
  );

  const allMeals = mealResults.flat().slice(0, 30);

  const uniqueMealsFromAPI = [
    ...new Map(allMeals.map(meal => [meal.idMeal, meal])).values()
  ];

  const detailedMeals = await Promise.all(
    uniqueMealsFromAPI.map(meal => getMealDetailsById(meal.idMeal))
  );

  const validDetails = detailedMeals.filter(Boolean);

  // 3. Processar receitas (PARALELO 🔥)
  const processedMeals = await Promise.all(
    validDetails.map(async (details) => {
      const mealIngredients = extractMealIngredients(details);
      
      const userIngredients = resolvedIngredients.map(i => i.english);

      const hasMainIngredient = resolvedIngredients.some(ing =>
        ingredientMatches(mealIngredients, ing.english)
      );
      
      if (!hasMainIngredient) return null;

      const matchCount = countMatchedIngredients(
        mealIngredients,
        resolvedIngredients
      );

      if (matchCount < 1) return null;

      const dietScore = getDietScore(mealIngredients, profile);

      if (profile === "vegan" && dietScore < 5) return null;
      if (profile === "vegetarian" && dietScore < 5) return null;

      const limitedIngredients = mealIngredients.slice(0, 6);

      const nutritionData = await Promise.all(
        limitedIngredients.map(async (item, index) => {
          const measure = details[`strMeasure${index + 1}`];
          const grams = parseMeasure(measure || "", item);

          return getNutrition(item, grams);
        })
      );

      const nutrition = calculateRecipeTotals(nutritionData);
      const macroPercentages = calculateMacroPercentages(nutrition);

      let macroScore = 0;
      if (["balanced", "high_protein", "low_carb"].includes(profile)) {
        macroScore = calculateMacroScore(
          nutrition,
          macroPercentages,
          profile
        );
      }

      if (!passesBasicFilters(nutrition, filters)) return null;

      const limitedIngredientsForSubstitutes = mealIngredients
        .slice(0, 4)
        .filter(ing => !userIngredients.includes(ing))
      ;

      const substitutes = await Promise.all(
        limitedIngredientsForSubstitutes.map(async (ing) => {
          const subs = await getSubstitutes(
            ing,
            profile,
            userIngredients
          );

          if (!subs) return null;

          return {
            original: ing,
            substitutes: subs
          };
        })
      ).then(res => res.filter(Boolean))
      
      const finalScore = calculateFinalScore({
        dietScore,
        macroScore,
        matchCount
      });

      return {
        idMeal: details.idMeal,
        name: details.strMeal,
        category: details.strCategory,
        area: details.strArea,
        instructions: details.strInstructions,
        thumbnail: details.strMealThumb,
        youtube: details.strYoutube,
        ingredients: mealIngredients,
        matchedIngredient: userIngredients,
        matchCount,
        nutrition,
        macroPercentages,
        macroScore,
        dietScore,
        finalScore,
        substitutes        
      };
    })
  );

  const validMeals = processedMeals.filter(Boolean);

  const uniqueMeals = removeDuplicateMeals(validMeals);

  // 🔁 fallback dieta
  if (uniqueMeals.length === 0 && profile !== "balanced") {
    console.log("⚠️ fallback with no profile filters");

    return recommendRecipes({
      ingredients,
      profile: "balanced",
      filters
    });
  }

  // 🔥 Ordenação
  uniqueMeals.sort((a, b) => b.finalScore - a.finalScore);

  return {
    message: "Recommendations generated successfully",
    profile,
    filtersApplied: filters,
    resolvedIngredients,
    totalRecipes: uniqueMeals.length,
    meals: uniqueMeals.slice(0, 9)
  };
}