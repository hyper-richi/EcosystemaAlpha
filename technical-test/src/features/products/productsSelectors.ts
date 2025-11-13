import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

export const selectProductsState = (state: RootState) => state.products;

export const selectProductsStatus = (state: RootState) => selectProductsState(state).status;

export const selectProductsError = (state: RootState) => selectProductsState(state).error;

export const selectProductsFilter = (state: RootState) => selectProductsState(state).filter;

const selectProductsItems = (state: RootState) => selectProductsState(state).items;

export const selectAllProducts = createSelector(
  [selectProductsItems, selectProductsFilter],
  (items, filter) => {
    if (filter === 'favorites') {
      return items.filter((item) => item.isFavorite);
    }

    return items;
  },
);

export const selectProductById = (id: string) =>
  createSelector([selectProductsItems], (items) => items.find((item) => item.id === id));

