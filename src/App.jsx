import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { dummyProducts } from './data/products';
import { fetchProducts } from './services/api';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CategoryFilter from './components/CategoryFilter';
import SortDropdown from './components/SortDropdown';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import './styles/global.css';
import './styles/filters.css';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('ecommerce-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setProducts(dummyProducts);
        toast.error("API Error: Loaded offline fallback data", { autoClose: 3000 });
      } finally {
        setTimeout(() => setIsLoading(false), 600);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('ecommerce-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        toast.info(`Increased ${product.name} quantity.`);
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        toast.success(`${product.name} added to cart!`);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, amount) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + amount;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    toast.error("Item removed from cart.");
  };

  const clearCart = () => setCart([]);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const displayedProducts = products
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'lowToHigh') return a.price - b.price;
      if (sortOrder === 'highToLow') return b.price - a.price;
      return 0;
    });

  return (
    <div className="app-container">
      <ToastContainer position="bottom-right" autoClose={2000} theme="colored" />
      
      <Navbar 
        cartItemCount={cartItemCount} 
        setIsCartOpen={setIsCartOpen} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        
        <Hero />

        <div className="toolbar-section">
          <div className="toolbar-controls">
            <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
          </div>
          <div className="toolbar-stats">
            Showing <span>{displayedProducts.length}</span> Products
          </div>
        </div>

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading premium products...</p>
          </div>
        ) : (
          <ProductGrid 
            products={displayedProducts} 
            onProductClick={setSelectedProduct}
            onAddToCart={addToCart}
          />
        )}
      </main>

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart}
      />

      <Cart 
        cartItems={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        clearCart={clearCart}
      />
    </div>
  );
}

export default App;
