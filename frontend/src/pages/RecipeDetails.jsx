import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {  
  const navigate = useNavigate();
  const { state } = useLocation();
  const recipe = state?.recipe;
  const userIngredientsInput = state?.userIngredients || [];

  const formatInstructions = (text) => {
    if (!text) return "";

    const steps = text.split(/(?=(?:Step|Passo|Etapa|step|passo|etapa)\s?\d+:?|\d+\.)/gi);

    return steps.map((step, i) => {
      if (!step.trim()) return null;

      const parts = step.split(/((?:Step|Passo|Etapa|step|passo|etapa)\s?\d+:?|\d+\.)/gi);

      return (
        <p key={i} className="mb-5 last:mb-0"> 
          {parts.map((part, j) => {
            const isStepMarker = /((?:Step|Passo|Etapa|step|passo|etapa)\s?\d+:?|\d+\.)/i.test(part);
            
            if (isStepMarker) {
              const formattedMarker = part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
              
              return (
                <strong key={j} className="text-sage-green-600 font-bold block mb-1">
                  {formattedMarker}
                </strong>
              );
            }
            
            return <span key={j}>{part}</span>;
          })}
        </p>
      );
    });
  };

  console.log("RECIPE:", recipe);
  if (!recipe) {
    return <div className="p-10 text-center">Recipe not found</div>;
  }

  const [ingredients, setIngredients] = useState([]);
  
  const [loadingSubstitutes, setLoadingSubstitutes] = useState(false);
  const [substitutionOptions, setSubstitutionOptions] = useState({ index: null, list: [] });

  useEffect(() => {
    if (recipe) {
      setIngredients(
        recipe.ingredients?.map((ing, i) => {
          const isOwned = userIngredientsInput.some(userIng => 
            ing.toLowerCase().includes(userIng.toLowerCase().trim())
          );

          return {
            id: i,
            name: ing,
            amount: "",
            category: "",
            owned: isOwned // propriedade booleana
          };
        })
      );
    }
  }, [recipe, userIngredientsInput]);

  // useEffect(() => {
  //   // Teu mock de dados (ou fetch inicial)
  //   const mockRecipe = {
  //     id: id,
  //     title: "Frango com Quinoa e Legumes",
  //     image: "https://via.placeholder.com/600x400",
  //     instructions: "Cozinhe a quinoa. Grelhe o frango. Misture tudo com os legumes salteados.",
  //     nutritionScore: 85,
  //     calories: 450,
  //     originalIngredients: [
  //       { id: 1, name: "Frango", amount: "200g", category: "proteina" },
  //       { id: 2, name: "Quinoa", amount: "100g", category: "grãos" },
  //       { id: 3, name: "Brócolos", amount: "150g", category: "vegetais" }
  //     ]
  //   };
    
  //   setRecipe(mockRecipe);
  //   setIngredients(mockRecipe.originalIngredients);
  // }, [id]);


  const handleSubstituteRequest = async (index, ingredientName) => {
    setLoadingSubstitutes(true);
    setSubstitutionOptions({ index, list: [] });

    try {
      // Exemplo de chamada à API (Node.js)
      // const response = await fetch(`http://localhost:3000/api/substitutes?ingredient=${ingredientName}`);
      // const data = await response.json();
      
      // Simulação de resposta da API baseada em sustentabilidade/saúde
      const response = await fetch("http://localhost:3000/substitutes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ingredient: ingredientName,
          profile: "balanced",
          userIngredients: userIngredientsInput
        })
      });

      const data = await response.json();

      // 👉 adaptar resposta para o formato do UI
      console.log("SUBSTITUTES:", data);
      const formatted = (data || []).map((s, i) => ({
        name: s.name,
        reason: s.similarity > 80
          ? `Excellent match (${Math.round(s.similarity)}%)`
          : s.similarity > 60
          ? `Good alternative (${Math.round(s.similarity)}%)`
          : s.similarity > 0
          ? `Weak substitute (${Math.round(s.similarity)}%)`
          : "No strong substitute available",
        type: i === 0 ? "best" : "alternative"
      }));

      setSubstitutionOptions({ index, list: formatted });
    } catch (error) {
      console.error("Erro ao buscar substitutos:", error);
    } finally {
      setLoadingSubstitutes(false);
    }
  };

  const applySubstitution = (index, newName) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], name: newName, substituted: true };
    setIngredients(updated);
    setSubstitutionOptions({ index: null, list: [] }); // Fecha o menu de opções
  };

  console.log("RECIPE DETAIL:", recipe);

  if (!recipe) return <div className="p-10 text-center font-sans">Loading recipe...</div>;

  return (
    <div 
      className="min-h-screen bg-fixed bg-cover bg-center py-18"
      style={{ backgroundImage: "url('/images/veggies_patterns.webp')" }}
    >

      <div className="max-w-4xl mx-auto p-6 bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl border border-white/50 font-sans">
        <div className="relative">
          <img src={recipe.thumbnail} alt={recipe.name} className="w-full h-72 object-cover rounded-xl shadow-md" />
          <div className="absolute top-4 right-4 bg-sage-green-500 text-white px-4 py-1.5 rounded-full font-bold shadow-lg">
            Nutritional Match: {recipe.macroScore ? Math.round(recipe.macroScore) : 0}%
          </div>
        </div>

        <h1 className="text-4xl font-extrabold mt-8 text-shadow-grey-700 leading-tight">{recipe.name}</h1>
        <div className="flex gap-4 mt-2 mb-8 text-shadow-grey-700 font-medium">
          <span>🔥 {recipe.nutrition?.calories} kcal</span>
          <span>•</span>
          <span className="text-sage-green-500">Healthy Food</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <section>
            <h2 className="text-2xl mb-6 text-shadow-grey-700 border-b-2 border-sage-green-500 pb-2">Ingredients</h2>
            <ul className="space-y-4">
              {ingredients.map((ing, index) => (
                <li key={ing.id} className={`relative group p-4 rounded-xl transition-colors ${ing.owned ? 'bg-green-50/50' : 'bg-green-50/50'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`${ing.substituted ? "text-sage-green-500 font-semibold" : "text-shadow-grey-700"} ${ing.owned ? "opacity-60" : ""}`}>

                      {ing.owned && <span className="mr-2 text-green-600 font-bold">✓</span>}
                      <span className="opacity-60">{ing.amount}</span> {ing.name}
                    </span>
                    
                    {!ing.owned && (
                      <button 
                        onClick={() => handleSubstituteRequest(index, ing.name)}
                        className="text-xs font-bold uppercase tracking-wider bg-white border border-shadow-grey-700 text-shadow-grey-700 px-3 py-1.5 rounded-lg hover:border-sage-green-500 hover:text-sage-green-600 transition shadow-sm"
                      >
                        {loadingSubstitutes && substitutionOptions.index === index ? "..." : "Substituir"}
                      </button>
                    )}
                  </div>

                  {substitutionOptions.index === index && substitutionOptions.list.length > 0 && (
                    <div className="mt-3 p-3 bg-white rounded-lg border-2 border-sage-green-500/15 shadow-inner animate-in fade-in slide-in-from-top-2">                    
                      <span className="text-[10px] font-black text--shadow-grey-700 uppercase tracking-widest block mb-3">
                      Smart Suggestions
                      </span>
                      
                      <div className="space-y-2 mb-4">
                        {substitutionOptions.list.map((opt) => (
                          <button
                            key={opt.name}
                            onClick={() => applySubstitution(index, opt.name)}
                            className="w-full text-left p-2 hover:bg-sage-green-500/10 rounded text-sm border border-transparent hover:border-sage-green-500/20 group transition-all"
                            >
                            <div className="font-bold text-sage-green-600 group-hover:text-sage-green-700">{opt.name}</div>
                            <div className="text-[11px] text-shadow-grey-700 italic leading-tight">{opt.reason}</div>
                          </button>
                        ))}
                      </div>

                      <div className="flex justify-end border-t border-shadow-grey-700/20 pt-2">
                        <button 
                            onClick={() => setSubstitutionOptions({ index: null, list: [] })}
                            className="text-[11px] bg-berry-500 text-white px-3 py-1 rounded-md transition-colors font-bold uppercase tracking-tighter"
                        >
                            Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl mb-6 text-shadow-grey-700 border-b-2 border-sage-green-500 pb-2">
              Preparation
            </h2>
            <p className="text-shadow-grey-700 leading-relaxed text-lg italic border-l-4 border-sage-green-500 pl-4">
              {formatInstructions(recipe.instructions)}
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-sage-green-500/15 rounded-2xl border border-sage-green-500 flex items-center gap-4">
          <div className="text-3xl">🌱</div>
          <div>
            <h3 className="text-shadow-grey-700 text-xl">Eco-Friendly Tip</h3>
            <p className="text-shadow-grey-700">By using local ingredients and seasonal substitutions, you reduced this meal's carbon footprint by 12%.</p>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
            <button 
            onClick={() => navigate(-1)} 
            className="bg-gradient-to-r from-red-500 to-orange-500 py-2 text-white font-bold rounded-lg px-6 shadow-xl transition duration-300 ease-in-out tracking-wider scale-100 hover:from-orange-500 hover:to-red-500 hover:scale-105 active:scale-95"
            >
            Back
            </button>
        </div>
        
      </div>
    </div>
  );
};

export default RecipeDetail;