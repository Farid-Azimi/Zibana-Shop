"use client";

import { useEffect } from "react";
import winner from "../../images/winner.png";
import ProductSlider from "../ProductSlider/ProductSlider";
import useFetchProducts from "../../hooks/useFetchProducts";


export default function BestSellingProductSlider() {
  const { products, fetchProducts } = useFetchProducts({
    endpoint: "most-sold",
    productLimit: 8, 
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <ProductSlider
        promoImageSrc={winner.src}
        bgColor="bg-[#cd84f1]"
        products={products}
      />
    </>
  );
}
