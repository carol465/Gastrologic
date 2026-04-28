export async function getOFFData(ingredient) {
    try {
        const res = await fetch(
            `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${ingredient}&search_simple=1&action=process&json=1`
        );

        const data = await res.json();

        if (!data.products || data.products.length === 0) return null;

        const product = data.products[0];

        if (!product.nutriments) return null;

        const nutriments = product.nutriments;
        
        if (
        !nutriments["energy-kcal_100g"] &&
        !nutriments["proteins_100g"]
        ) {
            return null;
        }

        return {
            calories: nutriments["energy-kcal_100g"] || 0,
            protein: nutriments["proteins_100g"] || 0,
            carbs: nutriments["carbohydrates_100g"] || 0,
            fat: nutriments["fat_100g"] || 0
        };
    } catch (e) {
    return null;
    }
}