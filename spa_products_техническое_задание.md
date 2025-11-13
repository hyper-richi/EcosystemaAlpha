# Техническое задание — SPA: Products (TypeScript, React, Redux Toolkit)

**Кратко:** Одностраничное приложение (SPA) для просмотра, создания и управления карточками продуктов. Данные (полученные с публичного API и созданные пользователем) хранятся во внутреннем Redux Toolkit store. Минимальный, аккуратный UI. Цель — понятная структура кода, простая архитектура и лёгкость развития.

---

## Содержание

1. Цель и требования
2. Технический стек
3. Структура проекта
4. Модель данных
5. Архитектура хранилища (Redux Toolkit)
6. Сервисы / API
7. Маршруты (Routing)
8. Страницы и компоненты
9. Формы и валидация
10. UX-детали и поведение
11. Сохранение данных и persist
12. Тестирование и критерии приёмки
13. Readme / Команды запуска
14. Примеры кода (шаблоны)
15. Возможные улучшения

---

## 1. Цель и требования

- Статртовая страница `/products` — список карточек продуктов.
  - Вывод всего списка (из API + добавленные пользователем).
  - На каждой карточке:
    - картинка,
    - заголовок,
    - контент карточки(текст) должен быть урезан, чтобы у карточек была одинаковая высота
    - иконка лайка, При нажатии на которую, ставится или убирается like, Иконка должна подкрашиваться, когда проставлен like.
    - иконка удаления. При нажатии на которую, карточка удаляется.
  - при клике на любом месте карточки (кроме иконки лайка и кнопки удаления) мы должно попадать на отдельную страницу карточки — переход на `/products/:id`.
  - Фильтр: добавить фильтр для просмотра всех карточек и карточек, добавленных в избранное.
- Страница `/products/:id` — подробная информация о продукте + кнопка назад к списку.
- Страница `/create-product` — форма создания продукта; Поля обязательные и с минимальной валидацией; при при отправке формы submit — сохранить в Redux store.
- Все данные должны храниться в Redux Toolkit store (единственный источник правды).

## 2. Технический стек

- Язык: **TypeScript**
- UI: **React** (функциональные компоненты + hooks)
- State: **Redux Toolkit** (slices, createAsyncThunk)
- Router: **React Router v6**
- Формы: **react-hook-form** (+ `zod`)
- HTTP: `fetch` или `axios` (по выбору)
- UI-библиотека:  Tailwind CSS. Дизайн простой — можно обойтись базовыми стилями / Tailwind. Углы острые, без округлостей, черно-белые цвета, обязательно эффекты для UI/UX friendly

## 3. Структура проекта (рекомендуемая)

```
src/
├─ api/
│  └─ productsApi.ts         # обёртки для вызова внешнего API (fetch/axios)
├─ app/
│  └─ store.ts               # configureStore
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
│  ├─ ProductsPage.tsx       # /products
│  ├─ ProductDetailsPage.tsx # /products/:id
│  └─ CreateProductPage.tsx  # /create-product
├─ routes/
│  └─ AppRoutes.tsx
├─ utils/
│  └─ helpers.ts
├─ assets/
└─ index.tsx
```

## 4. Модель данных

Пример интерфейса TypeScript для продукта:

```ts
export interface Product {
  id: string; // у внешних записей — id от API; для пользовательских — генерировать uuid
  title: string;
  description: string;
  imageUrl?: string; // url картинки
  createdAt: string; // ISO date
  isFavorite?: boolean; // локальное поле
  fromApi?: boolean; // опционально, чтобы понимать источник
}
```

**Примечание:** Все операции (лайк, удаление, создание) происходят только в локальном store. Для данных, полученных с API, можно разрешить удаление/лайк локально (в store) без отправки на сервер.

## 5. Архитектура хранилища (Redux Toolkit)

### Slice: `productsSlice`

- State shape:

```ts
interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
  filter: 'all' | 'favorites';
}
```

### Actions / Reducers

- `fetchProducts` — async thunk, получает список из внешнего API и записывает в `items`.
- `addProduct` — reducer (payload: Product) — добавляет продукт в начало списка.
- `toggleFavorite` — reducer (payload: id) — переключает `isFavorite`.
- `removeProduct` — reducer (payload: id) — удаляет по id.
- `setFilter` — reducer — устанавливает фильтр.

### Selectors

- `selectAllProducts(state)` — возвращает `items` с учётом фильтра (либо все, либо только `isFavorite === true`).
- `selectProductById(state, id)` — возвращает продукт.

### Persist

- (Опция) Использовать `redux-persist` или сохранять `items` в `localStorage` в `store.subscribe`.

## 6. Сервисы / API

- Рекомендация для картинок: **Picsum Photos** (`https://picsum.photos`) или `https://api.pexels.com` / `Unsplash` (требуют ключи). Picsum прост и публичен; можно брать `https://picsum.photos/id/{id}/300/200`.
- Для демонстрационных данных продуктов можно использовать любое публичное API (например `fakestoreapi.com/products`) или генерировать простые объекты.

**Пример:** `GET https://fakestoreapi.com/products` вернёт массив объектов с `id`, `title`, `description`, `image`.

### productsApi.ts (обёртка)

- `fetchProductsFromApi(): Promise<Product[]>` — маппинг внешней структуры на `Product` интерфейс.

## 7. Маршрутизация

- `/products` — ProductsPage (список + фильтр)
- `/products/:id` — ProductDetailsPage
- `/create-product` — CreateProductPage

Использовать `BrowserRouter` + `Link`/`NavLink`.

## 8. Страницы и компоненты

### Pages

- **ProductsPage.tsx**

  - Компоненты: `ProductFilters`, `ProductList`.
  - При монтировании: диспатч `fetchProducts()` (если статус `idle`).
  - Передаёт данные в `ProductList` через селекторы.

- **ProductDetailsPage.tsx**

  - Получает `id` из route params, селектор `selectProductById`.
  - Показывает изображение, полный текст, дату создания, кнопку "Назад" (Link на `/products`).

- **CreateProductPage.tsx**

  - Форма создания: title, description, imageUrl (опционально — можно позволить загрузить url или выбрать случайное изображение).
  - Валидация: все поля обязательны (как минимум title и description). Минимум длины.
  - По submit — генерируем `id` (uuid), `createdAt = new Date().toISOString()`, `isFavorite = false`, диспатч `addProduct(payload)` и navigate(`/products`).

### Компоненты

- **ProductCard.tsx**

  - Props: `product: Product`.
  - Содержит:
    - изображение (плейсхолдер если нет),
    - заголовок,
    - урезанный `description` (truncate до N символов или N строк с CSS),
    - иконка лайка (кнопка) — при клике диспатч `toggleFavorite(id)`; иконка окрашивается при `isFavorite`;
    - иконка удаления — при клике диспатч `removeProduct(id)` (желательно подтверждение — опционально),
    - контейнер клика (весь card) — `onClick` navigate(`/products/${id}`), но внутри иконки следует `stopPropagation()`.
  - Height control: задать фиксированную высоту карточки или использовать `line-clamp` CSS для текста, чтобы высота карточек была консистентной.

- **ProductList.tsx**

  - Получает список продуктов (через селектор) и рендерит `ProductCard`.
  - Показывать состояние загрузки / пусто.

- **ProductFilters.tsx**

  - UI для переключения `All / Favorites` (например кнопки или select). Вызывает `setFilter`.

- **ProductForm.tsx**

  - Компонент формы, использующий `react-hook-form`.

## 9. Формы и валидация

- Использовать `react-hook-form` + `zod` (или `yup`):
  - `title`: required, minLength: 3
  - `description`: required, minLength: 10
  - `imageUrl`: optional, если введён — валидный URL
- UX: показывать ошибки под полями, отключать кнопку submit пока форма невалидна.

## 10. UX-детали и поведение

- **Лайк (favorite)**
  - Иконка в карточке — toggle. Изменение состояния происходит мгновенно в store.
  - Визуал: заполненная/окрашенная иконка для `isFavorite === true`, иначе outline.
- **Удаление**
  - Иконка удаления удаляет продукт из store. Можно добавить подтверждение через `window.confirm`.
- **Фильтр**
  - В ProductsPage — переключатель `All` / `Favorites`.
  - Селектор возвращает отфильтрованный массив.
- **Обрезка текста и единая высота карточек**
  - CSS: `display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;` — для многострочной усечки.
  - Или задавать фиксированную высоту для `.card__body` и `overflow: hidden`.
- **Навигация**
  - Клик по карточке (кроме кнопок) -> `navigate` на `/products/:id`.
  - В карточке нажатия на иконки должны `event.stopPropagation()`.

## 11. Сохранение данных и persist

- После первичного `fetchProducts` данные лежат в store.
- Для сохранения пользовательских изменений между перезагрузками — два варианта:
  1. Подключить `redux-persist` и сохранять `products` reducer в localStorage.
  2. Простейший вариант: в `store.subscribe` сохранять state.products.items в localStorage и при инициализации считывать.

**Обсуждение id:**

- Если вы загружаете данные с API и создаёте локальные сущности — избегать конфликтов id. Для пользовательских сущностей генерируйте UUID (например `crypto.randomUUID()`).

## 12. Тестирование и критерии приёмки

- Функциональные требования:
  - При заходе на `/products` — список отображается (данные из API + ранее созданные).
  - Клик по лайку меняет состояние иконки и `isFavorite` в store.
  - Удаление удаляет карточку из списка и из store.
  - Фильтр показывает корректный набор карточек.
  - При клике на карточку — открывается `/products/:id` с корректной информацией.
  - Создание продукта через `/create-product` добавляет запись в store и видна на `/products`.
- Юнит/интеграционные тесты (рекомендация):
  - Тесты редьюсера (toggleFavorite, removeProduct, addProduct).
  - Тесты компонентов: ProductCard (рендер, клики), ProductList (фильтрация).

## 13. Readme / Команды запуска

Пример `README.md` (сокращённо):

```
# SPA Products

# Установка
npm install

# Разработка
npm run dev

# Сборка
npm run build

# Тесты
npm run test
```

## 14. Примеры кода (шаблоны)

> Привожу минимальные примеры — использовать как начальную точку.

### Пример слайса (productsSlice.ts)

```ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsTypes';
import { fetchProductsFromApi } from '../../api/productsApi';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const data = await fetchProductsFromApi();
  return data; // Product[]
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [] as Product[],
    status: 'idle',
    error: null as string | null,
    filter: 'all' as 'all' | 'favorites',
  },
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.items.unshift(action.payload);
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const p = state.items.find(i => i.id === action.payload);
      if (p) p.isFavorite = !p.isFavorite;
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<'all'|'favorites'>) {
      state.filter = action.payload;
    }
  },
  extraReducers(buil
```
