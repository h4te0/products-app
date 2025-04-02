import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getProducts } from '../api/get-products';

import type { IProduct } from './types';

export interface IProductsStore {
  products: IProduct[];
  currentProduct: IProduct;
  filter: boolean;
  setFilter: (value: boolean) => void;
  search: string;
  setSearch: (value: string) => void;
  isLoading: boolean;
  fetchProducts: () => void;
  setCurrentProduct: (id: number) => void;
  addToFavorites: (id: number, value?: boolean) => void;
  createProduct: ({}: Omit<IProduct, 'id'>) => void;
  deleteProduct: (id: number) => void;
  editProduct: ({}: Omit<IProduct, 'id'>) => void;
}

export const useProductsStore = create<IProductsStore>()(
  persist(
    (set, get) => ({
      products:
        (typeof window !== 'undefined' &&
          JSON.parse(localStorage.getItem('products') || '{}').state?.products) ||
        [],
      currentProduct: {
        id: 0,
        title: '',
        price: 0,
        description: '',
        image: '',
      },
      search: '',
      setSearch: (value) => {
        set({ search: value });
      },
      filter: false,
      setFilter: (value) => {
        set({ filter: value });
      },
      isLoading: true,

      fetchProducts: async () => {
        try {
          if (get().products.length > 0) return;

          set({ isLoading: true });

          const res = await getProducts();

          set({ products: res.data, isLoading: false });
        } finally {
          set({ isLoading: false });
        }
      },

      setCurrentProduct: (id) => {
        set({
          currentProduct: get().products.find((product) => product.id == id),
          isLoading: false,
        });
      },
      editProduct: ({ title, price, image, description }) => {
        const newProducts = get().products.filter(
          (product) => product.id != get().currentProduct.id,
        );

        const newProduct = { id: get().currentProduct.id, title, price, image, description };

        set({
          currentProduct: newProduct,
          products: [newProduct, ...newProducts],
        });
      },
      createProduct: ({ title, price, image, description }) => {
        set({
          products: [
            {
              id:
                Math.max.apply(
                  null,
                  get().products.map((obj) => obj.id),
                ) + 1,
              title,
              price,
              image,
              description,
            },
            ...get().products,
          ],
        });
      },
      deleteProduct: (id) => {
        const newProducts = get().products.filter((product) => product.id != id);

        set({ products: newProducts });
      },

      addToFavorites: (id, value) => {
        const newProducts = get().products.map((product) =>
          product.id === id ? { ...product, isFavorited: !value } : product,
        );

        set({
          products: newProducts,
          currentProduct: { ...get().currentProduct, isFavorited: !value },
        });
      },
    }),
    { name: 'products' },
  ),
);
