"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Layout from "../../components/Layout/Layout";
import ProductItem from "../../components/ProductItem/ProductItem";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Error from "../../components/Error/Error";
import Pagination from "../../components/Pagination/Pagination";
import useFetchProducts from "../../hooks/useFetchProducts";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const {
    paginatedProducts,
    currentPage,
    fetchProducts,
    handlePageChange,
    isLoading,
    error,
  } = useFetchProducts({
    endpoint: "search",
    searchQuery: query,
  });

  useEffect(() => {
    if (query.trim()) {
      fetchProducts();
    }
  }, [query]);

  const currentProducts = paginatedProducts[currentPage - 1] || [];

  const productList = useMemo(() => {
    return currentProducts.map((product) => (
      <div className="w-[calc(25%-16px)]" key={product._id}>
        <ProductItem product={product} variant="compact" />
      </div>
    ));
  }, [currentProducts]);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-lg font-bold text-gray mb-4">
          {query ? `نتیجه جستجو برای "${query}"` : "لطفاً عبارتی برای جستجو وارد کنید"}
        </h1>

        {error && <Error message={error} onRetry={fetchProducts} />}

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner size={64} color="purple-500" speed="spin" />
          </div>
        ) : query && currentProducts.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-center gap-4 mt-4 w-[75%] mx-auto">
              {productList}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={paginatedProducts.length}
              onPageChange={handlePageChange}
            />
          </>
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