import { products } from "../data/temp";
import { CartItem } from "../types/cartType";

export const initialCartItems: CartItem[] = products.map((product) => ({
  product: product,
  quantity: 1,
}));
