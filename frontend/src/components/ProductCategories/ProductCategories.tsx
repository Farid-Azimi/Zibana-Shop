"use client";

import { useEffect } from "react";
import useFetchProducts from "../../hooks/useFetchProducts";


export default function ProductCategories() {

  const { products, fetchProducts } = useFetchProducts({
    endpoint: "category/",
    productLimit: 15, 
  });
  

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      
      
    </>
  );
}
