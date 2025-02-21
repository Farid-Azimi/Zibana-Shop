"use client";

import { useState, useCallback } from "react";
import { useHttpClient } from "./http-hook";
import { Product } from "@/types/productType";

/**
 * Helper function to format a raw product object into a Product.
 */
const formatProduct = (item: any): Product => ({
  _id: item._id,
  title: item.title || "نامشخص",
  brand: item.brand || "",
  category: Array.isArray(item.category) ? item.category : [],
  description: item.description || "",
  originalPrice: item.originalPrice || 0,
  discountedPrice: item.discountedPrice,
  discountPercentage: item.discountPercentage,
  imageSrc: item.imageSrc || "/images/default-product.png",
  inventory: item.inventory || 0,
  soldCount: item.soldCount || 0,
});

export default function useWishlist() {
  const { sendRequest, clearError } = useHttpClient();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWishlistItems = useCallback(
    async (userId: string) => {
      // Prevent duplicate requests if one is already in flight.
      if (loading) return;
      setLoading(true);
      const controller = new AbortController();
      const { signal } = controller;

      try {
        clearError();
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/liked-products/${userId}`,
          "GET",
          null,
          { "Content-Type": "application/json" },
          true,
          signal
        );

        if (responseData && Array.isArray(responseData.data)) {
          const items = responseData.data.map(formatProduct);
          setWishlistItems(items);
          return items;
        }
        return [];
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.warn("Request was aborted:", error.message);
          return [];
        }
        if (error.message?.includes("token")) {
          setErrorMessage("لطفاً مجدداً وارد شوید.");
        } else {
          setErrorMessage("مشکلی در دریافت لیست علاقه‌مندی‌ها وجود دارد.");
        }
        console.error("Error fetching wishlist items:", error);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [sendRequest, clearError, loading]
  );

  const toggleWishlistItem = useCallback(
    async (userId: string, productId: string, isLiked: boolean) => {
      try {
        clearError();
        const method = "POST";
        const body = JSON.stringify({ userId, productId });

        const responseData = await sendRequest(
          "http://localhost:5000/api/users/like",
          method,
          body,
          { "Content-Type": "application/json" },
          true
        );

        if (responseData) {
          setSuccessMessage(
            responseData.message ||
              (isLiked
                ? "محصول با موفقیت از علاقه‌مندی‌ها حذف شد."
                : "محصول با موفقیت به علاقه‌مندی‌ها اضافه شد.")
          );

          setWishlistItems((prev) => {
            if (isLiked) {
              return prev.filter((item) => item._id !== productId);
            } else {
              // Use the helper function to format the returned product.
              return [...prev, formatProduct(responseData)];
            }
          });
        }
      } catch (error: any) {
        if (error.message?.includes("token")) {
          setErrorMessage("لطفاً مجدداً وارد شوید.");
        } else {
          setErrorMessage("مشکلی در مدیریت لیست علاقه‌مندی‌ها وجود دارد.");
        }
        console.error("Error toggling wishlist item:", error);
      }
    },
    [sendRequest, clearError]
  );

  const resetMessages = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  return {
    wishlistItems,
    fetchWishlistItems,
    toggleWishlistItem,
    successMessage,
    errorMessage,
    resetMessages,
    loading,
  };
}
