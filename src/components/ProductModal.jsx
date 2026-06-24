import React from 'react';
import { FaStar, FaTimes, FaShoppingCart } from 'react-icons/fa';
import '../styles/modal.css';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
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
            
            <div className="modal-rating-row">
              <div className="stars">
                <FaStar /> <span>{product.rating}</span>
              </div>
              <span className="rating-count">124 Ratings & 20 Reviews</span>
            </div>
            
            <div className="modal-price-container">
              <span className="modal-price">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="modal-mrp">₹{(product.price * 1.4).toLocaleString('en-IN')}</span>
              <span className="modal-discount">28% off</span>
            </div>

            <div className="modal-divider"></div>
            
            <div className="modal-description-box">
              <h3>Product Description</h3>
              <p className="modal-description">{product.description}</p>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-add-cart-large" onClick={() => onAddToCart(product)}>
                <FaShoppingCart style={{ marginRight: '8px' }} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
