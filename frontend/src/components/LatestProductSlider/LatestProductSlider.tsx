"use client";

import { useEffect } from "react";
import ProductSlider from "../ProductSlider/ProductSlider";
import notification from "../../images/notification.png";
import useFetchProducts from "../../hooks/useFetchProducts";


export default function LatestProductSlider() {
  const { products, fetchProducts } = useFetchProducts({
    endpoint: "latest",
    productLimit: 10,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <ProductSlider
        promoImageSrc={notification.src}
        bgColor="bg-[#ea8685]"
        products={products}
      />
      {/* {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && products.length > 0 && (
        <ProductList
          promoImageSrc={notification.src}
          bgColor="bg-[#ea8685]"
          filter="latest"
          products={products}
        />
      )}
      {!isLoading && !error && products.length === 0 && (
        <p>No products found.</p>
      )} */}
    </>
  );
}
