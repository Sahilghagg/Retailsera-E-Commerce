import React from 'react';
import '../styles/hero.css';

const Hero = () => {
  const scrollToCatalog = () => {
    const catalog = document.getElementById('catalog-section');
    if (catalog) {
      catalog.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h2>Discover Amazing Products</h2>
        <p>Electronics, Fashion, Home & Kitchen, Beauty and more</p>
        <div className="hero-buttons">
          <button className="btn" onClick={scrollToCatalog}>Shop Now</button>
          <button className="btn btn-secondary" onClick={scrollToCatalog}>Explore Categories</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
