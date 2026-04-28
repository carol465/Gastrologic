import { normalizeIngredient } from "./ingredient-normalizer.js";
import { dictionary } from "./ingredient-dictionary.js";
import { translateWithAI } from "../aiTranslation.service.js";

async function resolveIngredient(input) {
  const normalized = normalizeIngredient(input);

  if (dictionary[normalized]) {
    return {
      original: input,
      normalized,
      english: dictionary[normalized],
      source: "dictionary",
      confidence: 1,
      needsConfirmation: false
    };
  }

  try {
    const aiResult = await translateWithAI(normalized);

    if (!aiResult || !aiResult.en) {
      return {
        original: input,
        normalized,
        english: null,
        source: "not_found",
        confidence: 0,
        needsConfirmation: true
      };
    }

    const confidence = aiResult.confidence || 0.7;

    return {
      original: input,
      normalized,
      english: aiResult.en,
      source: "gemini",
      confidence,
      needsConfirmation: confidence < 0.85
    };
  } catch (error) {
    return {
      original: input,
      normalized,
      english: null,
      source: "ai_error",
      confidence: 0,
      needsConfirmation: true
    };
  }
}

export { resolveIngredient };