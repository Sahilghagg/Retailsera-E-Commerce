import React from 'react';
import { FaStar } from 'react-icons/fa';
import '../styles/productCard.css';

const ProductCard = ({ product, onProductClick, onAddToCart }) => {
  return (
    <div className="product-card" onClick={() => onProductClick(product)}>
      <div className="product-image-container">
        <span className="card-badge">{product.category}</span>
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
      </div>
      
      <div className="product-info">
        <h3 className="product-name" title={product.name}>{product.name}</h3>
        
        <div className="product-rating">
          <div className="stars">
            <FaStar /> <span className="rating-value">{product.rating}</span>
          </div>
          <span className="rating-count">(124 reviews)</span>
        </div>
        
        <div className="product-price-section">
          <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="product-mrp">₹{(product.price * 1.4).toLocaleString('en-IN')}</span>
        </div>
        
        <button 
          className="btn add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation(); 
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
