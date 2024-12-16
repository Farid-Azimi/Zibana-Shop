import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/productType";

interface ProductData {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product) => void;
  clearProduct: () => void;
}

export const useProductData = create(
  persist<ProductData>(
    (set) => ({
      selectedProduct: null,
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      clearProduct: () => set({ selectedProduct: null }),
    }),
    {
      name: "product-data",
    }
  )
);
