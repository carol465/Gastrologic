export function normalizeIngredientName(name) {
    let n = name.toLowerCase();

    // remover palavras inúteis
    const removeWords = [
        "clove", "cloves", "breast", "fillet",
        "fresh", "dried", "chopped", "sliced"
    ];

    removeWords.forEach(word => {
        n = n.replace(word, "");
    });

    // plural → singular simples
    if (n.endsWith("s")) {
        n = n.slice(0, -1);
    }

    return n.trim();
}