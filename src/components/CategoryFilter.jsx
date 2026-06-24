import React from 'react';
import '../styles/filters.css';

// Predefined list of categories matching the dummy data
const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Beauty'];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          // Add 'active' class to highlight the currently selected category
          className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
