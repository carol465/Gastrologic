import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { isTokenExpired, logoutUser } from "../utils/auth";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  let user = null;

  if (token && !isTokenExpired(token) && userString) {
    try {
      user = JSON.parse(userString);
    } catch (e) {
      user = null;
    }
  }

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logoutUser();
    closeMenu();
    navigate("/login");
  };

  const navLinkStyles = ({ isActive }) => 
    `block py-2 px-3 md:p-0 transition-colors ${
      isActive 
        ? "font-bold text-[--sage-green]" 
        : "text-[--shadow-grey] hover:text-[--sage-green]"
    }`;

  return (
    <nav className="bg-white/50 backdrop-blur-md fixed w-full z-50 top-0 start-0 border-b border-gray-100">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2 px-4">
        <Link to="/" onClick={closeMenu} className="flex items-center space-x-3">
          <img src="/images/logo.webp" className="h-10 w-auto object-contain" alt="Logo" />
          <span className="self-center text-2xl font-bold text-[--shadow-grey]">GastroLogic</span>
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16m-7 6h7" />}
          </svg>
        </button>

        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="flex flex-col md:flex-row items-center font-medium space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0">
            <li><NavLink to="/" end onClick={closeMenu} className={navLinkStyles}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={closeMenu} className={navLinkStyles}>About</NavLink></li>

            <li>
              {!user ? (
                <Link to="/login" onClick={closeMenu} className="py-2 px-5 border rounded-full">Log In</Link>
              ) : (
                <button onClick={handleLogout} className="py-2 px-5 text-shadow-grey-700 rounded-full w-full">Log out</button>
              )}
            </li>

            {user && (
              <li className="flex items-center">
                <Link to="/profile" onClick={closeMenu} className="transition-transform hover:scale-105">
                  <img 
                    className="w-8 h-8 rounded-full ring-2 ring-[--sage-green] object-cover bg-gray-100" 
                    src={user.foto || "/images/tomate.webp"} 
                    alt="Perfil"
                    onError={(e) => { e.target.src = "/images/tomate.webp"; }}
                  />
                </Link>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;