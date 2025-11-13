import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAppSelector } from '../app/hooks';
import { selectProductById } from '../features/products/productsSelectors';
import { formatDate } from '../utils/helpers';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const selectProduct = useMemo(() => (id ? selectProductById(id) : null), [id]);
  const product = useAppSelector((state) => (selectProduct ? selectProduct(state) : undefined));

  if (!id) {
    return (
      <main>
        <p>Product not found.</p>
        <Link to="/products">Back to products</Link>
      </main>
    );
  }

  if (!product) {
    return (
      <main>
        <p>Product not available.</p>
        <button type="button" onClick={() => navigate(-1)}>
          Back
        </button>
      </main>
    );
  }

  return (
    <main>
      <button type="button" onClick={() => navigate(-1)}>
        Back to products
      </button>
      <article>
        <header>
          <h1>{product.title}</h1>
          <time dateTime={product.createdAt}>Created: {formatDate(product.createdAt)}</time>
        </header>
        <img
          src={product.imageUrl ?? `https://picsum.photos/seed/${product.id}/600/400`}
          alt={product.title}
        />
        <p>{product.description}</p>
      </article>
    </main>
  );
};

export default ProductDetailsPage;

