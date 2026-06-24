// Replace this URL with your actual MockAPI.io endpoint when ready.
// Example: https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/v1/products
// We use a dummy failing URL here to trigger the local fallback data as requested.
const API_URL = "https://6a3bb856e4a07f202e15bc12.mockapi.io/api/products";

export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error; // Throw so App.jsx can handle the fallback
  }
};
