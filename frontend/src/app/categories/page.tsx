"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductItem from "../../components/ProductItem/ProductItem";
import { Product } from "../../types/productType";
import { useProductData } from "@/data/productData";
import { formatTitleForUrl } from "@/utils/formatTitleForUrl";

// import { products } from "../../data/productData";

export default function ProductCategoryPage() {


  const searchParams = useSearchParams(); 
  const query = searchParams.get('query'); 
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [query]);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold text-gray">
        نتیجه جستجو برای {query}
      </h1>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}