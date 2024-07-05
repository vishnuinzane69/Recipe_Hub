import React from "react";
import Navbar from "./components/Navbar";
import WelcomeSection from './components/WelcomeSection';
import checkAuth from "./components/auth/checkAuth";
import { useSelector } from "react-redux";
import '@fortawesome/fontawesome-free/css/all.min.css';
import MovieCarousel from "./components/MovieCarousel";

function App() {
  const user = useSelector((state) => state.auth.user);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);

  return (
    <div style={{ backgroundColor: '#000000', color: 'white', minHeight: '100vh', padding: '20px 0' }}>
      <Navbar />
      <MovieCarousel />
      <WelcomeSection />
      <div style={{ color: 'white' }}>
        {user && isSuperuser ? ( // Check if user is logged in and is admin
          <div style={{ color: 'white' }}>
            <h1>Welcome Admin!</h1>
          </div>
        ) : user ? ( // Check if user is logged in
          <div style={{ color: 'white' }}>
            <h1>Welcome User!</h1>
          </div>
        ) : (
          <div style={{ color: 'white' }}>
            <h1>Please log in to continue</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default checkAuth(App);
