async function translateWithAI(ingredient) {
  return {
    en: ingredient,
    confidence: 0.7
  };
}

export { translateWithAI };

