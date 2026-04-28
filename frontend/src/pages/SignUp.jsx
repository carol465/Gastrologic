import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

function SignUp() {
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMensagem("");

    if (senha !== confirmarSenha) {
      setMensagem("As passwords não coincidem.");
      return;
    }

    const nomeCompleto = `${nome} ${apelido}`.trim();

    try {
      const response = await registerUser(nomeCompleto, email, senha);
      setMensagem(response.message || "Conta criada com sucesso.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setMensagem(error.message || "Erro ao criar conta.");
    }
  };

  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center overflow-hidden"
      style={{ backgroundImage: "url('/images/fundo_hero.webp')" }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/images/salada_signin.webp"
          alt="Salada"
          className="absolute top-[50%] -right-50 -translate-y-1/2 h-[165%] w-auto object-contain z-40"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col justify-center">
          <h1 className="lg:text-9xl font-magneton text-shadow-grey-800 leading-tight">
            Bem-Vindo
          </h1>
          <p className="mt-6 text-shadow-grey-700 max-w-md text-lg italic">
            We believe the best recipe is the one you can make right now. <br />
            Open your fridge, pick what you have, and discover your inner chef!
          </p>
        </div>

        <div className="lg:mx-10 bg-white/20 backdrop-blur-md p-12 rounded-[26px] shadow-2xl border border-white/30">
          <form className="w-full mx-auto" onSubmit={handleSignUp}>
            <div className="relative z-0 w-full mb-8 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-berry-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="absolute text-sm text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-berry-500 font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email adress
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="floating_password"
                id="floating_password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-berry-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_password"
                className="absolute text-sm text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-berry-500"
              >
                Password
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="repeat_password"
                id="floating_repeat_password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-berry-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_repeat_password"
                className="absolute text-sm text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-berry-500"
              >
                Confirm password
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-berry-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_first_name"
                className="absolute text-sm text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-berry-500"
              >
                First name
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                value={apelido}
                onChange={(e) => setApelido(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-berry-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_last_name"
                className="absolute text-sm text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-berry-500"
              >
                Last name
              </label>
            </div>

            <button
              className="bg-gradient-to-r from-red-500 to-orange-500 py-3 text-white font-bold rounded-lg w-full shadow-xl transition duration-300 ease-in-out uppercase tracking-wider scale-100 hover:from-orange-500 hover:to-red-500 hover:scale-105 active:scale-95"
              type="submit"
            >
              Create Account
            </button>

            {mensagem && (
              <p className="text-center mt-4 text-white font-medium">
                {mensagem}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;