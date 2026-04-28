import React, { useState } from 'react'; 

const RecipeGenerator = ({ ingredientes, profile, onGenerate }) => {
  const [carregando, setCarregando] = useState(false);

  const handleClick = async () => {
    if (!ingredientes || ingredientes.length === 0) return;

    setCarregando(true);

    try {
      await onGenerate?.(ingredientes); //chama função do HomePage para obter receitas recomendadas
    } catch (error) {
      console.error(error);
    }

    setCarregando(false);
  };

  const desativado = !ingredientes || ingredientes.length === 0;

  return (
    <div className="justify-center w-full mt-12 pb-20 text-center flex">
      <button 
        onClick={handleClick}
        disabled={desativado}
        className={`btn btn-wide rounded-full border-none text-white w-44 h-14 shadow-2xl transition-transform
        ${
          desativado
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-golden-chestnut-500 hover:bg-golden-chestnut-600"
        }`}
      >
        {carregando ? (
          <span className="loading loading-spinner"></span> 
        ) : (
          "Gerar Receitas"
        )}
      </button>
    </div>
  );
};

export default RecipeGenerator;
