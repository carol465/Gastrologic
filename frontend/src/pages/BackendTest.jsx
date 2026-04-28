import React, { useState } from "react";

const BackendTest = () => {
  const [resultado, setResultado] = useState(null);

  const testarBackend = async () => {
    try {
      const resposta = await fetch("http://localhost:3000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ingredients: ["frango", "tomate", "alho"],
          profile: "standard"
        })
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        throw new Error(data.error || "Erro na resposta do servidor");
      }

      setResultado(data);
    } catch (erro) {
      console.error("Falha na ligação:", erro);
      setResultado({ erro: erro.message || "Não foi possível ligar ao servidor" });
    }
  };

  return (
    <div className="p-10">
      <h1>Teste Backend</h1>

      <button onClick={testarBackend} className="bg-blue-500 text-white p-2">
        Testar API
      </button>

      <pre>{JSON.stringify(resultado, null, 2)}</pre>
    </div>
  );
};

export default BackendTest;