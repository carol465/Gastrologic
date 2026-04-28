import React from 'react';

const Contactos = () => {
    return (
        <div className="min-h-screen pt-24 flex justify-center items-center bg-cover bg-center px-6" 
             style={{ backgroundImage: "url('/images/fundo_hero.webp')" }}>
            
            <div className="max-w-5xl w-full bg-white/40 backdrop-blur-md rounded-[30px] shadow-2xl border border-white/20 overflow-hidden grid grid-cols-1 md:grid-cols-2">
                
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h1 className="text-4xl font-magneton text-shadow-grey-700 text-shadow-grey-700 mb-6">
                        Send us an <span className="text-berry-500">Email</span>
                    </h1>
                    <p className="text-shadow-grey-700/80 mb-8 text-lg">
                        We are here to help you reach the next level in your kitchen.
                    </p>
                    
                    <div className="space-y-6">
                        <a href="mailto:suporte@gastrologic.pt" className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-14 h-14 flex items-center justify-center bg-white/10 text-2xl rounded-2xl border border-white/20 transition-all shadow-md">
                                ✉️
                            </div>
                            <div>
                                <p className="text-xs text-berry-500 uppercase font-bold tracking-wider">Official Email</p>
                                <p className="text-shadow-grey-700 font-medium">contact@gastrologic.pt</p>
                            </div>
                        </a>

                        <div className="flex items-center gap-4 group">
                            <div className="w-14 h-14 flex items-center justify-center bg-white/10 text-2xl rounded-2xl border border-white/20 transition-all shadow-md">
                                📍
                            </div>
                            <div>
                                <p className="text-xs text-berry-500 uppercase font-bold tracking-wider">Sede</p>
                                <p className="text-shadow-grey-700 font-medium">Porto, Portugal</p>
                            </div>
                        </div>

                        <hr className="border-white/10 my-6" />

                        <div>
                            <p className="text-sm font-bold text-shadow-grey-700 mb-4 uppercase tracking-widest opacity-80">Follow us</p>
                            <div id="third-party-auth" className="flex items-center space-x-4">
                                {['instagram', 'linkedin', 'facebook'].map((social) => (
                                    <a 
                                        key={social} 
                                        href={getSocialUrl(social)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:scale-110 active:scale-90 transition-all bg-white/10 p-3 rounded-full border border-white/20 hover:bg-white/30 shadow-md"
                                    >
                                        <img
                                            className="w-6 h-6 object-contain"
                                            src={`https://ucarecdn.com/${getSocialId(social)}/`}
                                            alt={social}
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative hidden md:block overflow-hidden">
                    <img 
                        src="/images/logo_cor.webp" 
                        alt="Logo" 
                        className="w-full h-full object-cover"
                    />
                </div>

            </div>
        </div>
    );
};

const getSocialUrl = (social) => {
    const urls = {
        instagram: 'https://instagram.com/gastrologic',
        linkedin: 'https://linkedin.com/company/gastrologic',
        facebook: 'https://facebook.com/gastrologic',
    };
    return urls[social];
};

const getSocialId = (social) => {
    const ids = {
        instagram: '8f25a2ba-bdcf-4ff1-b596-088f330416ef', 
        linkedin: '95eebb9c-85cf-4d12-942f-3c40d7044dc6',  
        facebook: '6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9',   
    };
    return ids[social];
};

export default Contactos;