"use client";

import { useEffect } from "react";
import ProductSlider from "../ProductSlider/ProductSlider";
import popularity from "../../images/popularity.png";
import { useUserStore } from "@/stores/useUserStore";
import useFetchProducts from "@/hooks/useFetchProducts";

export default function SuggestedProductsSlider() {
  const { id } = useUserStore();
  const { products, fetchProducts } = useFetchProducts({
    endpoint: "suggest-products",
    uid: id || undefined,
  });

  console.log(products);

  useEffect(() => {
    if (id) {
      fetchProducts();
    }
  }, [id]);

  useEffect(() => {
    console.log("Products updated:", products);
  }, [products]);

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
