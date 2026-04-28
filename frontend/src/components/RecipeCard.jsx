import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const getScoreColor = (score) => {
  if (score > 80) return "bg-green-100 text-green-700";
  if (score > 60) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

const RecipeCard = ({ rec, userIngredients }) => { 
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    // Verifica se é favorito ao carregar
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.favorites) {
            const found = user.favorites.some(fav => fav.idMeal === rec?.idMeal);
            setIsFavorite(found);
        }
    }, [rec?.idMeal]);

    // Função para guardar no perfil
    const toggleFavorite = (e) => {
        e.stopPropagation();
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return alert("Faz login para guardar receitas!");

        let updatedFavorites = user.favorites || [];
        if (isFavorite) {
            updatedFavorites = updatedFavorites.filter(fav => fav.idMeal !== rec.idMeal);
        } else {
            updatedFavorites.push(rec);
        }

        localStorage.setItem("user", JSON.stringify({ ...user, favorites: updatedFavorites }));
        setIsFavorite(!isFavorite);
        window.dispatchEvent(new Event("storage"));
    };

    return (
    <section className="relative bg-white/60 backdrop-blur-md rounded-3xl shadow-xl p-6 w-full max-w-xs flex flex-col items-center">
        
        {/* ÍCONE DE CORAÇÃO */}
        <button 
            onClick={toggleFavorite}
            className="absolute top-2 left-2 z-20 p-2 rounded-full bg-white/50 hover:scale-110 transition-transform"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "#ef4444" : "none"} stroke={isFavorite ? "#ef4444" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isFavorite ? "" : "text-gray-400"}>
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
        </button>

        {rec?.macroScore > 80 && (
            <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full shadow">
                ⭐ Top Match
            </span>
        )}
        {/* Imagem */}
        <div className="w-32 h-32 mb-4">
            <img
                src={rec?.thumbnail}
                alt={rec?.name}
                className="w-full h-full object-contain drop-shadow-xl"
            />
        </div>

        {/* Conteúdo */}
        <div className="text-center flex flex-col flex-grow">

            {/* Nome */}
            <h3 className="font-bold text-xl leading-tight mb-2">
                {rec?.name}
            </h3>

            {/* Categoria */}
            <span className="text-xs opacity-70 mb-3">
                {rec?.area} • {rec?.category}
            </span>

            {/* Nutrição */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">                
                {rec?.macroScore > 0 && (
                    <div className="mb-3">
                        <span className={`${getScoreColor(rec.macroScore)} px-3 py-1 rounded-full text-sm font-semibold shadow-sm`}>
                            ⭐ {Math.round(rec.macroScore)}% Nutritional Match
                        </span>
                    </div>
                )}
            
                <span className="badge text-shadow-grey-700">
                🔥 {rec?.nutrition?.calories ?? 0} kcal
                </span>
                <span className="badge text-shadow-grey-700">
                💪 {rec?.nutrition?.protein ?? 0}g
                </span>
                <span className="badge text-shadow-grey-700">
                🥑 {rec?.nutrition?.fat ?? 0}g
                </span>
                <span className="badge text-shadow-grey-700">
                🍞 {rec?.nutrition?.carbs ?? 0}g
                </span>
            </div>

            {/* Label perfil */}
            {rec?.macroPercentages?.protein > 30 && (
                <span className="text-xs bg-blue-100 px-2 py-1 rounded-full mb-3 self-center">
                High Protein
                </span>
            )}

            {/* Botão */}
            <div className="mt-auto w-full flex justify-between items-center">
                <button onClick={() => navigate(`/recipe/${rec.idMeal}`, { state: { recipe: rec, userIngredients: userIngredients || [] } })}
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl bg-berry-500 text-white hover:bg-berry-600 shadow-md transition-colors">
                +
                </button>
            </div>
        </div>
    </section>
  );
};
export default RecipeCard;