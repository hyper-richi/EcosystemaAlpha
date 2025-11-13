import type { Product } from '../features/products/productsTypes';

type FakeStoreProduct = {
  id: number;
  title: string;
  description: string;
  image?: string;
};

const API_URL = 'https://fakestoreapi.com/products';

export const fetchProductsFromApi = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data: FakeStoreProduct[] = await response.json();

  return data.map((item) => ({
    id: String(item.id),
    title: item.title,
    description: item.description,
    imageUrl: item.image ?? `https://picsum.photos/id/${item.id}/300/200`,
    createdAt: new Date().toISOString(),
    isFavorite: false,
    fromApi: true,
  }));
};

