import React, { useState, useEffect } from "react"; 
import { recommendRecipes } from "../services/api";
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import IngredientsInput from '../components/IngredientsInput';
import RecipeList from '../components/RecipeList';
import RecipeGenerator from '../components/RecipeGenerator';

function HomePage() {
  const [ingredientes, setIngredientes] = useState([]); 
  const [recipes, setRecipes] = useState([]);
  const [perfil, setPerfil] = useState("balanced");

  useEffect(() => {
    if (recipes.length > 0) {
      setRecipes([]);
    }
  }, [ingredientes, perfil]); 

  async function handleGenerateRecipes(ingrs) {
    try {
      const data = await recommendRecipes(ingrs, perfil);
      const sortedMeals = (data.meals || []).sort((a, b) => b.macroScore - a.macroScore);
      setRecipes(sortedMeals);
    } catch (error) {
      console.error("Erro ao gerar receitas:", error);
    }
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <main 
        className="relative min-h-screen w-full bg-cover bg-center py-10" 
        style={{ backgroundImage: "url('/images/fundo_hero_2.webp')" }}
      >
        <IngredientsInput setIngredientes={setIngredientes} setPerfil={setPerfil} />

        <RecipeGenerator
          ingredientes={ingredientes}
          profile={perfil}
          onGenerate={() => handleGenerateRecipes(ingredientes)}
        />

        <RecipeList lista={recipes} userIngredients={ingredientes} />
      </main>
    </div>
  );
}

export default HomePage;