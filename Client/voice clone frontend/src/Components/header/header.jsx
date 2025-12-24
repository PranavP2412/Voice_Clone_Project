import React from 'react';
import './header.css'; 
import { Link } from "react-router-dom";

// 1. Accept props (userId and logout function) from App.jsx
const Header = ({ userId, logout }) => {

  return (
    <header className="header">

      {/* Left: Logo */}
      <Link to="/" className="header-logo">
        <img
          src="/unnamed.png"
          alt="VoiceAI Logo"
          style={{ height: '50px', width: 'auto', display: 'block' }}
        />
      </Link>

      {/* Center: Navigation Links */}
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Right: Action Button */}
      {/* 2. Use Ternary Operator instead of if/else */}
      <div className="header-actions">
        {userId ? (
            // IF LOGGED IN: Show Logout Button (Runs the function)
            <button className="header-button" onClick={logout}>
                Logout
            </button>
        ) : (
            // IF LOGGED OUT: Show Login Link
            <Link to="/login">
                <button className="header-button">
                    Login
                </button>
            </Link>
        )}
      </div>

    </header>
  );
};

export default Header;