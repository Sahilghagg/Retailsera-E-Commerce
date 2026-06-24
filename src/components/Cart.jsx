import React from 'react';
import { FaTimes } from 'react-icons/fa';
import CartItem from './CartItem';
import '../styles/cart.css';

const Cart = ({ cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeItem }) => {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    alert(`Order Summary:\nTotal Items: ${totalItemsCount}\nSubtotal: ₹${totalAmount.toLocaleString('en-IN')}\n\nProceeding to checkout (Dummy action)`);
  };

  return (
    <>
      {/* Overlay to dim background */}
      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}
      
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="cart-close" onClick={() => setIsCartOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty. Start shopping now.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                updateQuantity={updateQuantity} 
                removeItem={removeItem} 
              />
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-section">
              <div className="cart-summary-line">
                <span>Total Items:</span>
                <span>{totalItemsCount}</span>
              </div>
              <div className="cart-summary-line cart-total">
                <span>Subtotal:</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button className="btn checkout-btn" onClick={handleCheckout}>
              Proceed To Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
