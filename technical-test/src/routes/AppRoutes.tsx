import { Navigate, Route, Routes } from 'react-router-dom';

import CreateProductPage from '../pages/CreateProductPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import ProductsPage from '../pages/ProductsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/create-product" element={<CreateProductPage />} />
    </Routes>
  );
};

export default AppRoutes;

