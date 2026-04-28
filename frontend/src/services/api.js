const API_URL = import.meta.env.VITE_API_URL;

export async function recommendRecipes(ingredients, profile) {
    const response = await fetch(`${API_URL}/recommend`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients, profile })
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
        throw new Error(data.message || "Erro ao obter receitas");
    }

    return data;
}

export async function registerUser(nome, email, senha) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha })
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
        throw new Error(data.message || "Erro no registo");
    }

    return data;
}

export async function loginUser(email, senha) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha })
    });

    const text = await response.text();
    console.log("LOGIN status:", response.status);
    console.log("LOGIN raw response:", text);

    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
        throw new Error(data.message || "Erro no login");
    }

    return data;
}

export async function getProfile() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
        throw new Error(data.message || "Erro ao obter perfil");
    }

    return data;
}