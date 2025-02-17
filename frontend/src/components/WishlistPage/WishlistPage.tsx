"use client";

import { useEffect, useState, useMemo } from "react";
import WishlistItem from "../../components/WishlistItem/WishlistItem";
import useFetchUserWishlist from "../../hooks/useFetchUserWishlist";
import { useUserStore } from "../../stores/useUserStore";

export default function WishlistPage() {
  const { wishlistItems: initialWishlistItems, fetchWishlistItems } =
    useFetchUserWishlist();
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const { id } = useUserStore();

  useEffect(() => {
    if (id) {
      fetchWishlistItems(id);
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
  }, [wishlistItems]);

  return (
    <>
      <div className="lg:col-span-3">
        <h1 className="text-xl font-semibold m-6">لیست آخرین علاقه‌مندی‌ها</h1>
        <div className="space-y-4">{renderedItems}</div>
      </div>
    </>
  );
}
