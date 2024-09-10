import create from "zustand";
import { CartItem } from "../types/cartTypes";
import { products } from "../data/productData";

interface CartStore {
  cartItems: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],

  addToCart: (productId: string, quantity = 1) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.product.id === productId
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        const productToAdd = products.find(
          (product) => product.id === productId
        );
        if (productToAdd) {
          return {
            cartItems: [
              ...state.cartItems,
              { product: productToAdd, quantity },
            ],
          };
        }
      }
      return state;
    }),

  removeFromCart: (productId: string) =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => item.product.id !== productId
      ),
    })),

  decreaseQuantity: (productId: string) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.product.id === productId
      );

      if (existingItem && existingItem.quantity > 1) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      } else {
        return {
          cartItems: state.cartItems.filter(
            (item) => item.product.id !== productId
          ),
        };
      }
    }),
}));
