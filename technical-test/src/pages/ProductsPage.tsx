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
    <main>
      <h1>Products</h1>
      <ProductFilters />
      <ProductList />
    </main>
  );
};

export default ProductsPage;

