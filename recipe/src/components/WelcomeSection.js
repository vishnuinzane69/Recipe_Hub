import React from 'react';
import './WelcomeSection.css'; // Import the CSS file
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const WelcomeSection = () => {
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);

  return (
    <>
      <div className={`welcome-section ${isSuperuser ? 'admin-login' : ''}`}>
        <h2>Welcome to our Recipe Sharing Platform!</h2>
        <p>Explore the world of variety foods{!isSuperuser}</p>
        {isSuperuser && (
          <Link to="/admin/Usermanage" className="custom-btn">
            Manage User
          </Link>
        )}
      </div>
    </>
  );
}

export default WelcomeSection;
