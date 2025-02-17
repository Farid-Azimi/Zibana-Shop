"use client";

import { useEffect, useMemo } from "react";
import Layout from "../../../components/Layout/Layout";
import ProductItem from "../../../components/ProductItem/ProductItem";
import useFetchProducts from "../../../hooks/useFetchProducts";
import { useParams } from "next/navigation";
import Pagination from "@/components/Pagination/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import Error from "@/components/Error/Error";

export default function CategoryPage() {
  const { category } = useParams();
  const categoryValue = Array.isArray(category)
    ? category[0] || category[1]
    : category;
  const decodedCategory = useMemo(
    () => (categoryValue ? decodeURIComponent(categoryValue) : ""),
    [categoryValue]
  );

  const {
    paginatedProducts,
    currentPage,
    fetchProducts,
    handlePageChange,
    isLoading,
    error,
  } = useFetchProducts({
    endpoint: "category",
    category: decodedCategory,
    productLimit: 30,
  });

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const currentProducts = useMemo(
    () => paginatedProducts[currentPage - 1] || [],
    [paginatedProducts, currentPage]
  );

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
          {decodedCategory
            ? `محصولات دسته‌بندی "${decodedCategory}"`
            : "لطفاً دسته‌بندی را انتخاب کنید"}
        </h1>
        {error && <Error message={error} onRetry={fetchProducts} />}

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner size={64} />
          </div>
        ) : decodedCategory && currentProducts.length > 0 ? (
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
          !isLoading &&
          !error &&
          decodedCategory &&
          currentProducts.length === 0 && (
            <p className="text-gray text-center mt-8">
              هیچ محصولی در دسته‌بندی {decodedCategory} یافت نشد.
            </p>
          )
        )}
      </div>
    </Layout>
  );
}
