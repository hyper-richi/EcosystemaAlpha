import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../app/hooks';
import { removeProduct, toggleFavorite } from '../productsSlice';
import type { Product } from '../productsTypes';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleToggleFavorite = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      dispatch(toggleFavorite(product.id));
    },
    [dispatch, product.id],
  );

  const handleRemove = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (window.confirm('Remove this product?')) {
        dispatch(removeProduct(product.id));
      }
    },
    [dispatch, product.id],
  );

  const handleOpenDetails = useCallback(() => {
    navigate(`/products/${product.id}`);
  }, [navigate, product.id]);

  return (
    <article onClick={handleOpenDetails} role="button" tabIndex={0} onKeyPress={handleOpenDetails}>
      <img src={product.imageUrl} alt={product.title} />
      <div>
        <header>
          <h3>{product.title}</h3>
        </header>
        <p>{product.description}</p>
        <footer>
          <button type="button" onClick={handleToggleFavorite}>
            {product.isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
          <button type="button" onClick={handleRemove}>
            Delete
          </button>
        </footer>
      </div>
    </article>
  );
};

export default memo(ProductCard);

