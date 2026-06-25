import React from 'react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import '../styles/navbar.css';

const Navbar = ({ cartItemCount, setIsCartOpen, searchQuery, setSearchQuery }) => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        
        {/* Left: Logo & Tagline */}
        <div className="navbar-brand">
          <h1 className="logo">Retailsera<span>.</span></h1>
          <span className="tagline">Premium Marketplace</span>
        </div>
        
        {/* Center: Search Bar */}
        <div className="navbar-search">
          <input
            type="text"
            className="search-input"
            placeholder="Search products, brands, and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
        
        {/* Right: Cart */}
        <div className="navbar-actions">
          <button className="cart-action-btn" onClick={() => setIsCartOpen(true)}>
            <div className="cart-icon-wrapper">
              <FaShoppingCart size={22} />
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </div>
            <span className="cart-text">Cart</span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
