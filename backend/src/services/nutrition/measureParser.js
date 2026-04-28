// Conversões base (aproximadas mas realistas)
const UNIT_TO_GRAMS = {
  cup: 240,
  tbsp: 15,
  teaspoon: 5,
  tsp: 5,
  g: 1,
  kg: 1000,
  ml: 1,
  l: 1000
};

// Alguns alimentos com peso médio por unidade
const UNIT_FOODS = {
  egg: 60,
  eggs: 60,
  onion: 80,
  potato: 150,
  chicken: 150
};

// Extrai número (ex: "2", "1/2", "1.5")
function parseQuantity(str) {
  if (!str) return 1;

  const fractionMatch = str.match(/(\d+)\s*\/\s*(\d+)/);
  if (fractionMatch) {
    return Number(fractionMatch[1]) / Number(fractionMatch[2]);
  }

  const numMatch = str.match(/[\d.]+/);
  return numMatch ? parseFloat(numMatch[0]) : 1;
}

// Extrai unidade
function parseUnit(str) {
  const lower = str.toLowerCase();

  if (lower.includes("cup")) return "cup";
  if (lower.includes("tbsp")) return "tbsp";
  if (lower.includes("tablespoon")) return "tbsp";
  if (lower.includes("tsp")) return "tsp";
  if (lower.includes("teaspoon")) return "tsp";
  if (lower.includes("kg")) return "kg";
  if (lower.includes("g")) return "g";
  if (lower.includes("ml")) return "ml";
  if (lower.includes("l")) return "l";

  return null;
}

// Função principal
export function parseMeasure(measure, ingredient) {
  const quantity = parseQuantity(measure);
  const unit = parseUnit(measure);

  // 🥇 unidade conhecida
  if (unit && UNIT_TO_GRAMS[unit]) {
    return quantity * UNIT_TO_GRAMS[unit];
  }

  // 🥈 unidade por alimento (ex: eggs)
  const key = (ingredient || "").toLowerCase();

  for (const food in UNIT_FOODS) {
    if (key.includes(food)) {
      return quantity * UNIT_FOODS[food];
    }
  }

  // 🥉 fallback
  return 50;
}