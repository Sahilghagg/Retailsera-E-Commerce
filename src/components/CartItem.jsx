import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="cart-item-card">
      <div className="cart-item-image-wrapper">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cart-item-info">
        <h4 className="cart-item-title">{item.name}</h4>
        <span className="cart-item-category">{item.category}</span>
        <div className="cart-item-price-row">
          <span className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</span>
        </div>
        
        <div className="cart-item-actions">
          <div className="quantity-pill">
            <button onClick={() => updateQuantity(item.id, -1)}><FaMinus size={10} /></button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, 1)}><FaPlus size={10} /></button>
          </div>
          <button className="remove-btn-text" onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
