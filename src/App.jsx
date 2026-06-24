import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { dummyProducts } from './data/products';
import { fetchProducts } from './services/api';

import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import SortDropdown from './components/SortDropdown';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import './styles/global.css';

function App() {
  // Application Data States
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cart State with localStorage lazy initialization
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('ecommerce-cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initial API Fetch
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        // Attempt to fetch from MockAPI
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        // Fallback to local dummy data if API fails
        console.warn("API failed. Falling back to local dummy data.");
        setProducts(dummyProducts);
        setError("Unable to connect to MockAPI. Loaded offline fallback data.");
        toast.error("API Error: Loaded offline fallback data", { autoClose: 3000 });
      } finally {
        // Simulate network delay for loading state visibility
        setTimeout(() => setIsLoading(false), 800);
      }
    };
    loadProducts();
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('ecommerce-cart', JSON.stringify(cart));
  }, [cart]);

  // Cart Handlers with Toast Notifications
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
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          
          if (amount > 0) {
            toast.info(`Quantity increased`);
          } else if (amount < 0 && newQuantity > 0) {
            toast.info(`Quantity decreased`);
          }

          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      });
    });
  };

  const removeItem = (id) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(item => item.id === id);
      if (itemToRemove) {
        toast.error(`${itemToRemove.name} removed from cart.`);
      }
      return prevCart.filter(item => item.id !== id);
    });
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Apply filters and sorting
  const getFilteredAndSortedProducts = () => {
    let result = [...products];

    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOrder === 'lowToHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  };

  const displayedProducts = getFilteredAndSortedProducts();

  return (
    <div className="app-container">
      {/* Toast Notifications */}
      <ToastContainer position="bottom-right" autoClose={2000} theme="colored" />

      <Navbar cartItemCount={cartItemCount} setIsCartOpen={setIsCartOpen} />

      <main className="container" style={{ paddingTop: '2rem' }}>
        
        {/* API Error Notification Banner (Optional persistent UI) */}
        {error && (
          <div style={{ backgroundColor: '#ffe6e6', color: '#d8000c', padding: '10px', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div className="filters-container">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>

        {/* Dynamic Product Count */}
        {!isLoading && (
          <div className="product-count">
            <p>Showing {displayedProducts.length} Products</p>
          </div>
        )}

        {/* Loading Spinner vs Product Grid */}
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : (
          <ProductGrid 
            products={displayedProducts} 
            onProductClick={setSelectedProduct}
            onAddToCart={addToCart}
          />
        )}
      </main>

      {/* Render Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart}
        />
      )}

      {/* Render Cart Sidebar */}
      <Cart 
        cartItems={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </div>
  );
}

export default App;
