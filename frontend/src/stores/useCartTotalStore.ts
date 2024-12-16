import { CartItem } from "../types/cartType";

export const calculateCartTotals = (cartItems: CartItem[]) => {
  return cartItems.reduce(
    (totals, item) => {
      const originalPrice = item.product.originalPrice; 
      const discountedPrice = item.product.discountedPrice ?? originalPrice; 

      totals.totalPrice += discountedPrice * item.quantity; 
      totals.totalQuantity += item.quantity; 

      if (item.product.discountedPrice && discountedPrice < originalPrice) {
        totals.totalDiscount += (originalPrice - discountedPrice) * item.quantity; 
      }

      return totals;
    },
    { totalPrice: 0, totalDiscount: 0, totalQuantity: 0 } 
  );
};
