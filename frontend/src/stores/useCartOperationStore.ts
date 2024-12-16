import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types/cartType";
import { Product } from "../types/productType";

interface CartStore {
  cartItems: CartItem[];
  successMessage: string | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
  clearSuccessMessage: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      successMessage: null,

      addToCart: (product: Product, quantity = 1) =>
        set((state) => {
          const existingItemIndex = state.cartItems.findIndex(
            (item) => item.product._id === product._id
          );

          let newCartItems;

          if (existingItemIndex !== -1) {
            newCartItems = [...state.cartItems];
            newCartItems[existingItemIndex] = {
              ...newCartItems[existingItemIndex],
              quantity: newCartItems[existingItemIndex].quantity + quantity,
            };
          } else {
            newCartItems = [...state.cartItems, { product, quantity }];
          }

          return {
            cartItems: newCartItems,
            successMessage: "محصول با موفقیت به سبد خرید اضافه شد!",
          };
        }),

      removeFromCart: (product: Product) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.product._id !== product._id
          ),
        })),

      decreaseQuantity: (product: Product) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.product._id === product._id
          );

          if (existingItem && existingItem.quantity > 1) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            };
          } else {
            return {
              cartItems: state.cartItems.filter(
                (item) => item.product._id !== product._id
              ),
            };
          }
        }),

      clearSuccessMessage: () =>
        set(() => ({
          successMessage: null,
        })),
    }),
    {
      name: "cart-storage",
    }
  )
);
