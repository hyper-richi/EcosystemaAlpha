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
    <article
      onClick={handleOpenDetails}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="group flex h-full min-h-[320px] cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 shadow-[0_12px_35px_rgba(37,99,235,0.35)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_22px_55px_rgba(59,130,246,0.55)] focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/60"
      aria-label={`Open details for ${product.title}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-indigo-600 via-sky-500 to-cyan-400">
        <img
          src={imageSrc}
          alt={product.title}
          className="h-full w-full object-cover opacity-80 mix-blend-overlay transition duration-500 group-hover:scale-110 group-hover:opacity-100"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35)_0%,_transparent_65%)] transition duration-500 group-hover:opacity-60" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <header className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold leading-tight text-white drop-shadow">
              {product.title}
            </h3>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 shadow-[0_5px_18px_rgba(96,165,250,0.4)]">
              {product.fromApi ? 'API' : 'User'}
            </span>
          </div>
        </header>
        <p className="text-sm leading-6 text-slate-200/90 line-clamp-3">{product.description}</p>
        <footer className="mt-auto flex items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-pressed={product.isFavorite ?? false}
            className={[
              'inline-flex min-w-[7rem] items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition-all duration-300',
              product.isFavorite
                ? 'border-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 text-slate-900 shadow-[0_12px_30px_rgba(251,191,36,0.45)]'
                : 'border-white/40 text-white/80 hover:border-white hover:text-white hover:shadow-[0_12px_32px_rgba(147,197,253,0.45)]',
            ].join(' ')}
          >
            {product.isFavorite ? 'Favorited' : 'Favorite'}
          </button>
          <button
            type="button"
            onClick={handleRemove}
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition-all duration-300 hover:border-red-400 hover:text-red-200 hover:shadow-[0_10px_28px_rgba(248,113,113,0.45)]"
          >
            Delete
          </button>
        </footer>
      </div>
    </article>
  );
};

export default memo(ProductCard);

