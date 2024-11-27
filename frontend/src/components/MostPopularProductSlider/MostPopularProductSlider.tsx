"use client";

import { useEffect } from "react";
import ProductSlider from "../ProductSlider/ProductSlider";
import popularity from "../../images/popularity.png";
import useFetchProducts from "../../hooks/useFetchProducts";


export default function MostPopularProductsSlider() {

  const { products, fetchProducts } = useFetchProducts({
    endpoint: "most-liked",
    productLimit: 15, 
  });
  

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <ProductSlider
        promoImageSrc={popularity.src}
        bgColor="bg-[#cf6a87]"
        products={products}
      />
    </>
  );
}
