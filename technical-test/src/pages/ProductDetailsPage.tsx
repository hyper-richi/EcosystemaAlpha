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
      <section className="space-y-4">
        <p className="text-sm text-white/70">Product not found.</p>
        <Link
          to="/products"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-sky-400 hover:text-sky-200 hover:shadow-[0_10px_28px_rgba(56,189,248,0.35)]"
        >
          Back to products
        </Link>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="space-y-4">
        <p className="text-sm text-white/70">Product not available.</p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-sky-400 hover:text-sky-200 hover:shadow-[0_10px_28px_rgba(56,189,248,0.35)]"
        >
          Back
        </button>
      </section>
    );
  }

  return (
    <article className="flex w-full justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-fuchsia-400 hover:text-fuchsia-200 hover:shadow-[0_12px_32px_rgba(217,70,239,0.35)]"
        >
          Back to products
        </button>
        <div className="overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/90 shadow-[0_25px_60px_rgba(129,140,248,0.35)]">
          <div className="relative h-72 w-full sm:h-[28rem]">
            <img
              src={product.imageUrl ?? `https://picsum.photos/seed/${product.id}/1000/700`}
              alt={product.title}
              className="h-full w-full object-cover opacity-80 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.35)_0%,_transparent_60%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.45)_0%,_transparent_60%)]" />
            <div className="absolute bottom-6 left-6 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur shadow-[0_10px_30px_rgba(56,189,248,0.4)]">
              {product.fromApi ? 'API SOURCE' : 'USER CREATED'}
            </div>
          </div>
          <div className="space-y-6 p-8 sm:p-10">
            <header className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-sky-300/80">Product Detail</p>
              <h1 className="text-3xl font-semibold tracking-tight text-white drop-shadow sm:text-4xl">
                {product.title}
              </h1>
              <time className="block text-sm text-white/60" dateTime={product.createdAt}>
                Added {formatDate(product.createdAt)}
              </time>
            </header>
            <p className="text-base leading-7 text-slate-200/90">{product.description}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductDetailsPage;

