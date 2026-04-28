export const recommendMock = {
  profile: "balanced",
  matches: [
    {
      id: "mock-1",
      title: "Frango com arroz",
      usedIngredients: ["frango", "arroz"],
      missingIngredients: ["cebola"],
      nutrition: {
        calories: 520,
        macros: { protein: 42, carbs: 48, fat: 14 },
      },
      score: { final: 0.72 },
    },
  ],
};