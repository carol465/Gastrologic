export async function getUSDAData(ingredient) {
    
    const API_KEY = process.env.USDA_KEY;

    const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&api_key=${API_KEY}`
    );

    const data = await res.json();

    if (!data.foods || data.foods.length === 0) return null;

    const food = data.foods[0];
    const nutrients = food.foodNutrients;

    return {
        calories: nutrients.find(n => n.nutrientName === "Energy")?.value,
        protein: nutrients.find(n => n.nutrientName === "Protein")?.value,
        carbs: nutrients.find(n => n.nutrientName === "Carbohydrate, by difference")?.value,
        fat: nutrients.find(n => n.nutrientName === "Total lipid (fat)")?.value
    };
}