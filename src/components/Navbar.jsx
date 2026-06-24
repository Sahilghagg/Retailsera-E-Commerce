import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import '../styles/navbar.css';

const Navbar = ({ cartItemCount, setIsCartOpen }) => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <h1>Retailsera E-Commerce</h1>
        </div>
        
        <div className="navbar-actions">
          <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)}>
            <FaShoppingCart size={24} />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
