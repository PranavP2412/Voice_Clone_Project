import React from 'react';
import './header.css'; // Ensure we import the CSS

const Header = () => {
  return (
    <header className="header">
      
      {/* Left: Logo */}
      <a href="/" className="header-logo">
        {/* Just use the file name with a slash in front */}
        <img 
          src="/unnamed.png" 
          alt="VoiceAI Logo"
          style={{ height: '50px', width: 'auto', display: 'block' }} 
        />
      </a>

      {/* Center: Navigation Links */}
      <nav className="header-nav">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>

      {/* Right: Action Button */}
      <button className="header-button">
        Login
      </button>

    </header>
  );
};

export default Header;