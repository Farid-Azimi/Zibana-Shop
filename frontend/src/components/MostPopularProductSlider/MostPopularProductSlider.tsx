"use client";

import { memo, useCallback, useEffect } from "react";
import ProductSlider from "../ProductSlider/ProductSlider";
import popularity from "../../images/popularity.png";
import useFetchProducts from "../../hooks/useFetchProducts";

const MostPopularProductsSlider = memo(() => {
  const { products, fetchProducts } = useFetchProducts({
    endpoint: "most-liked",
    productLimit: 15,
  });

  const fetchProductsCallback = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchProductsCallback();
  }, [fetchProductsCallback]);

  return (
    <>
      <ProductSlider
        promoImageSrc={popularity.src}
        bgColor="bg-[#cf6a87]"
        products={products}
      />
    </>
  );
});

MostPopularProductsSlider.displayName = "MostPopularProductsSlider";
export default MostPopularProductsSlider;
