"use client";

import { memo, useCallback, useEffect } from "react";
import winner from "../../images/winner.png";
import ProductSlider from "../ProductSlider/ProductSlider";
import useFetchProducts from "../../hooks/useFetchProducts";

const BestSellingProductSlider = memo(() => {
  const { products, fetchProducts } = useFetchProducts({
    endpoint: "most-sold",
    productLimit: 8,
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
        promoImageSrc={winner.src}
        bgColor="bg-[#cd84f1]"
        products={products}
      />
    </>
  );
});

BestSellingProductSlider.displayName = "BestSellingProductSlider";
export default BestSellingProductSlider;
