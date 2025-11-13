import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { fetchProductsFromApi } from '../../api/productsApi';
import type { Product, ProductsFilter, ProductsState } from './productsTypes';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  return fetchProductsFromApi();
});

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  filter: 'all',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.items.unshift(action.payload);
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const product = state.items.find((item) => item.id === action.payload);

      if (product) {
        product.isFavorite = !product.isFavorite;
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<ProductsFilter>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const userItems = state.items.filter((item) => !item.fromApi);
        state.items = [...action.payload, ...userItems];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;

export const { addProduct, toggleFavorite, removeProduct, setFilter } = productsSlice.actions;

