import axios from "axios";

const DEBUG = false;

function log(msg) {
  if (DEBUG) console.log(`[AI] ${msg}`);
}

export async function getAISubstitutes(ingredient, profile = "balanced") {
  try {
    const prompt = `
        Suggest 3 food substitutes for "${ingredient}".
        Diet: ${profile}.
        Return ONLY a JSON array of strings.
        Example: ["tofu", "lentils", "mushrooms"]
        `
    ;

    const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
            model: "gpt-4o-mini",
            messages: [
                { role: "user", content: prompt }
            ],
            temperature: 0.5
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    const text = res.data.choices[0].message.content;

    // tentar parse seguro
    try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
            log(`IA sucesso para ${ingredient}`);
            return parsed;
        }
    } catch {
        log(`Erro parsing IA para ${ingredient}`);
    }

    return null;

    } catch (err) {
        log(`Erro IA (${ingredient})`);
        return null;
    }
}