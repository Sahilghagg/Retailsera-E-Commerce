import React, { useState } from 'react';
import { FaTimes, FaShoppingCart, FaCheckCircle } from 'react-icons/fa';
import CartItem from './CartItem';
import '../styles/cart.css';

const Cart = ({ cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeItem, clearCart }) => {
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    setShowCheckoutSuccess(true);
  };

  const closeCheckoutModal = () => {
    setShowCheckoutSuccess(false);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <>
      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}
      
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>My Cart ({totalItemsCount})</h2>
          <button className="cart-close" onClick={() => setIsCartOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <div className="empty-state">
              <FaShoppingCart size={48} />
              <h3>Your cart is empty</h3>
              <p>Start shopping now to add items.</p>
              <button className="btn" style={{marginTop: '1rem'}} onClick={() => setIsCartOpen(false)}>
                Explore Products
              </button>
            </div>
          ) : (
            <div className="cart-list">
              {cartItems.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  updateQuantity={updateQuantity} 
                  removeItem={removeItem} 
                />
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Total Items</span>
                <span>{totalItemsCount}</span>
              </div>
              <div className="summary-row summary-total">
                <span>Subtotal</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button className="btn checkout-btn" onClick={handleCheckout}>
              Proceed To Checkout
            </button>
          </div>
        )}
      </div>

      {showCheckoutSuccess && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal">
            <FaCheckCircle className="success-icon" />
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for shopping at Retailsera.</p>
            <div className="order-summary-box">
              <div className="summary-row">
                <span>Total Items:</span>
                <strong>{totalItemsCount}</strong>
              </div>
              <div className="summary-row">
                <span>Total Amount:</span>
                <strong>₹{totalAmount.toLocaleString('en-IN')}</strong>
              </div>
            </div>
            <button className="btn" onClick={closeCheckoutModal}>Continue Shopping</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
