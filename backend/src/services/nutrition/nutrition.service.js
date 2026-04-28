import { getUSDAData } from "./usda.service.js";
import { getOFFData } from "./openfoodfacts.service.js";
import { normalizeIngredientName } from "../recommend/ingredientNormalizer.js";

const DEBUG = false;
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 60; // 1 hora

function log(message) {
  if (DEBUG) console.log(`[NUTRITION] ${message}`);
}

// 🔁 Cache com TTL
function setCache(key, value) {
  cache.set(key, {
    data: value,
    timestamp: Date.now()
  });
}

function getCache(key) {
  const entry = cache.get(key);

  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > CACHE_TTL;

  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

// 🔄 Normalização (por 100g → quantidade estimada)
function normalize(data, grams = 100) {
    const factor = grams / 100;

    return {
    calories: (data?.calories || 0) * factor,
    protein: (data?.protein || 0) * factor,
    carbs: (data?.carbs || 0) * factor,
    fat: (data?.fat || 0) * factor
    };
}

// 🥉 Mock
function getMockNutrition() {
    return {
    calories: 100,
    protein: 10,
    carbs: 10,
    fat: 5
    };
}

// 🧠 Função principal
export async function getNutrition(ingredient, grams = null) {
    const cleanIngredient = normalizeIngredientName(ingredient);
    const key = (cleanIngredient || "").toLowerCase();

    // ⚡ Cache com TTL
    const cached = getCache(key);
    if (cached) {
    // log(`CACHE used for ${cleanIngredient}`);
    return cached;
    }

    // 🥇 USDA
    try {
    const usda = await getUSDAData(cleanIngredient);

    if (usda) {
    //   log(`USDA used for ${cleanIngredient}`);

        const normalized = normalize(usda, grams || 100);

        const result = {
        ...normalized,
        source: "USDA"
        };

        setCache(key, result);
        return result;
    }
    } catch {
    // log(`USDA error (${cleanIngredient})`);
    }

    // 🥈 OFF
    try {
    const off = await getOFFData(cleanIngredient);

    if (off) {
        // log(`OFF used for ${cleanIngredient}`);

        const normalized = normalize(off, grams || 100);

        const result = {
        ...normalized,
        source: "OFF"
        };

        setCache(key, result);
        return result;
    }
    } catch {
    // log(`OFF error (${cleanIngredient})`);
    }

    // 🥉 Mock
    // log(`MOCK used for ${cleanIngredient}`);

    const normalized = normalize(getMockNutrition(), grams || 100);

    const result = {
    ...normalized,
    source: "MOCK"
    };

    setCache(key, result);
    return result;
}

if (DEBUG) console.log("nutrition service loaded");