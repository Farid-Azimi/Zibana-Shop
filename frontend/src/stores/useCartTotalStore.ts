import { CartItem } from "../types/cartType";

export const calculateCartTotals = (cartItems: CartItem[]) => {
  return cartItems.reduce(
    (totals, item) => {
      const originalPrice = parseInt(item.product.originalPrice.replace(/,/g, ""), 10);

      const discountedPrice = item.product.hasDiscount
        ? parseInt(item.product.discountedPrice?.replace(/,/g, "") ?? "0", 10)
        : originalPrice;

      totals.totalPrice += discountedPrice * item.quantity;
      totals.totalQuantity += item.quantity;

      if (item.product.hasDiscount) {
        totals.totalDiscount += (originalPrice - discountedPrice) * item.quantity;
      }

      return totals;
    },
    { totalPrice: 0, totalDiscount: 0, totalQuantity: 0 } // Added totalQuantity here
  );
};
