import { create } from "zustand";
import { Product } from "@/payload-types";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  product: Product;
  count: number; // track the number of times an item is added
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          let isItemAdded: boolean = false;

          const updatedItems = state.items.map((item) => {
            if (item.product.id === product.id) {
              isItemAdded = true;

              return {
                ...item,
                count: item.count + 1, // increment count if product is already in the cart
              };
            }

            return item;
          });

          return {
            items: isItemAdded
              ? updatedItems
              : [...updatedItems, { product, count: 1 }],
          };
        });
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),

      clearCart: () => set({ items: [] }),
    }),

    // config object
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
