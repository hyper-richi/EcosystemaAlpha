import { memo, useCallback, type KeyboardEvent, type MouseEvent } from 'react';
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
  const imageSrc = product.imageUrl ?? `https://picsum.photos/seed/${product.id}/300/200`;

  const handleToggleFavorite = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      dispatch(toggleFavorite(product.id));
    },
    [dispatch, product.id],
  );

  const handleRemove = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
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

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleOpenDetails();
      }
    },
    [handleOpenDetails],
  );

  return (
    <article onClick={handleOpenDetails} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
      <img src={imageSrc} alt={product.title} />
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

