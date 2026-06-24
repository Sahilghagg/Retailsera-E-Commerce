import React from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <span className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</span>
        
        <div className="cart-item-actions">
          <div className="quantity-controls">
            <button onClick={() => updateQuantity(item.id, -1)}><FaMinus size={10} /></button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, 1)}><FaPlus size={10} /></button>
          </div>
          
          <button className="remove-btn" onClick={() => removeItem(item.id)}>
            <FaTrash size={14} /> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
