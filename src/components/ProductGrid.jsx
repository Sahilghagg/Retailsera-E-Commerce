import React from 'react';
import { FaBoxOpen } from 'react-icons/fa';
import ProductCard from './ProductCard';
import '../styles/productCard.css';

const ProductGrid = ({ products, onProductClick, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <FaBoxOpen size={48} />
        <h3>No products found</h3>
        <p>Try adjusting your search or filter to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onProductClick={onProductClick}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
