import React from 'react';
import { FaStar } from 'react-icons/fa';
import '../styles/productCard.css';

const ProductCard = ({ product, onProductClick, onAddToCart }) => {
  return (
    <div className="product-card" onClick={() => onProductClick(product)}>
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      
      <span className="product-category">{product.category}</span>
      <h3 className="product-name" title={product.name}>{product.name}</h3>
      
      <div className="product-rating">
        <FaStar />
        <span className="rating-text">{product.rating}</span>
      </div>
      
      <div className="product-footer">
        {/* Format price as INR */}
        <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
        
        <button 
          className="btn add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation(); // Stop modal opening
            onAddToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
