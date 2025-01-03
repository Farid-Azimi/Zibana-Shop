"use client";

import { useState, useCallback } from "react";
import { useHttpClient } from "./http-hook";
import { Product } from "@/types/productType";

export default function useWishlist() {
  const { sendRequest, clearError } = useHttpClient();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchWishlistItems = useCallback(
    async (userId: string) => {
      try {
        clearError();
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/liked-products/${userId}`,
          "GET",
          null,
          { "Content-Type": "application/json" },
          true
        );
        if (responseData && Array.isArray(responseData.data)) {
          setWishlistItems(
            responseData.data.map((item) => ({
              _id: item._id,
              title: item.title || "نامشخص",
              brand: item.brand || "",
              category: item.category || [],
              description: item.description || "",
              originalPrice: item.originalPrice || 0,
              discountedPrice: item.discountedPrice,
              discountPercentage: item.discountPercentage,
              imageSrc: item.imageSrc || "/images/default-product.png",
              inventory: item.inventory || 0,
              soldCount: item.soldCount || 0,
            }))
          );
        }
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.warn("Request was aborted:", error.message);
          return;
        }
        console.error("Error fetching wishlist items:", error);
        setErrorMessage("مشکلی در دریافت لیست علاقه‌مندی‌ها وجود دارد.");
      }
    },
    [sendRequest, clearError]
  );

  const toggleWishlistItem = async (
    userId: string,
    productId: string,
    isLiked: boolean
  ) => {
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
            return [
              ...prev,
              {
                _id: responseData._id,
                title: responseData.title || "نامشخص",
                brand: responseData.brand || "",
                category: responseData.category || "",
                description: responseData.description || "",
                originalPrice: responseData.originalPrice || 0,
                discountedPrice: responseData.discountedPrice,
                discountPercentage: responseData.discountPercentage,
                imageSrc: responseData.imageSrc || "/images/default-product.png",
                inventory: responseData.inventory || 0,
                soldCount: responseData.soldCount || 0,
              },
            ];
          }
        });
      }
    } catch (error) {
      console.error("Error toggling wishlist item:", error);
      setErrorMessage("مشکلی در مدیریت لیست علاقه‌مندی‌ها وجود دارد.");
    }
  };

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
  };
}