import React from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';
import '../styles/modal.css';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Stop propagation so clicking inside the modal doesn't close it */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="modal-body">
          <div className="modal-image-container">
            <img src={product.image} alt={product.name} className="modal-image" />
          </div>
          
          <div className="modal-details">
            <span className="modal-category">{product.category}</span>
            <h2 className="modal-title">{product.name}</h2>
            
            <div className="product-rating modal-rating">
              <FaStar />
              <span className="rating-text">{product.rating}</span>
            </div>
            
            <p className="modal-description">{product.description}</p>
            
            <div className="modal-footer">
              <span className="modal-price">₹{product.price.toLocaleString('en-IN')}</span>
              <button 
                className="btn add-to-cart-btn" 
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
