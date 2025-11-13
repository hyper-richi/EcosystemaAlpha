import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../app/hooks';
import ProductForm, { type ProductFormValues } from '../features/products/components/ProductForm';
import { addProduct } from '../features/products/productsSlice';
import type { Product } from '../features/products/productsTypes';

const CreateProductPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateProduct = useCallback(
    async (values: ProductFormValues) => {
      const newProduct: Product = {
        id: crypto.randomUUID(),
        title: values.title,
        description: values.description,
        imageUrl: values.imageUrl,
        createdAt: new Date().toISOString(),
        isFavorite: false,
        fromApi: false,
      };

      dispatch(addProduct(newProduct));
      navigate('/products');
    },
    [dispatch, navigate],
  );

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-fuchsia-300/80">New Entry</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white drop-shadow sm:text-4xl">
          Create Product
        </h1>
        <p className="text-sm leading-relaxed text-slate-200/80">
          Provide a title, description, and optional image URL to add a vibrant new card to the
          gallery — your product will shimmer alongside API discoveries.
        </p>
      </header>
      <ProductForm onSubmit={handleCreateProduct} />
    </section>
  );
};

export default CreateProductPage;

