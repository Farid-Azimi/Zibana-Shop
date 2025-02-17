import { useState, useEffect, useCallback } from "react";
import { Product } from "@/types/productType";
import { useUserStore } from "@/stores/useUserStore";
import { useHttpClient } from "../hooks/http-hook";

interface RecentlyVisitedItem {
  _id: string;
  productId: Product;
  viewedAt: string;
}

interface UseRecentlyVisitedProps {
  currentProductId?: string;
}

export function useRecentlyVisited({
  currentProductId,
}: UseRecentlyVisitedProps = {}) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const { isLoading, error, sendRequest } = useHttpClient();
  const { id, token } = useUserStore();

  const fetchRecentProducts = useCallback(async () => {
    if (!id || !token) return;
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const data = await sendRequest(
        `http://localhost:5000/api/users/recently-visited/${id}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        false,
        signal
      );

      const products = data.recentlyVisited
        .map((item: RecentlyVisitedItem) => item.productId)
        .filter(
          (product: Product, index: number, self: Product[]) =>
            index === self.findIndex((p) => p._id === product._id)
        )
        .filter((product: Product) => product._id !== currentProductId);

      setRecentProducts(products);
    } catch (err) {
      console.error("Error fetching recently visited products:", err);
      setRecentProducts([]);
    }
  }, [id, token, currentProductId, sendRequest]);

  useEffect(() => {
    fetchRecentProducts();
  }, [fetchRecentProducts]);

  return {
    recentProducts,
    isLoading,
    error,
    fetchRecentProducts,
  };
}
