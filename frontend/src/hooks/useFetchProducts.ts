"use client";

import { useState } from "react";
import { useHttpClient } from "./http-hook";
import { Product } from "../types/productType";

interface UseFetchProductsProps {
  endpoint: string;
  productLimit?: number; 
}

export default function useFetchProducts({ endpoint, productLimit }: UseFetchProductsProps) {
    const { sendRequest, clearError } = useHttpClient();
    const [products, setProducts] = useState<Product[]>([]);
  
    const fetchProducts = async () => {
      try {
        clearError();
        const limitParam = productLimit
          ? `?limit=${encodeURIComponent(productLimit)}`
          : "";
        const responseData = await sendRequest(
          `http://localhost:5000/api/products/${endpoint}${limitParam}`,
          "GET"
        );
  
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
  