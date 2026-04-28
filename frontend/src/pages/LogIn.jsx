import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from "../services/api";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMensagem("");

        try {
            const response = await loginUser(email, senha);

            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));

            navigate("/profile");
        } catch (error) {
            setMensagem(error.message || "Erro no login");
        }
    };

    return (
        <div
            className="h-screen pt-24 flex justify-center items-center"
            style={{
                backgroundImage: "url('/images/fundo_hero.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="max-w-screen-xl m-0 sm:m-10 flex justify-center flex-1 items-center">
                <div className="hidden lg:flex justify-center items-center">
                    <img
                        src="/images/comida_explosion.webp"
                        alt="Explosão de Comida"
                        className="max-h-[500px] w-auto object-contain animate-pulse-slow"
                    />
                </div>

                <div className="flex justify-center items-center w-full lg:w-1/2">
                    <div id="back-div" className="relative w-full max-w-sm h-fit p-[2px] rounded-[26px] overflow-hidden">
                        <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-[23px] shadow-2xl p-6 sm:p-8">
                            <h1 className="pb-4 text-shadow-grey-700 text-4xl text-center tracking-tight cursor-default font-magneton">
                                Log in
                            </h1>

                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="mb-2 text-shadow-grey-700 text-lg block font-medium">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        className="p-2 bg-white/20 border border-bright-orange text-white placeholder:text-shadow-grey-700/50 focus:scale-[1.02] focus:bg-white/30 transition-all duration-300 rounded-lg w-full outline-none"
                                        type="email"
                                        placeholder="seu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="mb-2 text-shadow-grey-700 text-lg block font-medium">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        className="p-2 bg-white/20 border border-bright-orange text-white placeholder:text-shadow-grey-700/50 focus:scale-[1.02] focus:bg-white/30 transition-all duration-300 rounded-lg w-full outline-none"
                                        type="password"
                                        placeholder="••••••••"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="text-right">
                                    <a className="text-sm text-bright-orange hover:underline" href="#">
                                        Forgot your password?"
                                    </a>
                                </div>

                                <button
                                    className="bg-gradient-to-r from-red-500 to-orange-500 py-3 text-white font-bold rounded-lg w-full shadow-xl transition duration-300 ease-in-out uppercase tracking-wider scale-100 hover:from-orange-500 hover:to-red-500 hover:scale-105 active:scale-95"
                                    type="submit"
                                >
                                    LOG IN
                                </button>

                                {mensagem && (
                                    <p className="text-red-400 text-center mt-2">
                                        {mensagem}
                                    </p>
                                )}
                            </form>

                            <div className="flex flex-col mt-4 items-center justify-center text-lg text-shadow-grey-700">
                                <h3>
                                    Don't you have an account?
                                    <Link to="/signup" className="ml-3 text-bright-orange hover:underline">
                                        Sign up
                                    </Link>
                                </h3>
                            </div>

                            <div id="third-party-auth" className="flex items-center justify-center mt-6 space-x-3">
                                {['google', 'facebook'].map((social) => (
                                    <button
                                        key={social}
                                        type="button"
                                        className="hover:scale-110 active:scale-90 transition-all bg-white/10 p-2 rounded-full border border-white/20 hover:bg-white/30 shadow-md"
                                    >
                                        <img
                                            className="w-6 h-6 object-contain"
                                            src={`https://ucarecdn.com/${getSocialId(social)}/`}
                                            alt={social}
                                        />
                                    </button>
                                ))}
                            </div>

                            <div className="shadow-gray-700 flex text-center flex-col mt-8 items-center text-xs opacity-70">
                                <p>
                                    By signing up, you agree to our 
                                    <Link to="/privacypolicy" className="text-bright-orange font-bold hover:underline mx-1">
                                        Terms of Service and Privacy Policy
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getSocialId = (social) => {
    const ids = {
        google: '8f25a2ba-bdcf-4ff1-b596-088f330416ef',
        facebook: '6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9'
    };
    return ids[social];
};

export default LogIn;