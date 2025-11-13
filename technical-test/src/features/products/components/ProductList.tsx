import { useMemo } from 'react';

import { useAppSelector } from '../../../app/hooks';
import {
  selectAllProducts,
  selectProductsError,
  selectProductsFilter,
  selectProductsStatus,
} from '../productsSelectors';
import ProductCard from './ProductCard';

const ProductList = () => {
  const products = useAppSelector(selectAllProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);
  const activeFilter = useAppSelector(selectProductsFilter);

  const emptyStateMessage = useMemo(() => {
    if (activeFilter === 'favorites') {
      return 'NO FAVORITES YET';
    }

    return 'NO PRODUCTS AVAILABLE';
  }, [activeFilter]);

  return (
    <section aria-live="polite" className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 rounded-[32px] border border-white/10 bg-white/10 p-4 shadow-[0_18px_45px_rgba(56,189,248,0.28)] backdrop-blur-2xl">
        <div className="max-h-[calc(100vh-280px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-fuchsia-500/60 scrollbar-track-transparent">
          {status === 'loading' ? (
            <div className="flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 py-10 text-sm uppercase tracking-[0.4em] text-white/70 shadow-[0_14px_30px_rgba(168,85,247,0.45)]">
              Loading...
            </div>
          ) : status === 'failed' ? (
            <div
              role="alert"
              className="rounded-2xl border border-red-400/30 bg-red-500/20 px-4 py-6 text-center text-sm font-semibold uppercase tracking-[0.3em] text-red-200 shadow-[0_14px_30px_rgba(248,113,113,0.4)]"
            >
              {error ?? 'UNABLE TO LOAD PRODUCTS'}
            </div>
          ) : !products.length ? (
            <div className="rounded-2xl border border-dashed border-white/30 bg-white/10 px-4 py-10 text-center text-sm uppercase tracking-[0.4em] text-white/60 shadow-[0_12px_30px_rgba(148,163,184,0.35)]">
              {emptyStateMessage}
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <li key={product.id} className="h-full">
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;

