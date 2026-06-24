import React from 'react';
import '../styles/filters.css';

const SortDropdown = ({ sortOrder, setSortOrder }) => {
  return (
    <select
      className="sort-dropdown"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="default">Sort by Default</option>
      <option value="lowToHigh">Price: Low to High</option>
      <option value="highToLow">Price: High to Low</option>
    </select>
  );
};

export default SortDropdown;
