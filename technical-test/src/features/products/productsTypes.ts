export type ProductsFilter = 'all' | 'favorites';

export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
  isFavorite?: boolean;
  fromApi?: boolean;
}

export interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
  filter: ProductsFilter;
}

