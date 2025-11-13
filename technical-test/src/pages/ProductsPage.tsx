import ProductFilters from '../features/products/components/ProductFilters';
import ProductList from '../features/products/components/ProductList';

const ProductsPage = () => {
  return (
    <main>
      <h1>Products</h1>
      <ProductFilters />
      <ProductList />
    </main>
  );
};

export default ProductsPage;

