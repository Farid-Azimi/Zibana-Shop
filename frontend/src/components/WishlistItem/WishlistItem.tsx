import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import useFetchUserWishlist from "../../hooks/useFetchUserWishlist";
import { useUserStore } from "../../stores/useUserStore";
import { formatTitleForUrl } from "../../utils/formatTitleForUrl";
import { useProductData } from "@/data/productData";
import { Product } from "@/types/productType";

interface WishlistItemProps {
  product: Product;
}

export default function WishlistItem({ product }: WishlistItemProps) {
  const { id } = useUserStore();
  const { toggleWishlistItem } = useFetchUserWishlist();
  const { setSelectedProduct } = useProductData();

  const handleDelete = useCallback(async () => {
    if (!id) {
      alert("لطفاً ابتدا وارد حساب کاربری خود شوید.");
      return;
    }
    await toggleWishlistItem(id, product._id, true);
  }, [id, product._id, toggleWishlistItem]);

  return (
    <div className="relative p-4 h-60 w-1/2 mx-auto border-solid border-veryLightGray border-2 rounded-lg shadow-sm flex items-center justify-between bg-white">
      <Button
        className="absolute top-2 left-2 bg-pink-500 text-white rounded-xl p-2"
        onClick={handleDelete}
      >
        <Icon name="FiX" size={20} />
      </Button>

      <div className="flex items-center space-x-4">
        {product.discountPercentage !== 0 && (
          <div className="absolute top-0 right-0 bg-[#f62b72] text-white text-sm px-3 py-2 rounded-bl-lg rounded-tr-lg">
            {product.discountPercentage}٪
          </div>
        )}
        <Image
          src={product.imageSrc}
          alt={product.title}
          width={80}
          height={80}
          className="rounded-md"
        />
        <div className="flex flex-col">
          <h2 className="text-base font-bold">{product.title}</h2>
          <span
            className={`mt-2 text-center ${
              product.discountPercentage
                ? "text-gray line-through text-sm"
                : "text-[#313131] text-base font-semibold"
            }`}
          >
            قیمت: {product.originalPrice} تومان
          </span>
          {product.discountPercentage !== 0 && (
            <span className="text-[#313131] text-base text-center font-semibold">
              {product.discountedPrice} تومان
            </span>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-4">
        <Link
          href={`/product/${formatTitleForUrl(product.title)}`}
          passHref
          className="bg-purple-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 gap-2"
          onClick={() => setSelectedProduct(product)}
        >
          <Icon name="PiShoppingBagLight" size={20} />
          <span>مشاهده محصول</span>
        </Link>
      </div>
    </div>
  );
}
