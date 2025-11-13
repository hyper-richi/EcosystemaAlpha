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
    <section className="flex shrink-0 flex-col gap-3 rounded-3xl border border-white/10 bg-white/10 p-4 shadow-[0_12px_40px_rgba(59,130,246,0.25)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">Filter</h2>
      <div className="inline-flex gap-2 rounded-full bg-white/10 p-1">
        {filters.map((filterOption) => {
          const isActive = filterOption === activeFilter;

          return (
            <button
              key={filterOption}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleFilterChange(filterOption)}
              className={[
                'rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] transition-all duration-300',
                isActive
                  ? 'bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-400 text-white shadow-[0_10px_30px_rgba(129,140,248,0.55)]'
                  : 'text-white/70 hover:text-white hover:bg-white/10',
              ].join(' ')}
            >
              {filterOption === 'all' ? 'All' : 'Favorites'}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ProductFilters;

