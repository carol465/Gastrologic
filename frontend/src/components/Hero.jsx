function Hero() {
  return (
    <section 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center overflow-hidden" 
      style={{ backgroundImage: "url('/images/fundo_hero.webp')" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        <div className="flex flex-col justify-center text-center lg:text-left">
          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-magneton text-shadow-grey-800 leading-tight">
            Gastrologic
          </h1>
          <p className="mt-6 text-shadow-grey-700 max-w-md mx-auto lg:mx-0 text-lg italic">
          Cooking with less has never been easier. <br />
          Discover personalized recipes based on your current inventory.
          </p>
        </div> 

        <div className="relative flex justify-center items-center min-h-[500px] lg:min-h-[600px] w-full">
          <div className="relative w-[300px] h-[300px] sm:wrelative w-[80vw] sm:w-[400px] lg:w-[450px] aspect-square flex items-center justify-center-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] flex items-center justify-center">
            
            <div className="absolute inset-0 z-10 animate-spin-slow pointer-events-none ml-[-10%] mt-[15%]">
              <div className="absolute inset-0 rotate-[0deg]"><img src="/images/tomate.webp" className="reverse-spin w-10 absolute -top-[20%] left-1/2 -translate-x-1/2" alt="Tomate" /></div>
              <div className="absolute inset-0 rotate-[22.5deg]"><img src="/images/arroz.webp" className="reverse-spin w-11 absolute -top-[20%] left-1/2 -translate-x-1/2" alt="Arroz" /></div>
              <div className="absolute inset-0 rotate-[45deg]"><img src="/images/cebola.webp" className="reverse-spin w-12 absolute -top-[20%] left-1/2 -translate-x-1/2" alt="Cebola" /></div>
              <div className="absolute inset-0 rotate-[67.5deg]"><img src="/images/salmao.webp" className="reverse-spin w-10 absolute -top-[20%] left-1/2 -translate-x-1/2" alt="Salmão" /></div>
              <div className="absolute inset-0 rotate-[90deg]"><img src="/images/limao.webp" className="reverse-spin w-10 absolute -top-[20%] left-1/2 -translate-x-1/2" alt="Limão" /></div>
              <div className="absolute inset-0 rotate-[112.5deg]"><img src="/images/batata.webp" className="reverse-spin w-10 absolute -top-[20%] left-1/2 -translate-x-1/2" alt="Batata" /></div>
              <div className="absolute inset-0 rotate-[135deg]"><img src="/images/couve.webp" className="reverse-spin w-10 absolute -top-[20%] left-1/2 -translate-x-1/2" alt="Couve" /></div>
              <div className="absolute inset-0 rotate-[157.5deg]"><img src="/images/bife.webp" className="reverse-spin w-10 absolute -top-[20%] left-1/2 -translate-x-1/2" alt="Bife" /></div>

            <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full">
              <path id="curvePath" d="M 300, 300 m 0, 370 a 370,370 0 1,1 0,-740" fill="transparent" />
              <text className="fill-[--shadow-grey] uppercase tracking-[0.2em]" font-size="20">
                <textPath href="#curvePath" startOffset="50%" textAnchor="middle">
                  Cook with Logic • Zero Waste 
                </textPath>
              </text>
            </svg>
            </div>

            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="relative -left-[40%] top-[6%] w-full h-full scale-[1.5] md:scale-[2] lg:scale-[2.5] transition-transform duration-500"> 
                <img src="/images/semi_circulo.webp" alt="Meio Círculo" className="w-full h-full object-contain" />
                <img src="/images/prato_2.webp" alt="Prato" className="w-[200%] h-[200%] object-contain absolute inset-0 m-auto" />
                <img src="/images/manjericao_1.webp" alt="Manjericão" className="-left-[72%] w-[95%] h-[95%] object-contain absolute inset-0 m-auto" />
                <img src="/images/manjericao_2.webp" alt="Manjericão" className="-right-[20%] -top-[8%] w-[95%] h-[95%] object-contain absolute inset-0 m-auto" />
              </div>
            </div>

          </div> 
        </div>
      </div>
    </section>
  );
}

export default Hero;