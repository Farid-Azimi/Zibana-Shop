import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Icon from "../Icon/Icon";
import { Product } from "../../types/productType";
import { formatTitleForUrl } from "../../utils/formatTitleForUrl";
import { useCartStore } from "../../stores/useCartOperationStore";
import useFetchUserWishlist from "../../hooks/useFetchUserWishlist";
import { useUserStore } from "../../stores/useUserStore";

interface ProductItemDropdownProps {
  product: Product;
  onViewProduct: () => void;
  variant?: "default" | "compact";
}

export default function ProductItemDropdown({
  product,
  onViewProduct,
  variant = "default",
}: ProductItemDropdownProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { addToCart } = useCartStore();
  const { toggleWishlistItem, fetchWishlistItems } = useFetchUserWishlist();
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
    <div
      className={`absolute ${
        variant === "compact" ? "top-0 h-16" : "bottom-0 h-10"
      } left-0 right-0 bg-lightGray text-black p-1 flex justify-around items-center transform ${
        variant === "compact" ? "-translate-y-full" : "translate-y-full"
      } group-hover:translate-y-0 transition-transform duration-300`}
    >
      <Icon
        name={
          isLiked || hoveredIcon === "IoMdHeart"
            ? "IoMdHeart"
            : "IoMdHeartEmpty"
        }
        className="hover:cursor-pointer"
        onMouseEnter={() => setHoveredIcon("IoMdHeart")}
        onMouseLeave={() => setHoveredIcon(null)}
        onClick={handleWishlistToggle}
        size={variant === "compact" ? 38 : 30}
      />
      <Link
        href={`/product/${formatTitleForUrl(product.title)}`}
        passHref
        onClick={onViewProduct}
      >
        <Icon
          name={hoveredIcon === "AiFillEye" ? "AiFillEye" : "AiOutlineEye"}
          className={
            hoveredIcon === "AiFillEye"
              ? "hover:cursor-pointer"
              : "hover:cursor-default"
          }
          onMouseEnter={() => setHoveredIcon("AiFillEye")}
          onMouseLeave={() => setHoveredIcon(null)}
          size={variant === "compact" ? 38 : 30}
        />
      </Link>
      <Icon
        name={
          hoveredIcon === "HiShoppingCart"
            ? "HiShoppingCart"
            : "HiOutlineShoppingCart"
        }
        className={
          hoveredIcon === "HiShoppingCart"
            ? "hover:cursor-pointer"
            : "hover:cursor-default"
        }
        onMouseEnter={() => setHoveredIcon("HiShoppingCart")}
        onMouseLeave={() => setHoveredIcon(null)}
        onClick={() => addToCart(product, 1)}
        size={variant === "compact" ? 38 : 30}
      />
    </div>
  );
}
