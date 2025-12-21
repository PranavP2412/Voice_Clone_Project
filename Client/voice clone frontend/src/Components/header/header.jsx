import React from 'react';
// We don't need to import CSS here because it's already imported in App.js
// But ensure the classNames match your App.css exactly.

const Header = () => {
  return (
    <header className="header">
      
      {/* Left: Logo */}
      <a href="/" className="header-logo">
        <span style={{ color: '#F4B400' }}>F</span>
        <span style={{ color: '#F4B400' }}>OO</span>
        <span style={{ color: '#F4B400' }}>D</span>
        <span style={{ color: '#4285F4' }}>EX</span>
      </a>

      {/* Center: Navigation Links */}
      <nav className="header-nav">
        <a href="#home" style={{ color: '#007bff' }}>Home</a> {/* Active style */}
        <a href="#about">About</a>
        <a href="#foods">Foods</a>
        <a href="#delivery">Delivery</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* Right: Action Button */}
      <button className="header-button">
        Sign Up
      </button>

    </header>
  );
};

export default Header;