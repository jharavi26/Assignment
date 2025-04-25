import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: "", // 'LowToHigh' | 'HighToLow'
  products: [], // Add products externally or via another reducer
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Sort by price
    sortByPrice: (state, action) => {
      state.sort = action.payload;

      const sortedProducts = [...state.products]; // Clone to avoid mutation

      if (action.payload === "LowToHigh") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (action.payload === "HighToLow") {
        sortedProducts.sort((a, b) => b.price - a.price);
      }

      state.products = sortedProducts; // Replace with sorted array
    },

    // Clear all filters
    clearFilters: (state) => {
      state.sort = "";
      // Optional: Reset products to initial order if stored separately
      // state.products = [...originalProducts];
    },
  },
});

export const { sortByPrice, clearFilters } = productSlice.actions;
export default productSlice.reducer;
