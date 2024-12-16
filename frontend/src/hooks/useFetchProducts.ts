"use client";

import { useState } from "react";
import { useHttpClient } from "./http-hook";
import { Product } from "../types/productType";

interface UseFetchProductsProps {
  endpoint: string;
  productLimit?: number;
  searchQuery?: string;
}

export default function useFetchProducts({
  endpoint,
  productLimit,
  searchQuery,
}: UseFetchProductsProps) {
  const { sendRequest, clearError } = useHttpClient();
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      clearError();

      const queryParams = new URLSearchParams();
      if (productLimit) {
        queryParams.append("limit", productLimit.toString());
      }
      if (searchQuery) {
        queryParams.append("q", searchQuery);
      }

      const url = `http://localhost:5000/api/products/${endpoint}?${queryParams.toString()}`;
      const responseData = await sendRequest(url, "GET");

      if (responseData && Array.isArray(responseData.data)) {
        setProducts(responseData.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setProducts([]);
    }
  };

  return { products, fetchProducts };
}
