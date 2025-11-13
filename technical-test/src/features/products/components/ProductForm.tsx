import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const productSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(3, 'Title must be at least 3 characters long'),
  description: z
    .string({ required_error: 'Description is required' })
    .trim()
    .min(10, 'Description must be at least 10 characters long'),
  imageUrl: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return undefined;
      const trimmed = value.trim();
      return trimmed.length ? trimmed : undefined;
    })
    .refine(
      (value) => value === undefined || /^https?:\/\/.+/i.test(value),
      'Provide a valid URL (include http:// or https://).',
    ),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  submitLabel?: string;
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
}

const ProductForm = ({
  defaultValues,
  submitLabel = 'Create product',
  onSubmit,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    defaultValues: {
      title: defaultValues?.title ?? '',
      description: defaultValues?.description ?? '',
      imageUrl: defaultValues?.imageUrl,
    },
  });

  const handleFormSubmit = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-6 rounded-3xl border border-white/15 bg-white/10 p-8 shadow-[0_20px_55px_rgba(236,72,153,0.35)] backdrop-blur-xl"
    >
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          autoComplete="off"
          {...register('title')}
          className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 transition focus:border-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/40"
          placeholder="Enter product title"
        />
        {errors.title ? (
          <p className="text-sm text-red-300">{errors.title.message}</p>
        ) : (
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Minimum 3 characters</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={5}
          {...register('description')}
          className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 transition focus:border-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/40"
          placeholder="Describe the product"
        />
        {errors.description ? (
          <p className="text-sm text-red-300">{errors.description.message}</p>
        ) : (
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Minimum 10 characters</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="imageUrl"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80"
        >
          Image URL (optional)
        </label>
        <input
          id="imageUrl"
          type="url"
          autoComplete="off"
          {...register('imageUrl')}
          className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 transition focus:border-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/40"
          placeholder="https://example.com/image.jpg"
        />
        {errors.imageUrl ? (
          <p className="text-sm text-red-300">{errors.imageUrl.message}</p>
        ) : (
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Leave blank to generate automatically
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-[0_16px_45px_rgba(129,140,248,0.45)] transition duration-300 hover:scale-[1.01] hover:shadow-[0_20px_60px_rgba(129,140,248,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="absolute inset-0 bg-white/20 opacity-0 blur-xl transition duration-500 group-hover:opacity-50" />
        <span className="relative">{isSubmitting ? 'Submitting...' : submitLabel}</span>
      </button>
    </form>
  );
};

export default ProductForm;

