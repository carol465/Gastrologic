import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'; // Adicionado useLocation

import Nav from './components/Nav';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import BackendTest from './pages/BackendTest';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Licensing from './pages/Licensing';
import Contactos from './pages/Contactos';
import Footer from './components/Footer';
import RecipeDetails from './pages/RecipeDetails';
import { isTokenExpired, logoutUser } from './utils/auth';

// --- COMPONENTE PARA FAZER O SCROLL PARA O TOPO ---
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
// -------------------------------------------------

function AuthWatcher() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");

      if (token && isTokenExpired(token)) {
        logoutUser();
        navigate("/login");
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthWatcher />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/backendtest" element={<BackendTest />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/licensing" element={<Licensing />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />        
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;