"use client";

import { useEffect, useState, useMemo } from "react";
import WishlistItem from "../../components/WishlistItem/WishlistItem";
import useFetchUserWishlist from "../../hooks/useFetchUserWishlist";
import { useUserStore } from "../../stores/useUserStore";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function WishlistPage() {
  const { wishlistItems: initialWishlistItems, fetchWishlistItems } =
    useFetchUserWishlist();
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useUserStore();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchWishlistItems(id).finally(() => setIsLoading(false));
    }
  }, [id]);

  useEffect(() => {
    setWishlistItems(initialWishlistItems);
  }, [initialWishlistItems]);

  const handleRemoveItem = (productId: string) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  const renderedItems = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size={64} />
        </div>
      );
    }

    return wishlistItems.length > 0 ? (
      wishlistItems.map((item) => (
        <WishlistItem
          key={item._id}
          product={item}
          onRemove={handleRemoveItem}
        />
      ))
    ) : (
      <p>هیچ محصولی در لیست علاقه‌مندی‌ها وجود ندارد.</p>
    );
  }, [wishlistItems, isLoading]);

  return (
    <>
      <div className="lg:col-span-3">
        <h1 className="text-xl font-semibold text-center my-8">
          لیست علاقه‌مندی‌های شما
        </h1>
        <div className="space-y-4">{renderedItems}</div>
      </div>
    </>
  );
}
