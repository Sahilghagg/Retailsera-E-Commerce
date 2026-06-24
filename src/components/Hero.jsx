import React from 'react';
import '../styles/hero.css';

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h2>Discover Amazing Products</h2>
        <p>Electronics, Fashion, Home & Kitchen, Beauty and more</p>
        <div className="hero-buttons">
          <button className="btn">Shop Now</button>
          <button className="btn btn-secondary">Explore Categories</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
