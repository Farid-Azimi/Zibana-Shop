"use client";

import { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useSearchParams } from "next/navigation";
import ProductItem from "../../components/ProductItem/ProductItem";
import useFetchProducts from "../../hooks/useFetchProducts";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || ""; 

  const { products: filteredProducts, fetchProducts } = useFetchProducts({
    endpoint: "search",
    searchQuery: query,
  });

  useEffect(() => {
    if (query.trim()) {
      fetchProducts();
    }
  }, [query, fetchProducts]);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-lg font-bold text-gray mb-4">
          {query ? `نتیجه جستجو برای "${query}"` : "لطفاً عبارتی برای جستجو وارد کنید"}
        </h1>
        {query && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 mt-4">
            {filteredProducts.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        ) : (
          query && (
            <p className="text-gray text-center mt-8">
              هیچ نتیجه‌ای برای {query} یافت نشد.
            </p>
          )
        )}
      </div>
    </Layout>
  );
}
