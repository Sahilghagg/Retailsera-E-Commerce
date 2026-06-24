import React from 'react';
import '../styles/filters.css';

const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Beauty'];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="category-scroll-wrapper">
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
