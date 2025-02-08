"use client";

import { memo, useCallback, useEffect } from "react";
import ProductSlider from "../ProductSlider/ProductSlider";
import promo from "../../images/promo.png";
import useFetchProducts from "../../hooks/useFetchProducts";

const DiscountedProductSlider = memo(() => {
  const { products, fetchProducts } = useFetchProducts({
    endpoint: "discounted",
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
        promoImageSrc={promo.src}
        bgColor="bg-[#f8a5c2]"
        products={products}
      />
    </>
  );
});

DiscountedProductSlider.displayName = "DiscountedProductSlider";
export default DiscountedProductSlider;
