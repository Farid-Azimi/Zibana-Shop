import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatTitleForUrl } from "../../utils/formatTitleForUrl";
import useFetchProducts from "../../hooks/useFetchProducts";
import Button from "../Button/Button";
import { useProductData } from "@/data/productData";

type SearchDropdownMenuProps = {
  query: string;
};

export default function SearchDropdownMenu({ query }: SearchDropdownMenuProps) {
  const { setSelectedProduct } = useProductData();
  const {
    products: filteredProducts,
    fetchProducts,
    isLoading,
  } = useFetchProducts({
    endpoint: "search",
    searchQuery: query,
  });

  useEffect(() => {
    if (query.trim()) {
      fetchProducts();
    }
  }, [query]);

  return (
    <div className="absolute top-14 left-0 right-0 bg-white shadow-2xl rounded-lg p-4 z-10">
      {isLoading ? (
        <div className="flex justify-center items-center py-4">
          <span className="text-textGray">در حال بارگذاری...</span>
        </div>
      ) : filteredProducts.length > 0 ? (
        <>
          <ul>
            {filteredProducts.slice(0, 5).map((product) => (
              <Link
                key={product._id}
                href={`/product/${formatTitleForUrl(product.title)}`}
                passHref
                onClick={() => setSelectedProduct(product)}
              >
                <li
                  key={product._id}
                  className="py-2 px-4 flex items-center text-textGray hover:bg-veryLightGray cursor-pointer"
                >
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
            ))}
          </ul>
          {filteredProducts.length > 5 && (
            <div className="flex justify-center items-center mt-2">
              <Link href={`/search?q=${query}`} passHref>
                <Button className="text-[#2d98da] hover:text-[#48dbfb]">
                  مشاهده تمامی محصولات...({filteredProducts.length})
                </Button>
              </Link>
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
