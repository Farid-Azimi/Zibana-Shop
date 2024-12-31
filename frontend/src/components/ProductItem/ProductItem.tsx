import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "../Icon/Icon";
import { Product } from "../../types/productType";
import { useCartStore } from "../../stores/useCartOperationStore";
import { useProductData } from "@/data/productData";
import { formatTitleForUrl } from "../../utils/formatTitleForUrl";
import { useUserStore } from "../../stores/useUserStore";
import useFetchUserWishlist from "../../hooks/useFetchUserWishlist";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({
  product,
}: ProductItemProps): JSX.Element {
  const { addToCart } = useCartStore();
  const { setSelectedProduct } = useProductData();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { id } = useUserStore();
  const { toggleWishlistItem, fetchWishlistItems, wishlistItems } =
    useFetchUserWishlist();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  // useEffect(() => {
  //   const loadLikedStatus = async () => {
  //     if (id) {
  //       await fetchWishlistItems(id);
  //       const isProductLiked = wishlistItems.some(
  //         (wishlistItem) => wishlistItem.productId === product._id
  //       );
  //       setIsLiked(isProductLiked);
  //     }
  //   };

  //   loadLikedStatus();

  // }, [id, product._id]);

  const handleWishlistToggle = async () => {
    if (!id) {
      alert("لطفاً ابتدا وارد حساب کاربری خود شوید.");
      return;
    }
    await toggleWishlistItem(id, product._id, isLiked);
    setIsLiked(!isLiked);
  };

  const handleViewProduct = () => {
    setSelectedProduct(product);
  };

  return (
    <div className="bg-white min-w-[200px] rounded-xl shadow-md p-4 flex flex-col items-center group relative overflow-hidden transition-transform duration-300 hover:scale-95">

      {product.discountPercentage !== 0 && (
          <div className="absolute top-0 left-0 bg-[#f62b72] text-white text-sm px-3 py-2 rounded-br-lg">
            {product.discountPercentage}٪
          </div>
        )}
      <Image
        src={product.imageSrc}
        alt={product.title}
        width={500}
        height={500}
        className="w-full h-auto mb-4"
      />
      <Link
        href={`/product/${formatTitleForUrl(product.title)}`}
        passHref
        onClick={handleViewProduct}
      >
        <h3 className="text-sm text-textGray mb-2 font-semibold hover:text-black text-center">
          {product.title}
        </h3>
      </Link>
      <div className="flex flex-col items-center text-center">
        <span
          className={`mt-2 ${
            product.discountPercentage
              ? "text-gray line-through text-sm"
              : "text-[#313131] text-base font-semibold"
          }`}
        >
          {product.originalPrice} تومان
        </span>
        {product.discountPercentage !== 0 && (
          <span className="text-[#313131] text-base font-semibold">
            {product.discountedPrice} تومان
          </span>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-lightGray text-black p-1 flex justify-around items-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
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
        />
        <Link
          href={`/product/${formatTitleForUrl(product.title)}`}
          passHref
          onClick={handleViewProduct}
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
        />
      </div>
    </div>
  );
}
