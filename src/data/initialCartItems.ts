import { products } from "../data/productData";
import { CartItem } from "../types/cartTypes";


export const initialCartItems: CartItem[] = products.map((product) => ({
    product: product,
    quantity: 1,
  }));