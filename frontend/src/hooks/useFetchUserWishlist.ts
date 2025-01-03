"use client";

import { useState } from "react";
import { useHttpClient } from "./http-hook";

interface WishlistItem {
  userId: string;
  productId: string;
}

export default function useFetchUserWishlist() {
  const { sendRequest, clearError } = useHttpClient();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
            return prev.filter((item) => item.productId !== productId);
          } else {
            return [...prev, { userId, productId }];
          }
        });
      }
    } catch (error) {
      console.error("Error toggling wishlist item:", error);
      setErrorMessage("مشکلی در مدیریت لیست علاقه‌مندی‌ها وجود دارد.");
    }
  };

  return {
    wishlistItems,
    toggleWishlistItem,
    successMessage,
    errorMessage,
  };
}
