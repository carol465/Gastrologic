import React, { useState } from 'react'; 

const IngredientsInput = ({ setIngredientes }) => { // dados que o hooker vais ter de guardar na memoria

  const [perfilLocal, setPerfilLocal] = useState("balanced");
  const [ingrediente, setIngrediente] = useState('');
  const [listaIngredientes, setListaIngredientes] = useState([]);
  const [indexEditar, setIndexEditar] = useState(null);
  const [conteudoEditar, setConteudoEditar] = useState('');

  const adicionarIngrediente = () => {
    const ingredienteNormalizado = ingrediente
    .trim()//remove espaços
    .toLowerCase();//coloca tudo em minúsculas

    if (ingredienteNormalizado !== "" && 
      !listaIngredientes.includes(ingredienteNormalizado)){//evita ingredientes duplicados

      const novaLista = [...listaIngredientes, ingredienteNormalizado];

      setListaIngredientes(novaLista);
      setIngredientes(novaLista);

      setIngrediente(''); // limpa o input depois de adicionar
    }
  };


  const removerIngrediente = (indexRemover) => {
    const novaLista = listaIngredientes.filter(
        (_, index) => index !== indexRemover
      );

      setListaIngredientes(novaLista);
      setIngredientes(novaLista);
  };

const salvarEdicao = () => {

  if (conteudoEditar.trim() !== "" && indexEditar !== null) {
    const novaLista = [...listaIngredientes]; //verifica se não está vazio
    
    novaLista[indexEditar] = conteudoEditar.trim().toLowerCase(); //atualuza a posição
    setListaIngredientes(novaLista);
    setIngredientes(novaLista);
  
    setIndexEditar(null); // "clear" edição para fechar o input
    setConteudoEditar('');
  }
};

  return (
    <div className="my-10 max-w-7xl mx-auto px-6 flex flex-col items-center">
      
      <div className="text-center mb-12">
        <h1 className="text-8xl font-magneton text-shadow-gray-700 mb-4">
          Less wast in every <span className="text-berry-500">Bite</span>
        </h1>
        <p className="text-shadow-gray-800 text-1xl">
          Filter the best recipes based on your inventory and nutritional profile.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 bg-white/80 backdrop-blur-md p-6 rounded-3xl items-end mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-shadow-gray-700 ml-2">What's in your fridge?</label>
          <input 
            type="text" 
            value={ingrediente}
            onChange={(e) => setIngrediente(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                adicionarIngrediente();
              }
            }}
            placeholder=" Ex: Chicken, Tomato ..." 
            className="input input-bordered w-full max-w-xs px-8 h-8 rounded-xl border-tan-300 outline-none ring-2 ring-tan-300 transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-shadow-gray-700 ml-2">Nutritional Profile</label>
          <select 
            value={perfilLocal}
            onChange={(e) => {
              setPerfilLocal(e.target.value);
              setPerfil(e.target.value); // envia para o HomePage
            }}
            className="select border-gray-200 focus:border-berry-500 bg-white rounded-xl w-56 h-8"
          >
            <option value="balanced">🥗 Balanced</option>
            <option value="low_carb">🥑 Low Carb</option>
            <option value="high_protein">🍗 Hight Proteic</option>
            <option value="vegetarian">🥚 Vegetarian</option>
            <option value="vegan">🌿 Vegan</option>
          </select>
        </div>

        <button 
          onClick={adicionarIngrediente}
          className="rounded-xl bg-berry-500 px-8 py-3 text-white font-bold shadow-lg hover:bg-berry-600 transition-colors"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {listaIngredientes.map((item, index) => (
          <div key={index} className="flex items-center">
            {indexEditar === index ? (
              <input
                autoFocus
                className="bg-berry-600 text-white px-4 py-1 rounded-full text-m font-medium outline-none ring-2 ring-berry-300 shadow-inner"
                value={conteudoEditar}
                onChange={(e) => setConteudoEditar(e.target.value)}
                onBlur={salvarEdicao}
                onKeyDown={(e) => e.key === 'Enter' && salvarEdicao()}
              />
            ) : (
              <div className="flex items-center gap-3 bg-gradient-to-r from-berry-500 to-berry-600 text-white font-bold px-4 py-1 rounded-full text-m shadow-sm">
                <span>{item}</span>

                <div className="flex items-center gap-2 border-l border-white/20 pl-2">
                  <button
                    onClick={() => {
                      setIndexEditar(index);
                      setConteudoEditar(item);
                    }}
                    className="hover:text-white transition-colors text-xs"
                    title="Editar"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => removerIngrediente(index)}
                    className="hover:text-white transition-colors font-bold text-lg leading-none"
                    title="Remover"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default IngredientsInput;