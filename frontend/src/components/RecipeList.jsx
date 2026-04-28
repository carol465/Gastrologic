import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ lista, userIngredients }) => {
  return (
    <div className="flex flex-wrap gap-8 justify-center mt-10 px-4">
      {lista.map((recipe) => (
        <RecipeCard 
          key={recipe.idMeal} 
          rec={recipe} 
          userIngredients={userIngredients} 
        />
      ))}
    </div>
  );
};

export default RecipeList;