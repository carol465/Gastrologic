import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from "../components/RecipeCard";

const ProfilePage = () => {
  const navigate = useNavigate();
  
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(storedUser?.nome || "Utilizador");
  const [bio, setBio] = useState(storedUser?.bio || "Apaixonada por culinária saudável 🍳");
  const [image, setImage] = useState(storedUser?.foto || "/images/tomate.webp");
  const [bannerPic, setBannerPic] = useState(storedUser?.bannerPic || "/images/fundo_hero.webp");
  const [favorites, setFavorites] = useState(storedUser?.favorites || []);

  // Função para atualizar favoritos em tempo real
  const syncFavorites = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.favorites) {
      setFavorites(user.favorites);
    }
  };

  useEffect(() => {
    // Escuta alterações feitas pelo RecipeCard (o evento 'storage')
    window.addEventListener("storage", syncFavorites);
    return () => window.removeEventListener("storage", syncFavorites);
  }, []);

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'profile') setImage(reader.result);
        if (type === 'banner') setBannerPic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const updatedUser = { 
      ...storedUser, 
      nome: name, 
      bio: bio,
      foto: image, 
      bannerPic: bannerPic 
    };

    try {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditing(false);
      alert("Perfil atualizado com sucesso!");
      window.location.reload(); 
    } catch (error) {
      console.error("Erro ao guardar:", error);
      alert("Erro ao guardar: a imagem pode ser demasiado grande.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  if (!storedUser) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-tan-200 px-6">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg text-center max-w-md w-full">
          <h2 className="text-3xl font-bold text-[--shadow-grey] mb-4">Perfil</h2>
          <p className="text-[--shadow-grey] mb-6">No authenticated user found."</p>
          <button
            onClick={() => navigate("/login")}
            className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 py-3 px-6 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90"
          >
            Go to Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-tan-200">
      <div className="relative z-10">
        <section className="relative pt-36 pb-24">
          <div className="absolute top-0 left-0 w-full h-60 z-0 overflow-hidden group">
            <img
              src={bannerPic}
              alt="Banner"
              className="w-full h-full object-cover shadow-md"
            />
            {isEditing && (
              <label className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
                <span className="bg-white/20 border border-white/50 text-white px-4 py-2 rounded-full font-bold text-sm">Change Cover</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, 'banner')} />
              </label>
            )}
          </div>

          <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex items-center justify-center relative z-10 mb-6">
              <div className="relative group">
                <img
                  src={image}
                  alt="Avatar"
                  className="border-4 border-solid border-white rounded-full object-cover w-32 h-32 shadow-lg transition-transform group-hover:scale-105"
                  onError={(e) => { e.target.src = "/images/tomate.webp"; }}
                />
                {isEditing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all border-2 border-white/50">
                    <span className="text-white text-[10px] font-bold uppercase text-center px-2">Alterar Foto</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, 'profile')} />
                  </label>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 relative z-10">
              {isEditing ? (
                <button onClick={handleSave} className="rounded-full bg-white py-2.5 px-8 text-sm font-bold text-[--shadow-grey] shadow-md hover:bg-gray-50 transition-all">
                  Save Changes
                </button>
              ) : (
                <button onClick={() => setIsEditing(true)} className="rounded-full border border-gray-300 bg-white py-2.5 px-8 text-sm font-semibold text-[--shadow-grey] shadow-sm hover:bg-gray-50 transition-all">
                  Edit Profile
                </button>
              )}
              <button onClick={handleLogout} className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 py-2.5 px-8 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-all">
                Log out
              </button>
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              {isEditing ? (
                <div className="flex flex-col gap-3 mb-6">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/70 backdrop-blur-sm border-2 border-[--sage-green] rounded-xl py-2 text-center text-[--shadow-grey] outline-none"
                    placeholder="O teu nome"
                  />
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="bg-white/70 backdrop-blur-sm border-2 border-[--sage-green] rounded-xl py-2 text-center text-[--shadow-grey] outline-none min-h-[100px]"
                    placeholder="A tua bio"
                  />
                </div>
              ) : (
                <>
                  <h3 className="font-bold text-5xl text-[--shadow-grey] mb-2">{name}</h3>
                  <p className="text-sm text-[--shadow-grey] mb-4 opacity-70">Perfil pessoal</p>
                  <p className="text-lg text-[--shadow-grey] mb-8 italic">"{bio}"</p>
                </>
              )}
            </div>

            <div className="flex items-center justify-center gap-5 relative z-10">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 px-6 py-2 rounded-2xl shadow-sm">
                <span className="font-bold text-orange-600">{favorites.length}</span>
                <span className="ml-2 text-gray-600 text-sm">Favourites</span>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="border-t border-white/50 pt-10">
            <div className="mt-10 relative z-10 bg-white/30 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-[--shadow-grey]">Achievements</h4>
                <span className="text-xs font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                 4 / 10 Unlocked
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                 {/* ... Cards de conquistas ... */}
                 <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-orange-200 transition-all">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <span className="text-sm font-bold text-[--shadow-grey]">Healthy Beginner</span>
                  <p className="text-[10px] text-[--shadow-grey] mt-1">Created your first recipe</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-orange-200 transition-all">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">♻️</span>
                  </div>
                  <span className="text-sm font-bold text-[--shadow-grey]">Zero Waste</span>
                  <p className="text-[10px] text-[--shadow-grey] mt-1">Used leftovers in 5 dishes</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-orange-200 transition-all">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🔥</span>
                  </div>
                  <span className="text-sm font-bold text-[--shadow-grey]">Master Chef</span>
                  <p className="text-[10px] text-[--shadow-grey] mt-1">7-day streak</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-orange-200 transition-all">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <span className="text-sm font-bold text-[--shadow-grey]">Speed Master</span>
                  <p className="text-[10px] text-[--shadow-grey] mt-1">Recipe rated</p>
                </div>
              </div>
            </div>
            <br />
            <h4 className="text-xl font-bold mb-6 text-[--shadow-grey] mt-10">My Recipes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
              {favorites.length > 0 ? (
                favorites.map((recipe) => (
                  <RecipeCard 
                    key={recipe.idMeal} 
                    rec={recipe} 
                    userIngredients={[]} // se tiveres os ingredientes do user
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-white/20 rounded-3xl border-2 border-dashed border-white/50">
                  <p className="text-[--shadow-grey] opacity-60 italic">
                    You haven't saved any recipes yet. <br />
                    Click the ❤️ on your favorite recipes to see them here!
                  </p>
                </div>
              )}
            </div>

          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;