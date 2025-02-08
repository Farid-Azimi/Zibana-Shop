"use client";

import { memo, useCallback, useEffect } from "react";
import ProductSlider from "../ProductSlider/ProductSlider";
import notification from "../../images/notification.png";
import useFetchProducts from "../../hooks/useFetchProducts";

const LatestProductSlider = memo(() => {
  const { products, fetchProducts } = useFetchProducts({
    endpoint: "latest",
    productLimit: 10,
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
        promoImageSrc={notification.src}
        bgColor="bg-[#ea8685]"
        products={products}
      />
    </>
  );
});

LatestProductSlider.displayName = "LatestProductSlider";
export default LatestProductSlider;
