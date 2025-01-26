"use client";

import { useState, useCallback } from "react";
import { useHttpClient } from "./http-hook";
import { Product } from "../types/productType";
import { useUserStore } from "@/stores/useUserStore";

interface UseFetchProductsProps {
  endpoint: string;
  category?: string;
  productLimit?: number;
  searchQuery?: string;
  uid?: string;
}

export default function useFetchProducts({
  endpoint,
  category,
  productLimit,
  searchQuery,
  uid,
}: UseFetchProductsProps) {
  const { sendRequest, clearError } = useHttpClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[][]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const fetchProducts = useCallback(async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      setIsLoading(true);
      setError(null);
      clearError();
      const queryParams = new URLSearchParams();
      if (productLimit) {
        queryParams.append("limit", productLimit.toString());
      }
      if (searchQuery) {
        queryParams.append("q", searchQuery);
      }
      let url = `http://localhost:5000/api/products/${endpoint}`;

      if (category) {
        url += `/${encodeURIComponent(category)}`;
      }
      if (endpoint === "suggest-products") {
        console.log("id before url");
        console.log(uid);
        url += `/${uid}`;
      } else {
        url += `?${queryParams.toString()}`;
      }

      const responseData = await sendRequest(
        url,
        "GET",
        null,
        {},
        false,
        signal
      );

      setError(null);

      if (responseData && Array.isArray(responseData.data)) {
        const fetchedProducts = responseData.data;
        setProducts(fetchedProducts);

        const itemsPerPage = 12;
        const totalPages = Math.ceil(fetchedProducts.length / itemsPerPage);
        const pages: Product[][] = [];

        for (let i = 0; i < totalPages; i++) {
          const start = i * itemsPerPage;
          const end = start + itemsPerPage;
          pages.push(fetchedProducts.slice(start, end));
        }

        setPaginatedProducts(pages);
      } else {
        setProducts([]);
        setPaginatedProducts([]);
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Request was aborted");
        return;
      }

      console.error("Error fetching product details:", error);
      setError("Failed to fetch products");
      setProducts([]);
      setPaginatedProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, category, productLimit, searchQuery, uid]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    products,
    paginatedProducts,
    currentPage,
    fetchProducts,
    handlePageChange,
    isLoading,
    error,
  };
}
