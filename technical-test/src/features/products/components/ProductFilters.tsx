import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectProductsFilter } from '../productsSelectors';
import { setFilter } from '../productsSlice';
import type { ProductsFilter } from '../productsTypes';

const filters: ProductsFilter[] = ['all', 'favorites'];

const ProductFilters = () => {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector(selectProductsFilter);

  const handleFilterChange = useCallback(
    (nextFilter: ProductsFilter) => {
      if (nextFilter !== activeFilter) {
        dispatch(setFilter(nextFilter));
      }
    },
    [activeFilter, dispatch],
  );

  return (
    <section>
      <h2>Filter</h2>
      <div>
        {filters.map((filterOption) => (
          <button
            key={filterOption}
            type="button"
            aria-pressed={filterOption === activeFilter}
            onClick={() => handleFilterChange(filterOption)}
          >
            {filterOption === 'all' ? 'All' : 'Favorites'}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ProductFilters;

