import { useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatTitleForUrl } from "../../utils/formatTitleForUrl";
import useFetchProducts from "../../hooks/useFetchProducts";
import Button from "../Button/Button";
import { useProductData } from "@/data/productData";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

type SearchDropdownMenuProps = {
  query: string;
  setQuery: (query: string) => void;
  setIsFocused: (focused: boolean) => void;
};

export default function SearchDropdownMenu({
  query,
  setQuery,
  setIsFocused,
}: SearchDropdownMenuProps) {
  const router = useRouter();
  const { setSelectedProduct } = useProductData();
  const {
    products: filteredProducts,
    fetchProducts,
    isLoading,
  } = useFetchProducts({
    endpoint: "search",
    searchQuery: query,
  });

  const handleViewAllProducts = useCallback(() => {
    router.push(`/search?q=${query}`);
    setQuery("");
    setIsFocused(false);
  }, [query, router, setQuery, setIsFocused]);

  const productList = useMemo(
    () =>
      filteredProducts.slice(0, 5).map((product) => (
        <Link
          key={product._id}
          href={`/product/${formatTitleForUrl(product.title)}`}
          passHref
          onClick={() => setSelectedProduct(product)}
        >
          <li className="py-2 px-4 flex items-center text-textGray hover:bg-veryLightGray cursor-pointer">
            <div className="w-16 h-16 relative ml-2">
              <Image
                src={product.imageSrc}
                alt={product.title}
                objectFit="contain"
                width={500}
                height={500}
                loading="lazy"
                className="w-full h-full"
              />
            </div>
            {product.title}
          </li>
        </Link>
      )),
    [filteredProducts, setSelectedProduct]
  );

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.trim()) {
        fetchProducts();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, fetchProducts]);

  return (
    <div className="absolute top-14 left-0 right-0 bg-white shadow-2xl rounded-lg p-4 z-[70]">
      {isLoading ? (
        <div className="flex justify-center items-center py-4">
          <LoadingSpinner size={24} />
        </div>
      ) : filteredProducts.length > 0 ? (
        <>
          <ul>{productList}</ul>
          {filteredProducts.length > 5 && (
            <div className="flex justify-center items-center mt-2">
              <Button
                className="text-[#2d98da] hover:text-[#48dbfb]"
                onClick={handleViewAllProducts}
              >
                مشاهده تمامی محصولات...({filteredProducts.length})
              </Button>
            </div>
          )}
        </>
      ) : (
        <span className="text-textGray">
          برای جستجوی شما نتیجه‌ای یافت نشد!
        </span>
      )}
    </div>
  );
}
