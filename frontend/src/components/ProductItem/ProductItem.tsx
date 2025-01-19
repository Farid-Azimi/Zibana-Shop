import Link from "next/link";
import Image from "next/image";
import { Product } from "../../types/productType";
import { useProductData } from "@/data/productData";
import { formatTitleForUrl } from "../../utils/formatTitleForUrl";
import ProductItemDropdown from "../ProductItemDropdown/ProductItemDropdown";

interface ProductItemProps {
  product: Product;
  variant?: "default" | "compact";
}

export default function ProductItem({
  product,
  variant = "default",
}: ProductItemProps): JSX.Element {
  const { setSelectedProduct } = useProductData();

  const handleViewProduct = () => {
    setSelectedProduct(product);
  };

  return (
    <div className="bg-white min-w-[200px] rounded-xl shadow-md p-4 flex flex-col items-center group relative overflow-hidden transition-transform duration-300 hover:scale-95">
      {variant === "default" && product.discountPercentage !== 0 && (
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

      <div className="flex flex-col items-center text-center min-h-[3.5rem]">
        <div className="flex items-center justify-center gap-2">
          {variant === "compact" && product.discountPercentage !== 0 && (
            <div className="bg-[#f62b72] text-white text-sm p-2 rounded-bl-lg rounded-tr-lg">
              {product.discountPercentage}٪
            </div>
          )}
          <div className="flex flex-col items-start">
            <span
              className={`${
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
        </div>
      </div>

      <ProductItemDropdown
        product={product}
        onViewProduct={handleViewProduct}
        variant={variant}
      />
    </div>
  );
}
