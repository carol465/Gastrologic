function calculateRecipeTotals(nutritionData = []) {
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;

  for (const item of nutritionData) {
    calories += Number(item.calories || 0);
    protein += Number(item.protein || 0);
    carbs += Number(item.carbs || 0);
    fat += Number(item.fat || 0);
  }

  return {
    calories: round(calories),
    protein: round(protein),
    carbs: round(carbs),
    fat: round(fat)
  };
}

function calculateMacroPercentages(totals = {}) {
  const proteinKcal = Number(totals.protein || 0) * 4;
  const carbsKcal = Number(totals.carbs || 0) * 4;
  const fatKcal = Number(totals.fat || 0) * 9;

  const totalMacroKcal = proteinKcal + carbsKcal + fatKcal;

  if (totalMacroKcal === 0) {
    return { protein: 0, carbs: 0, fat: 0 };
  }

  return {
    protein: round((proteinKcal / totalMacroKcal) * 100),
    carbs: round((carbsKcal / totalMacroKcal) * 100),
    fat: round((fatKcal / totalMacroKcal) * 100)
  };
}

// 🔥 NOVO SCORE MELHORADO
function calculateMacroScore(totals, macroPercentages, profile) {
  const targets = {
    balanced: { protein: 15, carbs: 55, fat: 30 },
    high_protein: { protein: 30, carbs: 40, fat: 30 },
    low_carb: { protein: 30, carbs: 20, fat: 50 }
  };

  const target = targets[profile];
  if (!target) return 0;

  // 🧠 1. Score base (percentagens)
  const diff =
    Math.abs(macroPercentages.protein - target.protein) +
    Math.abs(macroPercentages.carbs - target.carbs) +
    Math.abs(macroPercentages.fat - target.fat);

  let score = Math.max(0, 100 - diff);

  // 🧠 2. Densidade proteica (IMPORTANTE)
  const proteinDensity =
    totals.calories > 0 ? totals.protein / totals.calories : 0;

  // bonus até +15
  score += Math.min(15, proteinDensity * 100);

  // 🧠 3. Penalização por calorias excessivas
  if (totals.calories > 800) {
    score -= (totals.calories - 800) * 0.02;
  }

  // 🧠 4. Clamp final
  return Math.max(0, Math.min(100, round(score)));
}

function round(value) {
  return Number(value.toFixed(1));
}

export {
  calculateRecipeTotals,
  calculateMacroPercentages,
  calculateMacroScore
};