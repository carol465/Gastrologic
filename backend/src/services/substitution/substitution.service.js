import axios from "axios";
import { getAISubstitutes } from "../ai/ai.service.js";
import { getNutrition } from "../nutrition/nutrition.service.js";

function classifyIngredient(ingredient) {
    const map = {
    protein: ["chicken", "beef", "egg", "tofu", "fish"],
    carb: ["rice", "pasta", "bread", "potato"],
    dairy: ["milk", "cheese", "butter", "cream"],
    vegetable: ["onion", "garlic", "carrot", "pepper", "tomato"],
    fat: ["oil", "butter"]
  };

  const name = ingredient.toLowerCase();

  for (const type in map) {
    if (map[type].some(i => name.includes(i))) {
      return type;
    }
  }

  return "other";
}

const substitutesByCategory = {
  protein: ["tofu", "lentils", "chickpeas", "turkey"],
  carb: ["quinoa", "couscous", "sweet potato"],
  dairy: ["almond milk", "soy milk", "oat milk"],
  vegetable: [
    "onion", "shallots", "leek", "zucchini",
    "carrot", "celery", "bell pepper", "spinach"
  ],
  fat: ["olive oil", "avocado"]
};

const baseSubstitutes = {
  chicken: ["tofu", "turkey", "chickpeas"],
  beef: ["lentils", "mushrooms"],
  milk: ["almond milk", "soy milk", "oat milk"],
  butter: ["olive oil", "margarine"],
  rice: ["quinoa", "cauliflower rice"],
  egg: ["flaxseed", "chia seeds"],
  cheese: ["vegan cheese", "nutritional yeast"],
  garlic: ["onion", "shallots"],
  onion: ["leek", "shallots"],
  tomato: ["roasted red pepper", "sun-dried tomatoes"],
  pasta: ["zucchini noodles", "spaghetti squash"],
  potato: ["sweet potato", "cauliflower"]
};

// 🔹 filtra por dieta
function filterByProfile(subs, profile) {
  if (!subs) return [];

  if (profile === "vegan") {
    return subs.filter(s =>
      !["turkey", "cheese"].some(x => s.includes(x))
    );
  }

  if (profile === "vegetarian") {
    return subs.filter(s =>
      !["turkey"].some(x => s.includes(x))
    );
  }

  return subs;
}

// 🥈 Spoonacular
async function getFromSpoonacular(ingredient) {
  try {
    const res = await axios.get(
      "https://api.spoonacular.com/food/ingredients/substitutes",
      {
        params: {
          ingredientName: ingredient,
          apiKey: process.env.SPOONACULAR_API_KEY
        }
      }
    );

    const subs = res.data.substitutes;

    return subs?.length ? subs.slice(0, 5) : null;
  } catch {
    return null;
  }
}

// 🧠 MAIN
export async function getSubstitutes(
  ingredient,
  profile = "balanced",
  userIngredients = []
) {
  const key = (ingredient || "").toLowerCase();

  const ignoreList = ["salt", "water", "oil"];

  if (ignoreList.some(i => key.includes(i))) {
    return null;
  }
  
  // ❌ não substituir ingredientes do utilizador
  if (userIngredients.includes(key)) return null;

  // 🥇 base local
  let subs = baseSubstitutes[key];

  if (!subs) {
    const category = classifyIngredient(key);

    if (category === "other") {
      subs = ["onion", "garlic", "leek", "carrot", "celery", "bell pepper", "spinach"];
    } else {
      subs = substitutesByCategory[category];
    }
  }

  if (subs) {
    subs = filterByProfile(subs, profile);

    // ✅ EVITAR SUGERIR O MESMO INGREDIENTE
    subs = subs.filter(s => !s.toLowerCase().includes(key));
    if (!subs || subs.length === 0) return null;

    // 🔥 FILTRO NUTRICIONAL
    const originalNutrition = await getNutrition(key);

    const scoredSubs = await Promise.all(
      subs.map(async (s) => {
        const n = await getNutrition(s);

        const diff =
          Math.abs(n.protein - originalNutrition.protein) +
          Math.abs(n.carbs - originalNutrition.carbs) +
          Math.abs(n.fat - originalNutrition.fat);

        return { name: s, score: diff };
      })
    );

    // ordenar por mais parecido
    scoredSubs.sort((a, b) => a.score - b.score);

    return scoredSubs.slice(0, 3).map(s => ({
      name: s.name,
      similarity: Math.max(0, 100 - s.score)
    }));
  }

  // 🥈 Spoonacular (fallback)
  const apiSubs = await getFromSpoonacular(key);
  if (apiSubs) {
    const filtered = filterByProfile(apiSubs, profile);

    const originalNutrition = await getNutrition(key);

    const scoredSubs = await Promise.all(
      filtered.map(async (s) => {
        const n = await getNutrition(s);

        const diff =
          Math.abs(n.protein - originalNutrition.protein) +
          Math.abs(n.carbs - originalNutrition.carbs) +
          Math.abs(n.fat - originalNutrition.fat);

        return { name: s, score: diff };
      })
    );

    scoredSubs.sort((a, b) => a.score - b.score);

    return scoredSubs.slice(0, 4).map(s => ({
      name: s.name,
      similarity: Math.max(0, 100 - s.score)
    }));
  }

  // 🥉 OpenAI (último fallback)
  const aiSubs = await getAISubstitutes(key, profile);

  if (aiSubs && aiSubs.length) {
    return aiSubs.map(s => ({
      name: s,
      similarity: 60 // valor base (IA não é precisa)
    }));
  }

  // 🆘 fallback FINAL (nunca vazio)
  return [
    {
      name: "No good substitute found",
      similarity: 0
    }
  ];
}