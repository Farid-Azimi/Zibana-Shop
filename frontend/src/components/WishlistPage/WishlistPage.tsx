"use client";

import { useEffect } from "react";
import WishlistItem from "../../components/WishlistItem/WishlistItem";
import useFetchUserWishlist from "../../hooks/useFetchUserWishlist";
import { useUserStore } from "../../stores/useUserStore";

export default function WishlistPage() {
  const { wishlistItems, fetchWishlistItems } = useFetchUserWishlist();
  const { id } = useUserStore();

  useEffect(() => {
    if (id) {
      fetchWishlistItems(id);
    }
  }, [id, wishlistItems]);

  return (
    <>
      <div className="lg:col-span-3">
        <h1 className="text-xl font-semibold m-6">لیست آخرین علاقه‌مندی‌ها</h1>
        <div className="space-y-4">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item) => (
              <WishlistItem key={item._id} product={item} />
            ))
          ) : (
            <p>هیچ محصولی در لیست علاقه‌مندی‌ها وجود ندارد.</p>
          )}
        </div>
      </div>
    </>
  );
}
