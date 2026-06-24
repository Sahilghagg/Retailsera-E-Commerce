# Retailsera E-Commerce

A professional, fully-responsive E-Commerce product listing application built specifically for a Junior Developer technical interview assignment. This application demonstrates component-driven architecture, robust state management using React Hooks, seamless MockAPI integration, and plain CSS styling.

## Features

- **Product Listing**: Displays a clean, responsive grid of products fetched from an API (with a robust offline fallback mechanism).
- **Advanced Filtering & Sorting**: Real-time case-insensitive search, category filtering, and price sorting (Low to High / High to Low).
- **Product Details Modal**: Detailed view of products on card click, with a smooth fade-in animation.
- **Shopping Cart System**: Slide-out drawer to add, remove, and update item quantities. Calculates total items and subtotal in INR (₹).
- **Persistent Storage**: Cart state is perfectly synchronized with the browser's `localStorage` across page refreshes.
- **Toast Notifications**: Integrated `react-toastify` for professional, non-intrusive user feedback when modifying the cart.
- **Error & Loading States**: Displays a CSS spinner during data fetches and gracefully degrades to local fallback data if the API fails.

## Technologies Used

- **React.js** (Functional Components, Hooks: `useState`, `useEffect`)
- **Vite** (Next-generation frontend tooling)
- **Plain CSS** (No external frameworks like Tailwind or Bootstrap)
- **react-icons** (For lightweight SVG icons)
- **react-toastify** (For professional notifications)

## Installation Steps

1. **Clone the repository** (if applicable) or download the source code.
2. **Navigate to the project directory**:
   ```bash
   cd ecommerce-app
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

## MockAPI Setup Guide

The application currently relies on a dummy endpoint inside `src/services/api.js` to demonstrate the error-handling and fallback logic. To connect this to a real MockAPI.io project:

1. Go to [MockAPI.io](https://mockapi.io/) and create a free account.
2. Create a new project.
3. Create a new resource named `products`.
4. Define the schema to match the application: `id`, `name`, `category`, `price`, `rating`, `image`, `description`.
5. Generate dummy data inside MockAPI.
6. Copy the endpoint URL provided by MockAPI.
7. Open `src/services/api.js` and replace the `API_URL` variable:
   ```javascript
   const API_URL = 'https://YOUR_MOCKAPI_PROJECT_ID.mockapi.io/products';
   ```

## Folder Structure

```text
src/
├── components/          # Reusable React components
│   ├── Cart.jsx         # Slide-out shopping cart sidebar
│   ├── CartItem.jsx     # Individual row inside the cart
│   ├── CategoryFilter.jsx # Category pill buttons
│   ├── Navbar.jsx       # Top navigation bar with cart badge
│   ├── ProductCard.jsx  # Individual product display card
│   ├── ProductGrid.jsx  # Grid container handling empty states
│   ├── ProductModal.jsx # Detailed view overlay
│   ├── SearchBar.jsx    # Text input for real-time search
│   └── SortDropdown.jsx # Price sorting select element
├── data/
│   └── products.js      # Realistic fallback data (Unsplash images, INR prices)
├── services/
│   └── api.js           # Fetch wrapper for MockAPI integration
├── styles/              # Component-scoped plain CSS files
│   ├── cart.css         
│   ├── filters.css
│   ├── global.css
│   ├── modal.css
│   ├── navbar.css
│   └── productCard.css
├── App.jsx              # Central state management (Cart, Filters, API)
└── main.jsx             # React entry point
```

## Component Explanation

- **`App.jsx`**: The orchestrator. It holds the core state (`products`, `cart`, `searchQuery`, etc.) and handles the complex logic of combining the search, category, and sorting filters before passing the final data to `ProductGrid`.
- **`ProductGrid` & `ProductCard`**: Display components. `ProductGrid` maps the array into `ProductCard`s and handles the empty "No products found" state.
- **`Cart` & `CartItem`**: Manage the checkout preview. They calculate the `totalAmount` and `totalItemsCount` natively without needing Redux or Context API.
- **`Navbar`**: Displays the application logo and a responsive cart button with an absolute-positioned notification badge.

## Future Improvements

1. **Context API / Redux**: As the app scales, migrating the `cart` state to React Context or Redux would prevent prop-drilling.
2. **Pagination / Infinite Scroll**: Implementing server-side pagination in `api.js` if the product catalog grows beyond a few dozen items.
3. **Debounced Search**: Wrapping the search input in a debounce function to prevent excessive filtering re-renders on low-end devices.

## GitHub Upload Instructions

1. Initialize git in the root directory: `git init`
2. Add all files: `git add .`
3. Commit the code: `git commit -m "Initial commit: E-Commerce application"`
4. Create a repository on GitHub.
5. Link your local repo to GitHub: `git remote add origin https://github.com/your-username/your-repo.git`
6. Push to the main branch: `git push -u origin main`

## Deployment Instructions

This Vite app is optimized for extremely fast deployments on platforms like Vercel or Netlify.

**Deploying to Vercel**:
1. Create a free account at [Vercel](https://vercel.com).
2. Connect your GitHub account and import your repository.
3. Vercel will automatically detect the Vite framework.
4. Leave the Build Command as `npm run build` and Output Directory as `dist`.
5. Click **Deploy**. Your app will be live globally in under a minute!
