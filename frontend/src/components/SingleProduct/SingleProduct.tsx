"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";
import { Product } from "../../types/productType";
import ProductDetailsCard from "@/components/ProductDetailsCard/ProductDetailsCard";
import useFetchUserWishlist from "@/hooks/useFetchUserWishlist";
import { useUserStore } from "@/stores/useUserStore";

interface SingleProductProps {
  product: Product;
}

export default function SingleProduct({
  product,
}: SingleProductProps): JSX.Element {
  const { toggleWishlistItem, fetchWishlistItems } = useFetchUserWishlist();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const { id } = useUserStore();

  useEffect(() => {
    const checkIfLiked = async () => {
      if (id) {
        const wishlist = (await fetchWishlistItems(id)) || [];
        const isProductLiked = wishlist.some(
          (item: Product) => item._id === product._id
        );
        setIsLiked(isProductLiked);
      }
    };

    checkIfLiked();
  }, [id, product._id]);

  const handleWishlistToggle = useCallback(async () => {
    if (!id) {
      alert("لطفاً ابتدا وارد حساب کاربری خود شوید.");
      return;
    }
    await toggleWishlistItem(id, product._id, isLiked);
    setIsLiked(!isLiked);
  }, [id, product._id, isLiked, toggleWishlistItem]);

  return (
    <>
      <div className="flex flex-col md:flex-row items-stretch justify-between">
        <div className="w-1/3 p-4 relative">
          <Icon
            name={
              isLiked || hoveredIcon === "IoMdHeart"
                ? "IoMdHeart"
                : "IoMdHeartEmpty"
            }
            className="absolute top-6 left-6 hover:cursor-pointer"
            onMouseEnter={() => setHoveredIcon("IoMdHeart")}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={handleWishlistToggle}
            size={36}
          />
          <Image
            src={product.imageSrc}
            alt={product.title}
            width={500}
            height={500}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="w-1/4 p-4">
          <ProductDetailsCard product={product} />
        </div>
      </div>
    </>
  );
}
