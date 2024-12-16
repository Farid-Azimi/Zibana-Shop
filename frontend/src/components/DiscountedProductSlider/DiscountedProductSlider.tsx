"use client";

import { useEffect } from "react";
import ProductSlider from "../ProductSlider/ProductSlider";
import promo from "../../images/promo.png";
import useFetchProducts from "../../hooks/useFetchProducts";

export default function DiscountedProductSlider() {
  const { products, fetchProducts } = useFetchProducts({
    endpoint: "discounted",
    productLimit: 15, 
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <ProductSlider
        promoImageSrc={promo.src}
        bgColor="bg-[#f8a5c2]"
        products={products}
      />
    </>
  );
}
