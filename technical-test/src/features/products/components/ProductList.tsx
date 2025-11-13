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
      return 'No favorite products yet.';
    }

    return 'No products available.';
  }, [activeFilter]);

  if (status === 'loading') {
    return <p>Loading products...</p>;
  }

  if (status === 'failed') {
    return <p role="alert">Something went wrong: {error}</p>;
  }

  if (!products.length) {
    return <p>{emptyStateMessage}</p>;
  }

  return (
    <section>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductList;

