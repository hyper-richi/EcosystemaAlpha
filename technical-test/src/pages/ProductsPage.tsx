import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import ProductFilters from '../features/products/components/ProductFilters';
import ProductList from '../features/products/components/ProductList';
import { fetchProducts } from '../features/products/productsSlice';
import { selectProductsState } from '../features/products/productsSelectors';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectProductsState);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <section className="flex min-h-0 w-full flex-1 flex-col gap-6">
      <header className="space-y-3 shrink-0">
        <p className="text-xs uppercase tracking-[0.4em] text-sky-300/80">Catalog</p>
        <h2 className="text-3xl font-semibold tracking-tight text-white drop-shadow sm:text-4xl">
          Products
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-200/80">
          Discover, favorite, and curate a vivid showcase of products blending live API data with
          your own creations — every card pulses with color and motion.
        </p>
      </header>
      <ProductFilters />
      <ProductList />
    </section>
  );
};

export default ProductsPage;

