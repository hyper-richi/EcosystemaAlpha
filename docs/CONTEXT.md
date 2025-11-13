## SPA Products Specification

### Overview
- Build a TypeScript SPA for viewing, creating, and managing product cards.
- Data comes from a public API and user input, stored exclusively in Redux Toolkit.
- UI built with React + Tailwind; simple, sharp, monochrome styling with hover/focus effects.

### Tech Stack
- TypeScript, React (hooks), Redux Toolkit, React Router v6.
- `react-hook-form` + `zod` for forms.
- `fetch` or `axios` for HTTP.
- Tailwind CSS for styling.

### Project Structure
```
src/
├─ api/
│  └─ productsApi.ts
├─ app/
│  └─ store.ts
├─ features/
│  └─ products/
│     ├─ productsSlice.ts
│     ├─ productsSelectors.ts
│     ├─ productsTypes.ts
│     └─ components/
│        ├─ ProductCard.tsx
│        ├─ ProductList.tsx
│        ├─ ProductFilters.tsx
│        └─ ProductForm.tsx
├─ pages/
│  ├─ ProductsPage.tsx
│  ├─ ProductDetailsPage.tsx
│  └─ CreateProductPage.tsx
├─ routes/
│  └─ AppRoutes.tsx
├─ utils/
│  └─ helpers.ts
├─ assets/
└─ index.tsx
```

### Data Model
```ts
export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
  isFavorite?: boolean;
  fromApi?: boolean;
}
```
- API items use provided `id`; user items use `crypto.randomUUID()`.
- All operations (like, delete, create) update only local state.

### Redux Slice (`productsSlice`)
State shape:
```ts
interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
  filter: 'all' | 'favorites';
}
```
Reducers / thunks:
- `fetchProducts` (createAsyncThunk) loads external products.
- `addProduct` pushes a new product to the top.
- `toggleFavorite` flips `isFavorite`.
- `removeProduct` filters by `id`.
- `setFilter` updates current filter.

Selectors:
- `selectAllProducts` returns filtered array (all vs favorites).
- `selectProductById` finds item by `id`.

Persist options:
- `redux-persist` or manual `localStorage` sync via `store.subscribe`.

### API Service
- Preferred source: `https://fakestoreapi.com/products`.
- Map API response to `Product` shape.
- Use Picsum (`https://picsum.photos/id/{id}/300/200`) as fallback images.

### Routing
- `/products`: list page with filters.
- `/products/:id`: detail page.
- `/create-product`: creation form.
- Use `BrowserRouter`, `Link` / `NavLink`, `useNavigate`.

### Pages & Components
**ProductsPage**
- On mount: dispatch `fetchProducts` if status is `idle`.
- Renders `ProductFilters` and `ProductList`.

**ProductDetailsPage**
- Reads `id` from params; selects product by `id`.
- Shows image, full description, creation date.
- Includes “Back to Products” button.

**CreateProductPage**
- Uses `ProductForm`; validate with `react-hook-form` + `zod`.
- Required: `title` (min 3), `description` (min 10).
- Optional: `imageUrl` (must be valid URL when provided).
- On submit: generate `id`, set `createdAt`, `isFavorite=false`, dispatch `addProduct`, navigate to `/products`.

**ProductCard**
- Displays image (fallback if missing), title, truncated description (CSS line clamp).
- Like icon toggles favorite state with colored fill when active.
- Delete icon removes product; confirm optional.
- Clicking card (except icons) navigates to detail page; icons call `event.stopPropagation()`.

**ProductList**
- Receives filtered products and renders `ProductCard`.
- Shows loading / empty states.

**ProductFilters**
- Toggle between `All` and `Favorites`; dispatch `setFilter`.

**ProductForm**
- Built with `react-hook-form`.
- Shows field errors; disable submit when invalid.

### UX Details
- Card height consistency via truncated description (`line-clamp` CSS).
- Like toggles update immediately; icon reflects state.
- Delete removes product locally; consider confirmation.
- Filter switches update list instantly.
- Navigation relies on `useNavigate`.

### Persisting Data
- After initial fetch, store data in Redux state.
- Keep user-created items across reloads via `redux-persist` or manual `localStorage`.

### Testing & Acceptance
- Verify `/products` shows API + user items.
- Like toggles update UI and store.
- Delete removes from UI and store.
- Filter correctly shows favorites vs all.
- Clicking card opens detail view with correct data.
- Creating product adds to store and appears on list.

Suggested tests:
- Reducer tests for `toggleFavorite`, `removeProduct`, `addProduct`.
- Component tests for `ProductCard` interactions and `ProductList` filtering.

### README (example)
```
# SPA Products

## Scripts
npm install
npm run dev
npm run build
npm run test
```

### Template Snippet (`productsSlice.ts`)
```ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsTypes';
import { fetchProductsFromApi } from '../../api/productsApi';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  return fetchProductsFromApi();
});

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  filter: 'all',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.items.unshift(action.payload);
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) product.isFavorite = !product.isFavorite;
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<'all' | 'favorites'>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch products';
      });
  },
});

export const { addProduct, toggleFavorite, removeProduct, setFilter } = productsSlice.actions;

export default productsSlice.reducer;
```

### Potential Enhancements
- Use skeleton loaders while fetching.
- Add search or category filters.
- Support product image uploads.
- Implement optimistic updates with real API.
- Add e2e tests with Cypress or Playwright.