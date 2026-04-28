const profiles = {
  balanced: {},

  high_protein: {
    proteinMin: 30
  },

  low_carb: {
    carbsMax: 25
  },

  vegetarian: {
    diet: "vegetarian"
  },

  vegan: {
    diet: "vegan"
  }
};

function passesMacroProfile(macroPercentages, profile) {

  const rule = profiles[profile] || profiles.balanced;

  if (rule.proteinMin && macroPercentages.protein < rule.proteinMin) {
    return false;
  }

  if (rule.proteinMax && macroPercentages.protein > rule.proteinMax) {
    return false;
  }

  if (rule.carbsMin && macroPercentages.carbs < rule.carbsMin) {
    return false;
  }

  if (rule.carbsMax && macroPercentages.carbs > rule.carbsMax) {
    return false;
  }

  if (rule.fatMin && macroPercentages.fat < rule.fatMin) {
    return false;
  }

  if (rule.fatMax && macroPercentages.fat > rule.fatMax) {
    return false;
  }

  return true;
}

export {
  passesMacroProfile
};