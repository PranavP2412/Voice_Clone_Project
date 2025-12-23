import React from 'react';
import './header.css'; // Ensure we import the CSS
import {Link, NavLink} from "react-router-dom"

const Header = () => {
  return (
    <header className="header">
      
      {/* Left: Logo */}
      <Link to="/" className="header-logo">
        {/* Just use the file name with a slash in front */}
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
      <button className="header-button">
        Login
      </button>

    </header>
  );
};

export default Header;