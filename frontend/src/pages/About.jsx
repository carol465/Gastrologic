import { Link } from 'react-router-dom';

function About() {
  return (
    <section 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center overflow-hidden py-20 lg:py-0" 
      style={{ backgroundImage: "url('/images/fundo_about.webp')" }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/images/prato_saudavel.webp" 
          alt="Prato Saudável" 
          className="absolute opacity-20 lg:opacity-100 top-[70%] lg:top-[54%] -right-20 lg:-right-40 -translate-y-1/2 h-[50%] lg:h-[95%] w-auto object-contain z-20" 
        />

        <img 
          src="/images/manjericao.webp" 
          alt="Manjericão" 
          className="hidden lg:block absolute top-[55%] right-[25%] -translate-y-1/2 h-[85%] w-auto object-contain z-30" 
        />
      </div>
        
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col justify-center text-left">
          
          <div className="border-l-4 border-berry-500 pl-6">
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-magneton text-shadow-grey-800 leading-tight">
              Zero <span className="text-berry-500 lg:text-white">Waste</span>
              <span className="block text-3xl md:text-4xl lg:text-5xl text-shadow-grey-700 mt-2">Mais Sabor</span>
            </h1>
          </div>
          
          <p className="mt-6 text-shadow-grey-700 max-w-md text-lg italic bg-white/10 backdrop-blur-sm lg:bg-transparent p-4 lg:p-0 rounded-2xl">
            Cooking with less has never been so easy. <br className="hidden md:block" />
            Discover personalized recipes based on your current inventory and give your food a new life.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4"> 
            <Link to="/login" className="text-center rounded-full bg-berry-500 px-8 py-4 text-white font-semibold shadow-lg hover:bg-berry-600 transition active:scale-95">
              Log In
            </Link>
            <Link to="/" className="text-center rounded-full bg-white/80 backdrop-blur-md px-8 py-4 text-shadow-grey-800 font-semibold shadow-lg hover:scale-105 transition-transform active:scale-95 border border-white/20">
              Start
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;